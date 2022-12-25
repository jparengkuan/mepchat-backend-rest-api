import express from "express";
import {validate} from "../middleware/validate";
import {
    createMepTaskSchema, deleteMepTaskSchema,
    getAllMepTasksSchema,
    getMepTaskSchema,
    updateMepTaskSchema
} from "../schema/mepTask.schema";
import {
    createMepTaskHandler,
    deleteMepTaskHandler,
    getAllMepTasksHandler,
    getMepTaskHandler, updateMepTaskHandler
} from "../controllers/mepTask.controller";

const router = express.Router();

router.get('/', validate(getAllMepTasksSchema), getAllMepTasksHandler);
router.get('/:id', validate(getMepTaskSchema), getMepTaskHandler);
router.post('/', validate(createMepTaskSchema), createMepTaskHandler);
router.patch('/:id', validate(updateMepTaskSchema), updateMepTaskHandler);
router.delete('/:id', validate(deleteMepTaskSchema), deleteMepTaskHandler);

export default router;
