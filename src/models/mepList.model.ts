import {getModelForClass, index, mongoose, prop, Ref} from "@typegoose/typegoose";
import {User} from "./user.model";

@index({ name: 1})

export class MepList {
    _id?: mongoose.Types.ObjectId;

    @prop({ unique: false, required: true })
    title!: string;

    @prop({ required: true })
    active!: boolean;

    @prop({ required: true, ref: () => User })
    owner_id!: Ref<User>;

    @prop()
    archived_at?: Date;

    @prop()
    deleted_at?: Date;
}

export const mepListModel = getModelForClass(MepList);

