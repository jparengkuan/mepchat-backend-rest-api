import { getModelForClass } from '@typegoose/typegoose';
import { NextFunction, Request, Response } from 'express';
import {
    CreateIngredientInput,
    DeleteIngredientInput,
    GetAllIngredientsInput,
    GetIngredientInput,
    UpdateIngredientInput
} from "../schema/ingredient.schema";
import {Ingredient, ingredientModel} from "../models/ingredient.model";
import {
    createIngredient, deleteIngredientById,
    findAllIngredients,
    findAndCheckIngredientById,
} from "../services/ingredient.service";

export const createIngredientHandler = async (
    req: Request<{}, {}, CreateIngredientInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const ingredient = await createIngredient({
            title: req.body.title!,
            unit: req.body.unit!,
            allergy: req.body.allergy,
        })

        res.status(201).json({
            status: 'success',
            data: {
                ingredient,
            },
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Ingredient already exists',
            });
        }
        next(err);
    }
};

export const getIngredientHandler = async (
    req: Request<{id: string}, {}, GetIngredientInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const ingredientId: string = req.params.id;
        let ingredient: Ingredient = await findAndCheckIngredientById(ingredientId);

        return res.status(200).json({
            status: 'success',
            data: ingredient,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired ingredients',
            });
        }
        next(err);
    }
}

export const getAllIngredientsHandler = async (
    req: Request<{}, {}, GetAllIngredientsInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const ingredients = await findAllIngredients();

        if (!ingredients) {
            return res.status(204).json({
                status: 'fail',
                message: 'Could not find the desired ingredients',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: ingredients,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired ingredients',
            });
        }
        next(err);
    }
}

export const updateIngredientHandler = async (
    req: Request<{id: string}, {}, UpdateIngredientInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const ingredientId = req.params.id;
        await findAndCheckIngredientById(ingredientId!);

        const receivedIngredient: Ingredient = {
            title: req.body.title!,
            unit: req.body.unit!,
            allergy: req.body.allergy,
        }

        const updatedIngredient = await ingredientModel.updateOne({_id: ingredientId}, receivedIngredient)

        return res.status(200).json({
            status: 'success',
            data: updatedIngredient,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not update desired ingredient',
            });
        }
        next(err);
    }
}

export const deleteIngredientHandler = async (
    req: Request<{id: string}, {}, DeleteIngredientInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const ingredientId: string = req.params.id;
        await findAndCheckIngredientById(ingredientId);
        await deleteIngredientById(ingredientId);

        return res.status(201).json({
            status: 'success',
            data: {},
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired ingredient',
            });
        }
        next(err);
    }
}
