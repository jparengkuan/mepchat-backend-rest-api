import {object, string, TypeOf} from 'zod';

const params = {
    params: object({
        id: string({required_error: "id is required"})
    })
}

export const createIngredientSchema = object({
    body: object({
        title: string({ required_error: 'Title for a ingredient is required'}),
        unit: string({ required_error: 'Unit for a ingredient is required'}),
        allergy: string().optional(),
    }),
});

export const getIngredientSchema = object({
    ...params
});

export const getAllIngredientsSchema = object({
    body: object({}).optional(),
});

export const updateIngredientSchema = object({
    body: object({
        _id: string().optional(),
        title: string().optional(),
        unit: string().optional(),
        allergy: string({}).optional(),
    }),
});

export const deleteIngredientSchema = object({
    ...params
});

export type GetIngredientInput = TypeOf<typeof getIngredientSchema>;
export type GetAllIngredientsInput = TypeOf<typeof getAllIngredientsSchema>['body'];
export type CreateIngredientInput = TypeOf<typeof createIngredientSchema>['body'];
export type UpdateIngredientInput = TypeOf<typeof updateIngredientSchema>['body'];
export type DeleteIngredientInput = TypeOf<typeof deleteIngredientSchema>;
