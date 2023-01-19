import { getModelForClass } from '@typegoose/typegoose';
import { NextFunction, Request, Response } from 'express';
import recipeModel, { Recipe } from '../models/recipe.model';
import {
    CreateRecipeInput,
    DeleteRecipeInput, GetAllRecipeInput,
    GetRecipeInput,
    UpdateRecipeInput,
} from "../schema/recipe.schema";
import {createRecipe, deleteRecipeById, findAllRecipes, findAndCheckRecipeById} from "../services/recipe.service";
import {Types} from "mongoose";
import {findAndCheckIngredientById} from "../services/ingredient.service";

export const newRecipeHandler = async (
    req: Request<{}, {}, CreateRecipeInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const ingredientsReq = req.body.ingredients as unknown as Types.ObjectId[];
        await validateIngredientsIds(ingredientsReq);
        const recipe = await createRecipe({
            title: req.body.title,
            volume: req.body.volume,
            preparation: req.body.preparation,
            unit: req.body.unit,
            updated_at: new Date(),
            ingredients: ingredientsReq,
        });

        res.status(201).json({
            status: 'success',
            data: {
                recipe,
            },
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Recipe already exists',
            });
        }
        next(err);
    }
};

export const getRecipeHandler = async (
    req: Request<{id: string}, {}, GetRecipeInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipeId: string = req.params.id;
        let recipe: Recipe = await findAndCheckRecipeById(recipeId);

        return res.status(200).json({
            status: 'success',
            data: recipe,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired recipes',
            });
        }
        next(err);
    }
}

export const getAllRecipeHandler = async (
    req: Request<{}, {}, GetAllRecipeInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipes = await findAllRecipes();

        if (!recipes) {
            return res.status(204).json({
                status: 'fail',
                message: 'Could not find the desired recipes',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: recipes,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired recipes',
            });
        }
        next(err);
    }
}

export const updateRecipeHandler = async (
    req: Request<{id: string}, {}, UpdateRecipeInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipeId = req.params.id;
        const ingredientsReq: string[] = req.body.ingredients ?? []
        await validateIngredientsIds(ingredientsReq)
        await findAndCheckRecipeById(recipeId!);

        const receivedRecipe = {
            title: req.body.title,
            volume: req.body.volume,
            preparation: req.body.preparation,
            unit: req.body.unit,
            updated_at: new Date(),
            ingredients: ingredientsReq,
        };

        const updatedRecipe = await recipeModel.updateOne({_id: recipeId}, receivedRecipe)

        return res.status(200).json({
            status: 'success',
            data: updatedRecipe,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            console.log(err)
            return res.status(409).json({
                status: 'fail',
                message: 'Could not update desired recipe',
            });
        }
        next(err);
    }
}

export const deleteRecipeHandler = async (
    req: Request<{id: string}, {}, DeleteRecipeInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipeId: string = req.params.id;
        await findAndCheckRecipeById(recipeId);

        await deleteRecipeById(recipeId)
        return res.status(201).json({
            status: 'success',
            data: {},
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired recipe',
            });
        }
        next(err);
    }
}

async function validateIngredientsIds(ids: string[] | Types.ObjectId[]) {
    if (ids.length) {
        for (const dishId of ids) {
            await findAndCheckIngredientById(dishId);
        }
    }
}
