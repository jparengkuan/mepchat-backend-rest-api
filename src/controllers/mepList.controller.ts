import { getModelForClass } from '@typegoose/typegoose';
import { NextFunction, Request, Response } from 'express';
import {
    CreateMepListInput,
    DeleteMepListInput,
    GetAllMepListsInput,
    GetMepListInput,
    UpdateMepListInput
} from "../schema/mepList.schema";
import {MepList} from "../models/mepList.model";
import {createMepList, findAllMepLists, findMepListById, updateMepList} from "../services/mepList.service";
import {Types} from "mongoose";
import {updateMepTask} from "../services/mepTask.service";

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
        let mepList: MepList = await findMepListById(mepListId);

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
        await findMepListById(mepListId!);

        const receivedMepList: MepList = {
            title: req.body.title!,
            active: req.body.active!,
            owner_id: req.body.owner_id as Types.ObjectId,
        }

        await updateMepTask(mepListId, receivedMepList)

        return res.status(200).json({
            status: 'success',
            data: mepListId,
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
        const mepListModel = getModelForClass(MepList);
        const mepList = await findMepListById(mepListId);

        await mepListModel.deleteOne(mepList)
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
