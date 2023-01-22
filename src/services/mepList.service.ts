import {Types} from "mongoose";
import {APIError} from "../utils/APIError";
import {MepList, mepListModel} from "../models/mepList.model";

export const createMepList = async (input: MepList) => {
    const mepList = await mepListModel.create(input);
    return mepList.toJSON();
};

export const findAndCheckMepListById = async (id: string ) => {
    if (!mepListIdIsValid(id)) {
        throw new APIError("Id is not valid", 422 )
    }

    let mepList = await mepListModel.findById(id).lean() as MepList;

    if (!mepListExists(mepList)) {
        throw new APIError("Could not find the desired mepList", 204)
    }

    return mepList;
};

export const findAllMepLists = async () => {
    return mepListModel.find().lean();
};

export const deleteMepListById = async (id: string | Types.ObjectId) => {
    await mepListModel.findByIdAndDelete(id)
};

const mepListExists = (mepList: MepList) => {
    return Object.keys(mepList).length !== 0
}

const mepListIdIsValid = (mepListId: string) => {
    return Types.ObjectId.isValid(mepListId)
}
