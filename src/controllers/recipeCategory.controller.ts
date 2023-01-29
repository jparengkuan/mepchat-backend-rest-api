import { getModelForClass } from '@typegoose/typegoose';
import { NextFunction, Request, Response } from 'express';
import {
    CreateRecipeCategoryInput,
    DeleteRecipeCategoryInput,
    GetAllRecipeCategoriesInput,
    GetRecipeCategoryInput,
    UpdateRecipeCategoryInput
} from "../schema/recipeCategory.schema";
import {RecipeCategory, recipeCategoryModel} from "../models/recipeCategory.model";
import {
    createRecipeCategory, deleteRecipeCategoryById,
    findAllRecipeCategories,
    findAndCheckRecipeCategoryById,
} from "../services/recipeCategory.service";
import {findAndCheckRecipeById} from "../services/recipe.service";

export const createRecipeCategoryHandler = async (
    req: Request<{}, {}, CreateRecipeCategoryInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipesReq = req.body.recipes ?? []
        await validateRecipeIds(recipesReq)

        const recipeCategory = await createRecipeCategory({
            recipes: recipesReq,
            title: req.body.title!,
            created_at: new Date(),
            updated_at: new Date(),
        })

        res.status(201).json({
            status: 'success',
            data: {
                recipeCategory,
            },
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'RecipeCategory already exists',
            });
        }
        next(err);
    }
};

export const getRecipeCategoryHandler = async (
    req: Request<{id: string}, {}, GetRecipeCategoryInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipeCategoryId: string = req.params.id;
        let recipeCategory: RecipeCategory = await findAndCheckRecipeCategoryById(recipeCategoryId);

        return res.status(200).json({
            status: 'success',
            data: recipeCategory,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired recipeCategorys',
            });
        }
        next(err);
    }
}

export const getAllRecipeCategoriesHandler = async (
    req: Request<{}, {}, GetAllRecipeCategoriesInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipeCategories = await findAllRecipeCategories();

        if (!recipeCategories) {
            return res.status(204).json({
                status: 'fail',
                message: 'Could not find the desired recipeCategories',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: recipeCategories,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired recipeCategories',
            });
        }
        next(err);
    }
}

export const updateRecipeCategoryHandler = async (
    req: Request<{id: string}, {}, UpdateRecipeCategoryInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipeCategoryId = req.params.id;
        const recipesReq: string[] = req.body.recipes ?? []
        await validateRecipeIds(recipesReq)

        await findAndCheckRecipeCategoryById(recipeCategoryId!);
        let receivedRecipeCategory: RecipeCategory;

        if (recipesReq.length) {
            receivedRecipeCategory = {
                title: req.body.title!,
                updated_at: new Date(),
                // @ts-ignore
                recipes: recipesReq,
                archive_at: req.body.archived_at,
                deleted_at: req.body.deleted_at,
            }
        } else {
            receivedRecipeCategory = {
                title: req.body.title!,
                updated_at: new Date(),
            }
        }

        const updatedRecipeCategory = await recipeCategoryModel.updateOne({_id: recipeCategoryId}, receivedRecipeCategory)

        return res.status(200).json({
            status: 'success',
            data: updatedRecipeCategory,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not update desired recipeCategory',
            });
        }
        next(err);
    }
}

export const deleteRecipeCategoryHandler = async (
    req: Request<{id: string}, {}, DeleteRecipeCategoryInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipeCategoryId: string = req.params.id;
        await findAndCheckRecipeCategoryById(recipeCategoryId);
        await deleteRecipeCategoryById(recipeCategoryId);

        return res.status(201).json({
            status: 'success',
            data: {},
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired recipeCategory',
            });
        }
        next(err);
    }
}

async function validateRecipeIds(ids: any) {
    if (ids.length) {
        for (const recipeId of ids) {
            await findAndCheckRecipeById(recipeId);
        }
    }
}
