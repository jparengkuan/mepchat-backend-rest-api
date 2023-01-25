import {getModelForClass, index, mongoose, prop, Ref} from "@typegoose/typegoose";
import {MepList} from "./mepList.model";
import {Recipe} from "./recipe.model";
import {flatten} from "lodash";

@index({ name: 1})

export class MepTask {
    _id?: mongoose.Types.ObjectId;

    @prop({ unique: false, required: true })
    title!: string;

    @prop({ unique: false, required: false })
    description?: string;

    @prop({default: new Date(), required: true })
    due_datetime!: Date;

    @prop({ required: false })
    status?: string;

    // Duration in minutes
    @prop({ required: true })
    duration!: number;

    @prop({ required: true, ref: () => MepList })
    mepList_id!: Ref<MepList>;

    @prop({ required: false, ref: () => Recipe })
    recipe_id?: Ref<Recipe>;
}

export const mepTaskModel = getModelForClass(MepTask);

