import { object, string, TypeOf } from 'zod';

export const createRecipeSchema = object({
    body: object({
        title: string({ required_error: 'Title for a recipe is required'}),
        volume: string({ required_error: 'Volume information for a recipe is required'}),
        preparation: string({ required_error: 'Preparation instructions for a recipe is required'}),
        unit: string({ required_error: 'Unit is required for a recipe'})
    }),
});

export const getRecipeSchema = object({
    body: object({
        _id: string({ required_error: 'id is required'}),
    }),
});

export const updateRecipeSchema = object({
    body: object({
        _id: string().optional(),
        title: string().optional(),
        volume: string().optional(),
        preparation: string().optional(),
        unit: string().optional()
    }),
});

export const deleteRecipeSchema = object({
    body: object({
        _id: string({ required_error: 'id is required'}),
    }),
});

export type CreateRecipeInput = TypeOf<typeof createRecipeSchema>['body'];
export type GetRecipeInput = TypeOf<typeof getRecipeSchema>['body'];
export type UpdateRecipeInput = TypeOf<typeof updateRecipeSchema>['body'];
export type DeleteRecipeInput = TypeOf<typeof deleteRecipeSchema>['body'];
