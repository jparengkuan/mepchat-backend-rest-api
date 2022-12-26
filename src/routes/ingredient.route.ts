import express from "express";
import { validate } from "../middleware/validate";
import {
    createIngredientSchema, deleteIngredientSchema,
    getAllIngredientsSchema,
    getIngredientSchema,
    updateIngredientSchema
} from "../schema/ingredient.schema";
import {
    createIngredientHandler,
    deleteIngredientHandler,
    getAllIngredientsHandler,
    getIngredientHandler, updateIngredientHandler
} from "../controllers/ingredient.controller";

const router = express.Router();

router.get('/', validate(getAllIngredientsSchema), getAllIngredientsHandler);
router.get('/:id', validate(getIngredientSchema), getIngredientHandler);
router.post('/', validate(createIngredientSchema), createIngredientHandler);
router.patch('/:id', validate(updateIngredientSchema), updateIngredientHandler);
router.delete('/:id', validate(deleteIngredientSchema), deleteIngredientHandler);

export default router;
