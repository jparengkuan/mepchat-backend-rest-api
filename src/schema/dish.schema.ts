import {object, string, TypeOf, z} from 'zod';

const params = {
    params: object({
        id: string({ required_error: "id is required" })
    })
}

export const createDishSchema = object({
    body: object({
        title: string({ required_error: 'Title for a dish is required' }),
        description: string().optional(),
        feature: string().optional(),
        image: string().optional(),
        recipes: z.string().array().optional(),
    }),
});

export const getDishSchema = object({
    ...params
});

export const getAllDishesSchema = object({
    body: object({}).optional(),
});

export const updateDishSchema = object({
    body: object({
        title: string({ required_error: 'Title for a dish is required' }),
        description: string().optional(),
        feature: string().optional(),
        image: string().optional(),
        recipes: z.string().array().optional(),
    }),
});

export const deleteDishSchema = object({
    ...params
});

export type GetDishInput = TypeOf<typeof getDishSchema>;
export type GetAllDishesInput = TypeOf<typeof getAllDishesSchema>['body'];
export type CreateDishInput = TypeOf<typeof createDishSchema>['body'];
export type UpdateDishInput = TypeOf<typeof updateDishSchema>['body'];
export type DeleteDishInput = TypeOf<typeof deleteDishSchema>;
