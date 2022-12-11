import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { User } from "./user.model";

@index({ name: 1})

// Export the Team class to be used as Typescript type
export class Team {
    @prop({ unique: true, required: true })
    name: string;

    @prop()
    users?: User
}

// Create the team model from the Team class
const teamModel = getModelForClass(Team);
export default teamModel;