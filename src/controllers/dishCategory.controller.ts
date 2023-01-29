import { NextFunction, Request, Response } from 'express';
import {
    CreateDishCategoryInput,
    DeleteDishCategoryInput,
    GetAllDishCategoriesInput,
    GetDishCategoryInput,
    UpdateDishCategoryInput
} from "../schema/dishCategory.schema";
import {DishCategory, dishCategoryModel} from "../models/dishCategory.model";
import {
    createDishCategory, deleteDishCategoryById,
    findAllDishCategories,
    findAndCheckDishCategoryById,
} from "../services/dishCategory.service";
import {findAndCheckDishById} from "../services/dish.service";
import {Ref} from "@typegoose/typegoose";
import {Dish} from "../models/dish.model";
import {Types} from "mongoose";

export const createDishCategoryHandler = async (
    req: Request<{}, {}, CreateDishCategoryInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log(req.body.dishes)
        const dishesReq = req.body.dishes as unknown as Ref<Dish, Types.ObjectId>[] ?? []
        await validateDishIds(dishesReq)

        const dishCategory = await createDishCategory({
            dishes: dishesReq,
            title: req.body.title!,
            created_at: new Date(),
            updated_at: new Date(),
            archived_at: req.body.archived_at,
            deleted_at: req.body.deleted_at,
        })

        res.status(201).json({
            status: 'success',
            data: {
                dishCategory,
            },
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'DishCategory already exists',
            });
        }
        next(err);
    }
};

export const getDishCategoryHandler = async (
    req: Request<{id: string}, {}, GetDishCategoryInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const dishCategoryId: string = req.params.id;
        let dishCategory: DishCategory = await findAndCheckDishCategoryById(dishCategoryId);

        return res.status(200).json({
            status: 'success',
            data: dishCategory,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired dishCategories',
            });
        }
        next(err);
    }
}

export const getAllDishCategoriesHandler = async (
    req: Request<{}, {}, GetAllDishCategoriesInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const dishCategories = await findAllDishCategories();

        if (!dishCategories) {
            return res.status(204).json({
                status: 'fail',
                message: 'Could not find the desired dishCategories',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: dishCategories,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired dishCategorys',
            });
        }
        next(err);
    }
}

export const updateDishCategoryHandler = async (
    req: Request<{id: string}, {}, UpdateDishCategoryInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const dishCategoryId = req.params.id;
        const dishesReq: string[] = req.body.dishes ?? []
        await validateDishIds(dishesReq)

        await findAndCheckDishCategoryById(dishCategoryId!);
        let receivedDishCategory: DishCategory;

        if (dishesReq.length) {
            receivedDishCategory = {
                title: req.body.title!,
                updated_at: new Date(),
                // @ts-ignore
                dishes: dishesReq,
                archived_at: req.body.archived_at,
                deleted_at: req.body.deleted_at,
            }
        } else {
            receivedDishCategory = {
                title: req.body.title!,
                updated_at: new Date(),
            }
        }

        const updatedDishCategory = await dishCategoryModel.updateOne({_id: dishCategoryId}, receivedDishCategory)

        return res.status(200).json({
            status: 'success',
            data: updatedDishCategory,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not update desired dishCategory',
            });
        }
        next(err);
    }
}

export const deleteDishCategoryHandler = async (
    req: Request<{id: string}, {}, DeleteDishCategoryInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const dishCategoryId: string = req.params.id;
        await findAndCheckDishCategoryById(dishCategoryId);
        await deleteDishCategoryById(dishCategoryId);

        return res.status(201).json({
            status: 'success',
            data: {},
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired dishCategory',
            });
        }
        next(err);
    }
}

async function validateDishIds(ids: any) {
    if (ids.length) {
        for (const dishId of ids) {
            await findAndCheckDishById(dishId);
        }
    }
}
