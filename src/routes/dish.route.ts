import express from "express";
import { validate } from "../middleware/validate";
import {
    createDishSchema, deleteDishSchema,
    getAllDishesSchema,
    getDishSchema,
    updateDishSchema
} from "../schema/dish.schema";
import {
    createDishHandler,
    deleteDishHandler, getAllDishesHandler,
    getDishHandler, updateDishHandler
} from "../controllers/dish.controller";

const router = express.Router();

router.get('/', validate(getAllDishesSchema), getAllDishesHandler);
router.get('/:id', validate(getDishSchema), getDishHandler);
router.post('/', validate(createDishSchema), createDishHandler);
router.patch('/:id', validate(updateDishSchema), updateDishHandler);
router.delete('/:id', validate(deleteDishSchema), deleteDishHandler);

export default router;
