import {omit} from 'lodash';
import {Types} from "mongoose";
import {APIError} from "../utils/APIError";
import {Dish, dishModel} from "../models/dish.model";

export const createDish = async (input: Dish) => {
    const dish = await dishModel.create(input);
    return dish.toJSON();
};

export const findAndCheckDishById = async (id: string ) => {
    if (!dishIdIsValid(id)) {
        throw new APIError("Id is not valid", 422 )
    }

    let dish = await dishModel.findById(id).lean() as Dish;

    if (!dishExists(dish)) {
        throw new APIError("Could not find the desired dish", 204)
    }

    return dish;
};

export const findAllDishes = async () => {
    const dish = await dishModel.find().lean();
    return omit(dish);
};

export const deleteDishById = async (id: string | Types.ObjectId) => {
    await dishModel.findByIdAndDelete(id)
};

const dishExists = (dish: Dish) => {
    return Object.keys(dish).length !== 0
}

const dishIdIsValid = (dishId: string) => {
    return Types.ObjectId.isValid(dishId)
}
