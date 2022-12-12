import express from "express";
import {validate} from "../middleware/validate";
import {createRecipeSchema, deleteRecipeSchema} from "../schema/recipe.schema";
import {deleteRecipeHandler, newRecipeHandler} from "../controllers/recipe.controller";

const router = express.Router();

// Create new recipe route
router.post('/new', validate(createRecipeSchema), newRecipeHandler);
router.delete('/', validate(deleteRecipeSchema), deleteRecipeHandler);

export default router;
