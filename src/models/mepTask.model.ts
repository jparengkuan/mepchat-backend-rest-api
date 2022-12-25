import {getModelForClass, index, mongoose, prop, Ref} from "@typegoose/typegoose";
import {User} from "./user.model";
import {MepList} from "./mepList.model";
import {Recipe} from "./recipe.model";

@index({ name: 1})

export class MepTask {
    _id?: mongoose.Types.ObjectId;

    @prop({ unique: true, required: true })
    title!: string;

    @prop({ unique: true, required: false })
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

    @prop({ required: true, ref: () => Recipe })
    recipe_id?: Ref<Recipe>;
}

export const mepTaskModel = getModelForClass(MepTask);

