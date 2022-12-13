import express from "express";
import {validate} from "../middleware/validate";
import {createRecipeSchema, deleteRecipeSchema, getRecipeSchema, updateRecipeSchema} from "../schema/recipe.schema";
import {
    deleteRecipeHandler,
    getRecipeHandler,
    newRecipeHandler,
    updateRecipeHandler
} from "../controllers/recipe.controller";

const router = express.Router();

// Create new recipe route
router.post('/', validate(createRecipeSchema), newRecipeHandler);
router.get('/', validate(getRecipeSchema), getRecipeHandler);
router.patch('/', validate(updateRecipeSchema), updateRecipeHandler);
router.delete('/', validate(deleteRecipeSchema), deleteRecipeHandler);

export default router;
