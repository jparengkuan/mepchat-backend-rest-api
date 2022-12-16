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
    id: string().optional(),
});

export const getAllRecipeSchema = object({
    body: object({}).optional(),
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
    id: string().optional(),
});

export type CreateRecipeInput = TypeOf<typeof createRecipeSchema>['body'];
export type GetRecipeInput = TypeOf<typeof getRecipeSchema>;
export type GetAllRecipeInput = TypeOf<typeof getAllRecipeSchema>['body'];
export type UpdateRecipeInput = TypeOf<typeof updateRecipeSchema>['body'];
export type DeleteRecipeInput = TypeOf<typeof deleteRecipeSchema>;
