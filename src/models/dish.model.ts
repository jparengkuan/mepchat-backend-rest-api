import {getModelForClass, index, mongoose, prop, Ref} from "@typegoose/typegoose";
import {Recipe} from "./recipe.model";

@index({ name: 1})

export class Dish {
    _id?: mongoose.Types.ObjectId;

    @prop({ unique: false, required: true })
    title!: string;

    @prop({ required: false })
    feature?: string;

    @prop({ required: false })
    image?: string | Buffer;

    @prop({ required: false })
    description?: string;

    @prop({ required: false, ref: () => Recipe })
    recipes?: Ref<Recipe>[];

    @prop()
    archived_at?: Date;

    @prop()
    deleted_at?: Date;
}

export const dishModel = getModelForClass(Dish);

