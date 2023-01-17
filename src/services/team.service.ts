import { Types } from "mongoose";
import teamModel, { Team } from "../models/team.model";
import { User } from "../models/user.model";
import { APIError } from "../utils/APIError";

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

// Delete team by id
export const deleteTeamById = async (id: string) => {

    // Check if the given id is valid
    if (!isValidObjectId(id)) {
        throw new APIError("Id is not valid", 422)
    }

    return await teamModel.findByIdAndDelete(id)
};

// Add a user to a team
export const addUser = async (teamName: String, user: Partial<User>) => {

    const team = await teamModel.findOneAndUpdate(
        { name: teamName },
        { $addToSet: { users: user } }
    );

    return team?.toJSON();

};

// Delete a user from a team
export const deleteUser = async (teamName: String, user: Partial<User>) => {

    const team = await teamModel.findOneAndUpdate(
        { name: teamName },
        { $pull: { users: user } }
    );

    return team?.toJSON();
};

// Find team by teamName
export const findTeamByName = async (teamName: string) => {
    return await teamModel.findOne({ name: teamName });
};

// Fuction to check if the given id is a valid mongodb objectid
const isValidObjectId = (id: string) => {
    return Types.ObjectId.isValid(id)
}