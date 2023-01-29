import { object, string, TypeOf, z } from 'zod';
import teamModel from '../models/team.model';
import { PermissionsEnum } from '../models/userRole.model';

export const createUserRoleSchema = object({
  body: object({
    name: string({ required_error: 'Name for user role is required' }),
    description: string().optional(),
    team: string().optional()
  }),
});

export const deleteUserRoleSchema = object({
  params: object({
    id: string({ required_error: 'Id is required' }),
  }),
});


export const updateUserRoleSchema = object({
  body: object({
    id: string().optional(),
    name: string().optional(),
    description: string().optional(),
    permissions: z.nativeEnum(PermissionsEnum).array().optional(),
    team: string().optional()
  }),
});




export type CreateUserRoleInput = TypeOf<typeof createUserRoleSchema>['body'];
export type deleteUserRoleInput = TypeOf<typeof deleteUserRoleSchema>['params'];
export type updateUserRoleInput = TypeOf<typeof updateUserRoleSchema>['body'];