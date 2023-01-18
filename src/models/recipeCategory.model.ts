import {getModelForClass, index, mongoose, prop, Ref} from "@typegoose/typegoose";
import {Recipe} from "./recipe.model";

@index({ name: 1})

export class RecipeCategory {
    _id?: mongoose.Types.ObjectId;

    @prop({ unique: true, required: true })
    title!: string;

    @prop({required: false, default: new Date() })
    created_at?: Date;

    @prop({required: true, default: new Date() })
    updated_at!: Date;

    @prop()
    archived_at?: Date;

    @prop()
    deleted_at?: Date;

    @prop({ ref: () => Recipe })
    recipes?: Ref<Recipe>[];
}

export const recipeCategoryModel = getModelForClass(RecipeCategory);

