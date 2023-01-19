import {omit} from 'lodash';
import {Types} from "mongoose";
import {APIError} from "../utils/APIError";
import {DishCategory, dishCategoryModel} from "../models/dishCategory.model";
import {mongoose} from "@typegoose/typegoose";

export const createDishCategory = async (input: { updated_at: Date; created_at: Date; dishes: string[]; title: string }) => {
    const dishCategory = await dishCategoryModel.create(input);
    return dishCategory.toJSON();
};

export const findAndCheckDishCategoryById = async (id: string ) => {
    if (!dishCategoryIdIsValid(id)) {
        throw new APIError("Id is not valid", 422 )
    }

    let dishCategory = await dishCategoryModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: dishLookupQuery,
        },
    ]) as unknown as DishCategory;

    if (!dishCategoryExists(dishCategory)) {
        throw new APIError("Could not find the desired dishCategory", 204)
    }

    return dishCategory;
};

export const findAllDishCategories = async () => {
    const dishCategories = await dishCategoryModel.aggregate(
        [
            {
                $lookup: dishLookupQuery
            }
        ]
    )
    return omit(dishCategories);
};

const dishCategoryExists = (dishCategory: DishCategory) => {
    return Object.keys(dishCategory).length !== 0
}

const dishCategoryIdIsValid = (dishCategoryId: string) => {
    return Types.ObjectId.isValid(dishCategoryId)
}

const dishLookupQuery = {
    from: 'dishes',
    localField: 'dishes',
    foreignField: '_id',
    as: 'dishes'
}
