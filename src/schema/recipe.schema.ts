import {object, string, TypeOf, z} from 'zod';

const params = {
    params: object({
        id: string({required_error: "id is required"})
    })
}

export const createRecipeSchema = object({
    body: object({
        title: string({ required_error: 'Title for a recipe is required'}),
        volume: string({ required_error: 'Volume information for a recipe is required'}),
        preparation: string({ required_error: 'Preparation instructions for a recipe is required'}),
        unit: string({ required_error: 'Unit is required for a recipe'}),
        ingredients: z.string().array().optional(),
        updated_at: z.string().transform((a) => new Date(a)).optional(),
        archived_at: z.string().transform((a) => new Date(a)).optional(),
        deleted_at: z.string().transform((a) => new Date(a)).optional(),
    }),
});

export const getRecipeSchema = object({
    ...params
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
        unit: string().optional(),
        ingredients: z.string().array().optional(),
        updated_at: z.string().transform((a) => new Date(a)).optional(),
        archived_at: z.string().transform((a) => new Date(a)).optional(),
        deleted_at: z.string().transform((a) => new Date(a)).optional(),
    }),
});

export const deleteRecipeSchema = object({
    ...params
});

export type CreateRecipeInput = TypeOf<typeof createRecipeSchema>['body'];
export type GetRecipeInput = TypeOf<typeof getRecipeSchema>;
export type GetAllRecipeInput = TypeOf<typeof getAllRecipeSchema>['body'];
export type UpdateRecipeInput = TypeOf<typeof updateRecipeSchema>['body'];
export type DeleteRecipeInput = TypeOf<typeof deleteRecipeSchema>;
