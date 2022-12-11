import express from "express";
import {validate} from "../middleware/validate";
import {createRecipeSchema} from "../schema/recipe.schema";
import {newRecipeHandler} from "../controllers/recipe.controller";

const router = express.Router();

// Create new recipe route
router.post('/new', validate(createRecipeSchema), newRecipeHandler);

export default router;
