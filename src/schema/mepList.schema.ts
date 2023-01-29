import {boolean, object, string, TypeOf, z} from 'zod';

const params = {
    params: object({
        id: string({required_error: "id is required"})
    })
}

export const createMepListSchema = object({
    body: object({
        title: string({ required_error: 'Title for a mepList is required'}),
        active: boolean({ required_error: 'Active information for a mepList is required'}),
        owner_id: string({ required_error: 'owner_id instructions for a mepList is required'}),
        archived_at: z.string().transform((a) => new Date(a)).optional(),
        deleted_at: z.string().transform((a) => new Date(a)).optional(),
    }),
});

export const getMepListSchema = object({
    ...params
});

export const getAllMepListsSchema = object({
    body: object({}).optional(),
});

export const updateMepListSchema = object({
    body: object({
        _id: string().optional(),
        title: string().optional(),
        active: boolean().optional(),
        owner_id: object({}).optional(),
        archived_at: z.string().transform((a) => new Date(a)).optional(),
        deleted_at: z.string().transform((a) => new Date(a)).optional(),
    }),
});

export const deleteMepListSchema = object({
    ...params
});

export type GetMepListInput = TypeOf<typeof getMepListSchema>;
export type GetAllMepListsInput = TypeOf<typeof getAllMepListsSchema>['body'];
export type CreateMepListInput = TypeOf<typeof createMepListSchema>['body'];
export type UpdateMepListInput = TypeOf<typeof updateMepListSchema>['body'];
export type DeleteMepListInput = TypeOf<typeof deleteMepListSchema>;
