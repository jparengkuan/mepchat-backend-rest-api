import mongoose, { Types } from "mongoose";
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

    const teams = await teamModel.aggregate(
        [
            {
                /**
                 * from: The target collection.
                 * localField: The local join field.
                 * foreignField: The target join field.
                 * as: The name for the results.
                 * pipeline: Optional pipeline to run on the foreign collection.
                 * let: Optional variables to use in the pipeline field stages.
                 */
                $lookup: {
                    from: "users",
                    localField: "users",
                    foreignField: "_id",
                    as: "users",
                },
            },
            {
                /**
                 * Provide the field name to exclude.
                 * To exclude multiple fields, pass the field names in an array.
                 */
                $unset: ["users.password", "users.role", "users.createdAt", "users.updatedAt"],
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
        {
            /**
             * query: The query in MQL.
             * params _id: The id of the team were looking fore
             */
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            },
        },
        {
            /**
             * from: The target collection.
             * localField: The local join field.
             * foreignField: The target join field.
             * as: The name for the results.
             * pipeline: Optional pipeline to run on the foreign collection.
             * let: Optional variables to use in the pipeline field stages.
             */
            $lookup: {
                from: "users",
                localField: "users",
                foreignField: "_id",
                as: "users",
            },
        },
        {
            /**
             * Provide the field name to exclude.
             * To exclude multiple fields, pass the field names in an array.
             */
            $unset: [
                "users.password",
                "users.role",
                "users.createdAt",
                "users.updatedAt",
            ],
        },
    ]);

    return teams;
}

// Check if a user is a member of a given team
export const userIsMemberofTeam = async (teamName: string, user: Partial<User>) => {
    const result = await teamModel.find({ 'name': teamName, 'users': user })
    if (result.length === 0) {
        return false;
    }
    else {
        return true;
    }
};

// Fuction to check if the given id is a valid mongodb objectid
const isValidObjectId = (id: string) => {
    return Types.ObjectId.isValid(id)
}