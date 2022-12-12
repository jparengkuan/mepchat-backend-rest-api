import { getModelForClass } from '@typegoose/typegoose';
import { NextFunction, Request, Response } from 'express';
import { Recipe } from '../models/recipe.model';
import {CreateRecipeInput, DeleteRecipeInput} from "../schema/recipe.schema";
import {createRecipe, findRecipeById} from "../services/recipe.service";

export const newRecipeHandler = async (
    req: Request<{}, {}, CreateRecipeInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipe = await createRecipe({
            title: req.body.title,
            volume: req.body.volume,
            preparation: req.body.preparation,
            unit: req.body.unit,
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

export const deleteRecipeHandler = async (
    req: Request<{}, {}, DeleteRecipeInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipeId: string = req.body._id;
        const recipeModel = getModelForClass(Recipe);
        const recipe = await findRecipeById(recipeId);
        const recipeExits = await recipeModel.exists(recipe);

        if (!recipeExits) {
            return res.status(204).json({
                status: 'fail',
                message: 'Could not find the desired recipe',
            });
        }

        await recipeModel.deleteOne(recipe)
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
