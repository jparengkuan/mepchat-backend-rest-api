import { omit } from "lodash";
import mongoose, { Types } from "mongoose";
import { excludedFields } from "../controllers/auth.controller";
import teamModel, { Team } from "../models/team.model";
import { User } from "../models/user.model";
import { loginUserSchema } from "../schema/user.schema";
import { APIError } from "../utils/APIError";

// Create new team
export const createTeam = async (input: Partial<Team>) => {
    const team = await teamModel.create(input);
    teamModel.populate
    return team.toJSON();
};

// Find All teams
export const findAllTeams = async () => {

    const teams = await teamModel.aggregate([
        { $lookup: { from: 'users', localField: 'user', foreignField: 'id', as: 'users' } }, // Join
        {
            $project: { // Fields to exclude from users
                'users.password': 0,
                'users.role': 0,
                'users.createdAt': 0,
                'users.updatedAt': 0,
            }
        },
    ]);

    return teams;
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

// Find team by id
export const findTeamById = async (id: string) => {

    // Check if the given id is valid
    if (!isValidObjectId(id)) {
        throw new APIError("Id is not valid", 422)
    }

    const teams = await teamModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Match id
        { $lookup: { from: 'users', localField: 'user', foreignField: 'id', as: 'users' } }, // Join
        {
            $project: { // Fields to exclude from users table
                'users.password': 0,
                'users.role': 0,
                'users.createdAt': 0,
                'users.updatedAt': 0,
            }
        },

    ]);

    return teams;
}


// Fuction to check if the given id is a valid mongodb objectid
const isValidObjectId = (id: string) => {
    return Types.ObjectId.isValid(id)
}