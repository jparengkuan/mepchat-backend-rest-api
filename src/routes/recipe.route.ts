import express from "express";
import { validate } from "../middleware/validate";
import {
    createRecipeSchema,
    deleteRecipeSchema,
    getAllRecipeSchema,
    getRecipeSchema,
    updateRecipeSchema
} from "../schema/recipe.schema";
import {
    deleteRecipeHandler, getAllRecipeHandler,
    getRecipeHandler,
    newRecipeHandler,
    updateRecipeHandler
} from "../controllers/recipe.controller";

const router = express.Router();

// Create new recipe route
router.post('/', validate(createRecipeSchema), newRecipeHandler);
router.get('/', validate(getAllRecipeSchema), getAllRecipeHandler);
router.get('/:id', validate(getRecipeSchema), getRecipeHandler);
router.patch('/:id', validate(updateRecipeSchema), updateRecipeHandler);
router.delete('/:id', validate(deleteRecipeSchema), deleteRecipeHandler);

export default router;
