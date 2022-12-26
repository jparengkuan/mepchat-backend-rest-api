import teamModel, { Team } from "../models/team.model";
import { User } from "../models/user.model";

// Create new team
export const createTeam = async (input: Partial<Team>) => {
    const team = await teamModel.create(input);
    teamModel.populate
    return team.toJSON();
};

// Find All teams
export const findAllTeams = async () => {
    return await teamModel.find();
};

// Add a user to a team
export const addUser = async (teamName: String, user: Partial<User>) => {

    const team = await teamModel.findOneAndUpdate(
        { name: teamName },
        { $addToSet: { users: user } }
    );

    return team?.toJSON();

};

// Find team by teamName
export const findTeamByName = async (teamName: String) => {
    return await teamModel.findOne({ name: teamName });
};