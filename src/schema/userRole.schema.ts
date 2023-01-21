import { object, string, TypeOf } from 'zod';

export const createUserRoleSchema = object({
  body: object({
    name: string({ required_error: 'Name for user role is required' }),
    description: string().optional(),
  }),
});

export const deleteUserRoleSchema = object({
  params: object({
    id: string({ required_error: 'Id is required' }),
  }),
});




export type CreateUserRoleInput = TypeOf<typeof createUserRoleSchema>['body'];
export type deleteUserRoleInput = TypeOf<typeof deleteUserRoleSchema>['params'];