import recipeModel, {Recipe} from "../models/recipe.model";
import {Types} from "mongoose";
import {APIError} from "../utils/APIError";
import {mongoose} from "@typegoose/typegoose";

// Create new recipe
export const createRecipe = async (input: Partial<Recipe>) => {
    const recipe = await recipeModel.create(input);
    return recipe.toJSON();
};

// Find recipe by Id
export const findAndCheckRecipeById = async (id: string | Types.ObjectId) => {
    if (!recipeIdIsValid(id)) {
        throw new APIError("Id is not valid", 422 )
    }

    let recipe = await recipeModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: ingredientLookupQuery,
        },
    ]) as unknown as Recipe;

    if (!recipeExists(recipe)) {
        throw new APIError("Could not find the desired recipe", 204)
    }

    return recipe;
};

export const findAllRecipes = async () => {
    return recipeModel.aggregate([
        {
            $lookup: ingredientLookupQuery,
        },
    ]);
};

export const deleteRecipeById = async (id: string | Types.ObjectId) => {
    await recipeModel.findByIdAndDelete(id)
};

const recipeExists = (recipe: Recipe) => {
    return recipe && Object.keys(recipe).length !== 0
}

const recipeIdIsValid = (recipeId: string | Types.ObjectId) => {
    return Types.ObjectId.isValid(recipeId)
}

const ingredientLookupQuery = {
    from: 'ingredients',
    localField: 'ingredients',
    foreignField: '_id',
    as: 'ingredients'
}
