import { getModelForClass } from '@typegoose/typegoose';
import { NextFunction, Request, Response } from 'express';
import {
    CreateMepListInput,
    DeleteMepListInput,
    GetAllMepListsInput,
    GetMepListInput,
    UpdateMepListInput
} from "../schema/mepList.schema";
import {MepList, mepListModel} from "../models/mepList.model";
import {
    createMepList, deleteMepListById,
    findAllMepLists,
    findAndCheckMepListById,
} from "../services/mepList.service";
import {Types} from "mongoose";

export const createMepListHandler = async (
    req: Request<{}, {}, CreateMepListInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const mepList = await createMepList({
            title: req.body.title!,
            active: req.body.active!,
            owner_id: req.body.owner_id! as unknown as Types.ObjectId,
            archived_at: req.body.archived_at,
            deleted_at: req.body.deleted_at
        })

        res.status(201).json({
            status: 'success',
            data: {
                mepList,
            },
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'MepList already exists',
            });
        }
        next(err);
    }
};

export const getMepListHandler = async (
    req: Request<{id: string}, {}, GetMepListInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const mepListId: string = req.params.id;
        let mepList: MepList = await findAndCheckMepListById(mepListId);

        return res.status(200).json({
            status: 'success',
            data: mepList,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired mepLists',
            });
        }
        next(err);
    }
}

export const getAllMepListsHandler = async (
    req: Request<{}, {}, GetAllMepListsInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const mepLists = await findAllMepLists();

        if (!mepLists) {
            return res.status(204).json({
                status: 'fail',
                message: 'Could not find the desired mepLists',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: mepLists,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired mepLists',
            });
        }
        next(err);
    }
}

export const updateMepListHandler = async (
    req: Request<{id: string}, {}, UpdateMepListInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const mepListId = req.params.id;
        await findAndCheckMepListById(mepListId!);

        const receivedMepList: MepList = {
            title: req.body.title!,
            active: req.body.active!,
            owner_id: req.body.owner_id as Types.ObjectId,
            archived_at: req.body.archived_at,
            deleted_at: req.body.deleted_at
        }

        const updatedMepList = await mepListModel.updateOne({_id: mepListId}, receivedMepList)

        return res.status(200).json({
            status: 'success',
            data: updatedMepList,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not update desired mepList',
            });
        }
        next(err);
    }
}

export const deleteMepListHandler = async (
    req: Request<{id: string}, {}, DeleteMepListInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const mepListId: string = req.params.id;
        await findAndCheckMepListById(mepListId);
        await deleteMepListById(mepListId);

        return res.status(201).json({
            status: 'success',
            data: {},
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired mepList',
            });
        }
        next(err);
    }
}
