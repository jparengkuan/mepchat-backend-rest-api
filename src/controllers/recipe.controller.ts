import { getModelForClass } from '@typegoose/typegoose';
import { NextFunction, Request, Response } from 'express';
import { Recipe } from '../models/recipe.model';
import {
    CreateRecipeInput,
    DeleteRecipeInput, GetAllRecipeInput,
    GetRecipeInput,
    UpdateRecipeInput,
} from "../schema/recipe.schema";
import {createRecipe, findAllRecipes, findRecipeById, updateRecipe} from "../services/recipe.service";

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

export const getRecipeHandler = async (
    req: Request<{}, {}, GetRecipeInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipeId: string = req.body._id;
        const recipe = await findRecipeById(recipeId);

        if (!recipeExists(recipe)) {
            return res.status(204).json({
                status: 'fail',
                message: 'Could not find the desired recipe',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: recipe,
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
    req: Request<{}, {}, UpdateRecipeInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipeId = req.body._id;
        let recipe = await findRecipeById(recipeId!);
        const receivedRecipe = {
            title: req.body.title,
            volume: req.body.volume,
            preparation: req.body.preparation,
            unit: req.body.unit,
        };

        if (!recipeExists(recipe)) {
            return res.status(204).json({
                status: 'fail',
                message: 'Could not find the desired recipe',
            });
        }
        await updateRecipe(receivedRecipe).then(result => console.log(result))
        return res.status(200).json({
            status: 'success',
            data: recipeId,
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


export const deleteRecipeHandler = async (
    req: Request<{}, {}, DeleteRecipeInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipeId: string = req.body._id;
        const recipeModel = getModelForClass(Recipe);
        const recipe = await findRecipeById(recipeId);

        if (!recipeExists(recipe)) {
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

const recipeExists = (recipe: Recipe) => {
    return Object.keys(recipe).length !== 0
}
