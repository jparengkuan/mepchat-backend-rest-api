import {omit} from 'lodash';
import {Types} from "mongoose";
import {APIError} from "../utils/APIError";
import {Ingredient, ingredientModel} from "../models/ingredient.model";

export const createIngredient = async (input: Ingredient) => {
    const ingredient = await ingredientModel.create(input);
    return ingredient.toJSON();
};

export const updateIngredient = async (ingredientId: string, input: Partial<Ingredient>) => {
    return ingredientModel.findByIdAndUpdate(ingredientId, input);
};

export const findAndCheckIngredientById = async (id: string ) => {
    if (!ingredientIdIsValid(id)) {
        throw new APIError("Id is not valid", 422 )
    }

    let ingredient = await ingredientModel.findById(id).lean();
    ingredient = omit(ingredient)

    if (!ingredientExists(ingredient)) {
        throw new APIError("Could not find the desired ingredient", 204)
    }

    return ingredient;
};

export const findAllIngredients = async () => {
    const ingredient = await ingredientModel.find().lean();
    return omit(ingredient);
};

const ingredientExists = (ingredient: Ingredient) => {
    return Object.keys(ingredient).length !== 0
}

const ingredientIdIsValid = (ingredientId: string) => {
    return Types.ObjectId.isValid(ingredientId)
}
