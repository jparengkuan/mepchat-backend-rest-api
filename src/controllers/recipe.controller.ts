import { NextFunction, Request, Response } from 'express';
import {CreateRecipeInput} from "../schema/recipe.schema";
import {createRecipe} from "../services/recipe.service";

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
