import { object, string, TypeOf } from 'zod';

export const createTeamSchema = object({
    body: object({
        name: string({ required_error: 'Name for a team is required'})
    }),
});

export type CreateTeamInput = TypeOf<typeof createTeamSchema>['body'];