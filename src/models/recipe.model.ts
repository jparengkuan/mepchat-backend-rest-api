import {getModelForClass, index, mongoose, prop, Ref} from "@typegoose/typegoose";
import {Dish} from "./dish.model";
import {Ingredient} from "./ingredient.model";

@index({ name: 1})

// Export the Recipe class to be used as Typescript type
export class Recipe {
    _id?: mongoose.Types.ObjectId;

    @prop({ unique: false, required: true })
    title!: string;

    @prop({ required: true })
    volume!: string;

    @prop({ required: true })
    preparation!: string;

    @prop({ required: true })
    unit!: string;

    @prop()
    feature?: string;

    @prop({default: new Date() })
    created_at!: Date;

    @prop({required: true, default: new Date() })
    updated_at!: Date;

    @prop()
    archived_at?: Date;

    @prop()
    deleted_at?: Date;

    @prop({ ref: () => Ingredient })
    ingredients?: Ref<Ingredient>[];
}

// Create the recipe model from the Recipe class
const recipeModel = getModelForClass(Recipe);
export default recipeModel;
