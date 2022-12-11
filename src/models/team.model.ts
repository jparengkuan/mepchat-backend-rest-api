import { getModelForClass, prop, Ref} from "@typegoose/typegoose";
import { User } from "./user.model";

// Export the Team class to be used as Typescript type
export class Team {
    @prop({ unique: true, required: true })
    name: string;

    @prop({ ref: () => User })
    users: Ref<User>[];
}

// Create the team model from the Team class
const teamModel = getModelForClass(Team);
export default teamModel;