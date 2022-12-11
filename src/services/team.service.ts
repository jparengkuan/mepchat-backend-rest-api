import teamModel, { Team } from "../models/team.model";

// Create new team
export const createTeam = async (input: Partial<Team>) => {
    const team = await teamModel.create(input);
    return team.toJSON();
};