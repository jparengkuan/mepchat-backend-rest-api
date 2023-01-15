import {object, string, TypeOf, z} from 'zod';

const params = {
    params: object({
        id: string({ required_error: "id is required" })
    })
}

export const createDishCategorySchema = object({
    body: object({
        title: string({ required_error: 'Title is required' }),
        updated_at: z.string().transform((a) => new Date(a)).optional(),
        archived_at: z.string().transform((a) => new Date(a)).optional(),
        deleted_at: z.string().transform((a) => new Date(a)).optional(),
        dishes: z.string().array().optional()
    }),
});

export const getDishCategorySchema = object({
    ...params
});

export const getAllDishCategoriesSchema = object({
    body: object({}).optional(),
});

export const updateDishCategorySchema = object({
    body: object({
        title: string().optional(),
        updated_at: z.string().transform((a) => new Date(a)).optional(),
        archived_at: z.string().transform((a) => new Date(a)).optional(),
        deleted_at: z.string().transform((a) => new Date(a)).optional(),
        dishes: z.string().array().optional(),
    }),
});

export const deleteDishCategorySchema = object({
    ...params
});

export type GetDishCategoryInput = TypeOf<typeof getDishCategorySchema>;
export type GetAllDishCategoriesInput = TypeOf<typeof getAllDishCategoriesSchema>['body'];
export type CreateDishCategoryInput = TypeOf<typeof createDishCategorySchema>['body'];
export type UpdateDishCategoryInput = TypeOf<typeof updateDishCategorySchema>['body'];
export type DeleteDishCategoryInput = TypeOf<typeof deleteDishCategorySchema>;
