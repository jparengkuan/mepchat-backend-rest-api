import express from "express";
import { validate } from "../middleware/validate";
import {
    createRecipeCategorySchema, deleteRecipeCategorySchema, getAllRecipeCategoriesSchema,
    getRecipeCategorySchema,
    updateRecipeCategorySchema
} from "../schema/recipeCategory.schema";
import {
    createRecipeCategoryHandler,
    deleteRecipeCategoryHandler, getAllRecipeCategoriesHandler,
    getRecipeCategoryHandler, updateRecipeCategoryHandler
} from "../controllers/recipeCategory.controller";

const router = express.Router();

router.get('/', validate(getAllRecipeCategoriesSchema), getAllRecipeCategoriesHandler);
router.get('/:id', validate(getRecipeCategorySchema), getRecipeCategoryHandler);
router.post('/', validate(createRecipeCategorySchema), createRecipeCategoryHandler);
router.patch('/:id', validate(updateRecipeCategorySchema), updateRecipeCategoryHandler);
router.delete('/:id', validate(deleteRecipeCategorySchema), deleteRecipeCategoryHandler);

export default router;
