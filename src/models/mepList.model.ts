import {getModelForClass, index, mongoose, prop, Ref} from "@typegoose/typegoose";
import {User} from "./user.model";
import {MepTask} from "./mepTask.model";

@index({ name: 1})

export class MepList {
    _id?: mongoose.Types.ObjectId;

    @prop({ unique: true, required: true })
    title!: string;

    @prop({ required: true })
    active!: boolean;

    @prop({ required: true, ref: () => User })
    owner_id!: Ref<User>;
}

export const mepListModel = getModelForClass(MepList);

