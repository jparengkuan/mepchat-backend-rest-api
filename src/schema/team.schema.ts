import { object, string, TypeOf, z } from 'zod';

export const createTeamSchema = object({
    body: object({
        name: string({ required_error: 'Name for a team is required'})
    }),
});

export const addUserToTeamSchema = object({
    body: object({
        teamName: string({ required_error: 'teamName is required'}),
        userId: string({ required_error: 'userId is required'})
    }),
});

export type CreateTeamInput = TypeOf<typeof createTeamSchema>['body'];
export type addUserToTeamInput = TypeOf<typeof addUserToTeamSchema>['body'];