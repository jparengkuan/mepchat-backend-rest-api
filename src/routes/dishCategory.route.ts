import express from "express";
import { validate } from "../middleware/validate";
import {
    createDishCategorySchema, deleteDishCategorySchema, getAllDishCategoriesSchema,
    getDishCategorySchema,
    updateDishCategorySchema
} from "../schema/dishCategory.schema";
import {
    createDishCategoryHandler,
    deleteDishCategoryHandler, getAllDishCategoriesHandler,
    getDishCategoryHandler, updateDishCategoryHandler
} from "../controllers/dishCategory.controller";

const router = express.Router();

router.get('/', validate(getAllDishCategoriesSchema), getAllDishCategoriesHandler);
router.get('/:id', validate(getDishCategorySchema), getDishCategoryHandler);
router.post('/', validate(createDishCategorySchema), createDishCategoryHandler);
router.patch('/:id', validate(updateDishCategorySchema), updateDishCategoryHandler);
router.delete('/:id', validate(deleteDishCategorySchema), deleteDishCategoryHandler);

export default router;
