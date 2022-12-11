import recipeModel, {Recipe} from "../models/recipe.model";

// Create new recipe
export const createRecipe = async (input: Partial<Recipe>) => {
    const recipe = await recipeModel.create(input);
    return recipe.toJSON();
};
