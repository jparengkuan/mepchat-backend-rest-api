

import { Types } from 'mongoose';
import userRoleModel, { UserRole } from '../models/userRole.model';
import { APIError } from '../utils/APIError';

// Create user role 
export const createUserRole = async (input: Partial<UserRole>) => {
  const userRole = await userRoleModel.create(input);
  return userRole.toJSON()
};

// delete user role
export const deleteUserRole = async (id: string) => {

  if (!Types.ObjectId.isValid(id)) {
    throw new APIError("Id is not valid", 422)
  }

  const userRole = await userRoleModel.findByIdAndDelete(id);

  return userRole?.toJSON;

};

// Find user role by id
export const findUserRoleById = async (id: string) => {

  if (!Types.ObjectId.isValid(id)) {
    throw new APIError("Id is not valid", 422)
  }

  const userRole = await userRoleModel.findById(id);

  return userRole;

}

// Find All user roles
export const findAllUserRoles = async () => {
  return await userRoleModel.find();
};