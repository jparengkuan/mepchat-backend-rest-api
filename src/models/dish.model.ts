import {getModelForClass, index, mongoose, prop} from "@typegoose/typegoose";

@index({ name: 1})

export class Dish {
    _id?: mongoose.Types.ObjectId;

    @prop({ unique: true, required: true })
    title!: string;

    @prop({ required: false })
    feature?: string;

    @prop({ required: false })
    image?: string;

    @prop({ required: false })
    description?: string;
}

export const dishModel = getModelForClass(Dish);

