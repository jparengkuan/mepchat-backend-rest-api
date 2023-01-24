import {
  getModelForClass,
  mongoose,
  pre,
  prop,
} from '@typegoose/typegoose';
import userModel from './user.model';

export enum PermissionsEnum {

  USER_ROLE_CREATE = "USER_ROLE_CREATE",
  USER_ROLE_EDIT = "USER_ROLE_EDIT",
  USER_ROLE_DELETE = "USER_ROLE_DELETE",
  USER_ROLE_VIEW = "USER_ROLE_VIEW"

}


@pre<UserRole>('findOneAndDelete', async function () {

  // Get the user role
  const userRole = await this.model.findOne(this.getFilter());

  // Update references in usermodel in case of deletion
  await userModel.updateMany(
    {
      role: userRole._id // Where role = user.role_id
    },
    {
      $set: { role: null } // Set to null
    }

  )
})

// Export the UserRole class to be used as TypeScript type
export class UserRole {
  @prop({ type: String, required: true })
  name: string;

  @prop({ type: String })
  description: string;

  @prop({ type: String, enum: PermissionsEnum, default: [] })
  permissions!: PermissionsEnum[];

}

// Create the userRole model from the User class
const userRoleModel = getModelForClass(UserRole);
export default userRoleModel;