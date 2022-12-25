import {omit} from 'lodash';
import {ObjectId, Types} from "mongoose";
import {APIError} from "../utils/APIError";
import {MepTask, mepTaskModel} from "../models/mepTask.model";

export const createMepTask = async (input: MepTask) => {
    const mepTask = await mepTaskModel.create(input);
    return mepTask.toJSON();
};

export const updateMepTask = async (mepTaskID: string, input: Partial<MepTask>) => {
    return mepTaskModel.findByIdAndUpdate(mepTaskID, input);
};

export const findMepTaskById = async (id: string ) => {
    if (!mepTaskIdIsValid(id)) {
        throw new APIError("Id is not valid", 422 )
    }

    let mepTask = await mepTaskModel.findById(id).lean();
    mepTask = omit(mepTask)

    if (!mepTaskExists(mepTask)) {
        throw new APIError("Could not find the desired mepTask", 204)
    }

    return mepTask;
};

export const findAllMepTasks = async () => {
    const mepTask = await mepTaskModel.find().lean();
    return omit(mepTask);
};

const mepTaskExists = (mepTask: MepTask) => {
    return Object.keys(mepTask).length !== 0
}

const mepTaskIdIsValid = (mepTaskId: string) => {
    return Types.ObjectId.isValid(mepTaskId)
}
