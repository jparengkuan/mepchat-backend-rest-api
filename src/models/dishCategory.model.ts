import {getModelForClass, index, mongoose, prop, Ref} from "@typegoose/typegoose";
import {User} from "./user.model";
import {Dish} from "./dish.model";

@index({ name: 1})

export class DishCategory {
    _id?: mongoose.Types.ObjectId;

    @prop({ unique: true, required: true })
    title!: string;

    @prop({ required: false })
    description?: string;

    @prop({required: true, default: new Date() })
    created_at!: Date;

    @prop({required: true, default: new Date() })
    updated_at!: Date;

    @prop()
    archived_at?: Date;

    @prop()
    deleted_at?: Date;

    @prop({ ref: () => Dish })
    dishes: Ref<Dish>[];
}

export const DishCategoryModel = getModelForClass(DishCategory);

