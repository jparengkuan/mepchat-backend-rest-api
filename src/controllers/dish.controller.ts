import { getModelForClass } from '@typegoose/typegoose';
import { NextFunction, Request, Response } from 'express';
import {
    CreateDishInput,
    DeleteDishInput,
    GetAllDishesInput,
    GetDishInput,
    UpdateDishInput
} from "../schema/dish.schema";
import {Dish, dishModel} from "../models/dish.model";
import {
    createDish, deleteDishById, findAllDishes,
    findAndCheckDishById,
} from "../services/dish.service";

export const createDishHandler = async (
    req: Request<{}, {}, CreateDishInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const dish = await createDish({
            title: req.body.title!,
            description: req.body.description,
            image: req.body.image,
            feature: req.body.feature,
        })

        res.status(201).json({
            status: 'success',
            data: {
                dish,
            },
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Dish already exists',
            });
        }
        next(err);
    }
};

export const getDishHandler = async (
    req: Request<{id: string}, {}, GetDishInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const dishId: string = req.params.id;
        let dish: Dish = await findAndCheckDishById(dishId);

        return res.status(200).json({
            status: 'success',
            data: dish,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired dishs',
            });
        }
        next(err);
    }
}

export const getAllDishsHandler = async (
    req: Request<{}, {}, GetAllDishesInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const dishes = await findAllDishes();

        if (!dishes) {
            return res.status(204).json({
                status: 'fail',
                message: 'Could not find the desired dishs',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: dishes,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired dishs',
            });
        }
        next(err);
    }
}

export const updateDishHandler = async (
    req: Request<{id: string}, {}, UpdateDishInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const dishId = req.params.id;
        await findAndCheckDishById(dishId!);

        const receivedDish: Dish = {
            title: req.body.title!,
            description: req.body.description,
            image: req.body.image,
            feature: req.body.feature,
        }

        const updatedDish = await dishModel.updateOne({_id: dishId}, receivedDish)

        return res.status(200).json({
            status: 'success',
            data: updatedDish,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not update desired dish',
            });
        }
        next(err);
    }
}

export const deleteDishHandler = async (
    req: Request<{id: string}, {}, DeleteDishInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const dishId: string = req.params.id;
        await findAndCheckDishById(dishId);
        await deleteDishById(dishId);

        return res.status(201).json({
            status: 'success',
            data: {},
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired dish',
            });
        }
        next(err);
    }
}
