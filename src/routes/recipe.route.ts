import express from "express";
import {validate} from "../middleware/validate";
import {createRecipeSchema, deleteRecipeSchema, getRecipeSchema} from "../schema/recipe.schema";
import {deleteRecipeHandler, getRecipeHandler, newRecipeHandler} from "../controllers/recipe.controller";

const router = express.Router();

// Create new recipe route
router.post('/', validate(createRecipeSchema), newRecipeHandler);
router.get('/', validate(getRecipeSchema), getRecipeHandler);
router.delete('/', validate(deleteRecipeSchema), deleteRecipeHandler);

export default router;
