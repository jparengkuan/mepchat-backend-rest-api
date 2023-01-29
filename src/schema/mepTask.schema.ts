import {number, object, string, TypeOf, z} from 'zod';

const params = {
    params: object({
        id: string({required_error: "id is required"})
    })
}

export const createMepTaskSchema = object({
    body: object({
        title: string({ required_error: 'Title for a mepTask is required'}),
        description: string().optional(),
        due_datetime: z.string({ required_error: 'Due datetime for a mepTask is required'}).transform((a) => new Date(a)) ,
        status: string().optional(),
        duration: number({required_error: 'Duration for a mepTask is required'}),
        mepList_id: string({required_error: 'mepList for a mepTask is required'}),
        recipe_id: string().optional(),
    }),
});

export const getMepTaskSchema = object({
    ...params
});

export const getAllMepTasksSchema = object({
    body: object({}).optional(),
});

export const updateMepTaskSchema = object({
    body: object({
        _id: string().optional(),
        title: string().optional(),
        description: string().optional(),
        due_datetime: z.string().transform((a) => new Date(a)).optional(),
        status: string().optional(),
        duration: number().optional(),
        mepList_id: string().optional(),
        recipe_id: string().optional(),
    }),
});

export const deleteMepTaskSchema = object({
    ...params
});

export type GetMepTaskInput = TypeOf<typeof getMepTaskSchema>;
export type GetAllMepTasksInput = TypeOf<typeof getAllMepTasksSchema>['body'];
export type CreateMepTaskInput = TypeOf<typeof createMepTaskSchema>['body'];
export type UpdateMepTaskInput = TypeOf<typeof updateMepTaskSchema>['body'];
export type DeleteMepTaskInput = TypeOf<typeof deleteMepTaskSchema>;
