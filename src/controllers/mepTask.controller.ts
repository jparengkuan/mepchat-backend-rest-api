import { getModelForClass } from '@typegoose/typegoose';
import { NextFunction, Request, Response } from 'express';
import {
    CreateMepTaskInput,
    DeleteMepTaskInput,
    GetAllMepTasksInput,
    GetMepTaskInput,
    UpdateMepTaskInput
} from "../schema/mepTask.schema";
import {MepTask, mepTaskModel} from "../models/mepTask.model";
import {createMepTask, deleteMepTaskById, findAllMepTasks, findAndCheckMepTaskById} from "../services/mepTask.service";
import {Types} from "mongoose";

export const createMepTaskHandler = async (
    req: Request<{}, {}, CreateMepTaskInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const mepTask = await createMepTask({
            title: req.body.title!,
            description: req.body.description,
            duration: req.body.duration!,
            status: req.body.status,
            due_datetime: req.body.due_datetime,
            mepList_id: req.body.mepList_id! as unknown as Types.ObjectId,
            recipe_id: req.body.recipe_id as unknown as Types.ObjectId,
        })

        res.status(201).json({
            status: 'success',
            data: {
                mepTask,
            },
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'MepTask already exists',
            });
        }
        next(err);
    }
};

export const getMepTaskHandler = async (
    req: Request<{id: string}, {}, GetMepTaskInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const mepTaskId: string = req.params.id;
        let mepTask: MepTask = await findAndCheckMepTaskById(mepTaskId);

        return res.status(200).json({
            status: 'success',
            data: mepTask,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired mepTasks',
            });
        }
        next(err);
    }
}

export const getAllMepTasksHandler = async (
    req: Request<{}, {}, GetAllMepTasksInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const mepTasks = await findAllMepTasks();

        if (!mepTasks) {
            return res.status(204).json({
                status: 'fail',
                message: 'Could not find the desired mepTasks',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: mepTasks,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired mepTasks',
            });
        }
        next(err);
    }
}

export const updateMepTaskHandler = async (
    req: Request<{id: string}, {}, UpdateMepTaskInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        let mepTaskId = req.params.id;
        await findAndCheckMepTaskById(mepTaskId!);

        const receivedMepTask: MepTask = {
            title: req.body.title!,
            description: req.body.description,
            duration: req.body.duration!,
            status: req.body.status,
            due_datetime: req.body.due_datetime!,
            mepList_id: req.body.mepList_id! as unknown as Types.ObjectId,
            recipe_id: req.body.recipe_id as unknown as Types.ObjectId,
        }

        const updatedMepTask = await mepTaskModel.updateOne({_id: mepTaskId}, receivedMepTask)

        return res.status(200).json({
            status: 'success',
            data: updatedMepTask,
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not update desired mepTask',
            });
        }
        next(err);
    }
}

export const deleteMepTaskHandler = async (
    req: Request<{id: string}, {}, DeleteMepTaskInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const mepTaskId: string = req.params.id;
        await findAndCheckMepTaskById(mepTaskId);
        await deleteMepTaskById(mepTaskId);

        return res.status(201).json({
            status: 'success',
            data: {},
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Could not find the desired mepTask',
            });
        }
        next(err);
    }
}
