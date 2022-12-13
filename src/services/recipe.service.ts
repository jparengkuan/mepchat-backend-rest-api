import recipeModel, {Recipe} from "../models/recipe.model";
import {omit} from 'lodash';

// Create new recipe
export const createRecipe = async (input: Partial<Recipe>) => {
    const recipe = await recipeModel.create(input);
    return recipe.toJSON();
};

export const updateRecipe = async (input: Partial<Recipe>) => {
    return recipeModel.updateOne(input);
};

// Find recipe by Id
export const findRecipeById = async (id: string) => {
    const recipe = await recipeModel.findById(id).lean();
    return omit(recipe);
};

export const findAllRecipes = async () => {
    const recipe = await recipeModel.find().lean();
    return omit(recipe);
};
