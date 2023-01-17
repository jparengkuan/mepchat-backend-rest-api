import { object, string, TypeOf, z } from 'zod';

export const createTeamSchema = object({
    body: object({
        name: string({ required_error: 'Name for a team is required' })
    }),
});

export const updateUserToTeamSchema = object({
    body: object({
        teamName: string({ required_error: 'teamName is required' }),
        email: string({ required_error: 'Email is required' }).email(
            'Invalid email'
        ),
    }),
});

export const deleteTeamInputSchema = object({
    params: object({
        id: string({ required_error: "id is required" })
    }),
});

export const getTeamInputSchema = object({
    params: object({
        id: string({ required_error: "id is required" })
    }),
});

export type CreateTeamInput = TypeOf<typeof createTeamSchema>['body'];
export type updateUserToTeamInput = TypeOf<typeof updateUserToTeamSchema>['body'];
export type getTeamInput = TypeOf<typeof getTeamInputSchema>['params'];
export type deleteTeamInput = TypeOf<typeof deleteTeamInputSchema>['params'];