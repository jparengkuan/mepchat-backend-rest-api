import { object, string, TypeOf } from 'zod';

export const createRecipeSchema = object({
    body: object({
        title: string({ required_error: 'Title for a recipe is required'}),
        volume: string({ required_error: 'Volume information for a recipe is required'}),
        preparation: string({ required_error: 'Preparation instructions for a recipe is required'}),
        unit: string({ required_error: 'Unit is required for a recipe'})
    }),
});

export const deleteRecipeSchema = object({
    body: object({
        _id: string({ required_error: 'could not find recipe'}),
    }),
});

export type CreateRecipeInput = TypeOf<typeof createRecipeSchema>['body'];
export type DeleteRecipeInput = TypeOf<typeof deleteRecipeSchema>['body'];
