import express from "express";
import {validate} from "../middleware/validate";
import {
    createMepListSchema, deleteMepListSchema,
    getAllMepListsSchema,
    getMepListSchema,
    updateMepListSchema
} from "../schema/mepList.schema";
import {
    createMepListHandler,
    deleteMepListHandler,
    getAllMepListsHandler,
    getMepListHandler, updateMepListHandler
} from "../controllers/mepList.controller";

const router = express.Router();

router.get('/', validate(getAllMepListsSchema), getAllMepListsHandler);
router.get('/:id', validate(getMepListSchema), getMepListHandler);
router.post('/', validate(createMepListSchema), createMepListHandler);
router.patch('/:id', validate(updateMepListSchema), updateMepListHandler);
router.delete('/:id', validate(deleteMepListSchema), deleteMepListHandler);

export default router;
