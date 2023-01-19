import {object, string, TypeOf, z} from 'zod';

const params = {
    params: object({
        id: string({ required_error: "id is required" })
    })
}

export const createRecipeCategorySchema = object({
    body: object({
        title: string({ required_error: 'Title is required' }),
        updated_at: z.string().transform((a) => new Date(a)).optional(),
        archived_at: z.string().transform((a) => new Date(a)).optional(),
        deleted_at: z.string().transform((a) => new Date(a)).optional(),
        recipes: z.string().array().optional()
    }),
});

export const getRecipeCategorySchema = object({
    ...params
});

export const getAllRecipeCategoriesSchema = object({
    body: object({}).optional(),
});

export const updateRecipeCategorySchema = object({
    body: object({
        title: string().optional(),
        updated_at: z.string().transform((a) => new Date(a)).optional(),
        archived_at: z.string().transform((a) => new Date(a)).optional(),
        deleted_at: z.string().transform((a) => new Date(a)).optional(),
        recipes: z.string().array().optional(),
    }),
});

export const deleteRecipeCategorySchema = object({
    ...params
});

export type GetRecipeCategoryInput = TypeOf<typeof getRecipeCategorySchema>;
export type GetAllRecipeCategoriesInput = TypeOf<typeof getAllRecipeCategoriesSchema>['body'];
export type CreateRecipeCategoryInput = TypeOf<typeof createRecipeCategorySchema>['body'];
export type UpdateRecipeCategoryInput = TypeOf<typeof updateRecipeCategorySchema>['body'];
export type DeleteRecipeCategoryInput = TypeOf<typeof deleteRecipeCategorySchema>;
