import {omit} from 'lodash';
import {Types} from "mongoose";
import {APIError} from "../utils/APIError";
import {RecipeCategory, recipeCategoryModel} from "../models/recipeCategory.model";
import {mongoose} from "@typegoose/typegoose";
import recipeModel from "../models/recipe.model";

export const createRecipeCategory = async (input: { updated_at: Date; created_at: Date; recipes: string[]; title: string }) => {
    const recipeCategory = await recipeCategoryModel.create(input);
    return recipeCategory.toJSON();
};

export const findAndCheckRecipeCategoryById = async (id: string ) => {
    if (!recipeCategoryIdIsValid(id)) {
        throw new APIError("Id is not valid", 422 )
    }

    let recipeCategory = await recipeCategoryModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: recipeLookupQuery,
        },
        {
            $unwind: {
                path: "$recipes"
            }
        },
        {
            $lookup: recipeIngredientsQuery
        },
        {
            $group: groupRecipesQuery
        },
    ]) as unknown as RecipeCategory;

    if (!recipeCategoryExists(recipeCategory)) {
        throw new APIError("Could not find the desired recipeCategory", 204)
    }
    return recipeCategory;
};

export const findAllRecipeCategories = async () => {
    const recipeCategories = await recipeCategoryModel.aggregate(
        [
            {
                $lookup: recipeLookupQuery
            },
            {
                $unwind: {
                    path: "$recipes",
                    preserveNullAndEmptyArrays: true,
                }
            },
            {
                $lookup: recipeIngredientsQuery
            },
            {
                $group: groupRecipesQuery
            },
        ]
    )
    return omit(recipeCategories);
};

export const deleteRecipeCategoryById = async (id: string | Types.ObjectId) => {
    await recipeCategoryModel.findByIdAndDelete(id)
};

const recipeCategoryExists = (recipeCategory: RecipeCategory) => {
    return Object.keys(recipeCategory).length !== 0
}

const recipeCategoryIdIsValid = (recipeCategoryId: string) => {
    return Types.ObjectId.isValid(recipeCategoryId)
}

const recipeLookupQuery = {
    from: 'recipes',
    localField: 'recipes',
    foreignField: '_id',
    as: 'recipes'
}

const recipeIngredientsQuery = {
    from: "ingredients",
    localField: "recipes.ingredients",
    foreignField: "_id",
    as: "recipes.ingredients"
};

const groupRecipesQuery = {
    _id : "$_id",
    title: { $first: "$title" },
    recipes: { $push: "$recipes" }
}
