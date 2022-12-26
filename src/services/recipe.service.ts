import recipeModel, {Recipe} from "../models/recipe.model";
import {omit} from 'lodash';
import {Types} from "mongoose";
import {APIError} from "../utils/APIError";

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

    let recipe = await recipeModel.findById(id).lean();
    recipe = omit(recipe)

    if (!recipeExists(recipe)) {
        throw new APIError("Could not find the desired recipe", 204)
    }

    return recipe;
};

export const findAllRecipes = async () => {
    const recipe = await recipeModel.find().lean();
    return omit(recipe);
};

const recipeExists = (recipe: Recipe) => {
    return Object.keys(recipe).length !== 0
}

const recipeIdIsValid = (recipeId: string) => {
    return Types.ObjectId.isValid(recipeId)
}
