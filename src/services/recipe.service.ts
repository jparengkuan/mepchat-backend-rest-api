import recipeModel, {Recipe} from "../models/recipe.model";
import {omit} from 'lodash';
import {Types} from "mongoose";
import {APIError} from "../utils/APIError";
import {mongoose} from "@typegoose/typegoose";

// Create new recipe
export const createRecipe = async (input: Partial<Recipe>) => {
    const recipe = await recipeModel.create(input);
    return recipe.toJSON();
};

// Find recipe by Id
export const findAndCheckRecipeById = async (id: string ) => {
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

    recipe = omit(recipe)

    if (!recipeExists(recipe)) {
        throw new APIError("Could not find the desired recipe", 204)
    }

    return recipe;
};

export const findAllRecipes = async () => {
    let recipe = await recipeModel.aggregate([
        {
            $lookup: ingredientLookupQuery,
        },
    ]) as unknown as Recipe;
    return omit(recipe);
};

const recipeExists = (recipe: Recipe) => {
    return Object.keys(recipe).length !== 0
}

const recipeIdIsValid = (recipeId: string) => {
    return Types.ObjectId.isValid(recipeId)
}

const ingredientLookupQuery = {
    from: 'ingredients',
    localField: 'ingredients',
    foreignField: '_id',
    as: 'ingredients'
}
