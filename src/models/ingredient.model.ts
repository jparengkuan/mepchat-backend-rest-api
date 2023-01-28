import {getModelForClass, index, mongoose, prop} from "@typegoose/typegoose";

@index({ name: 1})

export class Ingredient {
    _id?: mongoose.Types.ObjectId;

    @prop({ unique: false, required: true })
    title!: string;

    @prop({ required: true })
    unit!: string;

    @prop({ required: false })
    allergy?: string;
}

export const ingredientModel = getModelForClass(Ingredient);

