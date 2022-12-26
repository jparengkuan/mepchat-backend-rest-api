import {omit} from 'lodash';
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

    let mepList = await mepListModel.findById(id).lean();
    mepList = omit(mepList)

    if (!mepListExists(mepList)) {
        throw new APIError("Could not find the desired mepList", 204)
    }

    return mepList;
};

export const findAllMepLists = async () => {
    const mepList = await mepListModel.find().lean();
    return omit(mepList);
};

const mepListExists = (mepList: MepList) => {
    return Object.keys(mepList).length !== 0
}

const mepListIdIsValid = (mepListId: string) => {
    return Types.ObjectId.isValid(mepListId)
}
