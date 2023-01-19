import {omit} from 'lodash';
import {Types} from "mongoose";
import {APIError} from "../utils/APIError";
import {MepTask, mepTaskModel} from "../models/mepTask.model";
import recipeModel from "../models/recipe.model";

export const createMepTask = async (input: MepTask) => {
    const mepTask = await mepTaskModel.create(input);
    return mepTask.toJSON();
};

export const findAndCheckMepTaskById = async (id: string ) => {
    if (!mepTaskIdIsValid(id)) {
        throw new APIError("Id is not valid", 422 )
    }

    let mepTask = await mepTaskModel.findById(id).lean() as MepTask;

    if (!mepTaskExists(mepTask)) {
        throw new APIError("Could not find the desired mepTask", 204)
    }

    return mepTask;
};

export const findAllMepTasks = async () => {
    const mepTask = await mepTaskModel.find().lean();
    return omit(mepTask);
};

export const deleteMepTaskById = async (id: string | Types.ObjectId) => {
    await mepTaskModel.findByIdAndDelete(id)
};

const mepTaskExists = (mepTask: MepTask) => {
    return Object.keys(mepTask).length !== 0
}

const mepTaskIdIsValid = (mepTaskId: string) => {
    return Types.ObjectId.isValid(mepTaskId)
}
