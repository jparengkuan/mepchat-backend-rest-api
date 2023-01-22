
import { FilterQuery, QueryOptions } from 'mongoose';
import config from 'config';
import userModel, { User } from '../models/user.model';
import { excludedFields } from '../controllers/auth.controller';
import { signJwt } from '../utils/jwt';
import redisClient from '../utils/connectRedis';
import { DocumentType } from '@typegoose/typegoose';
import { omit } from 'lodash';
import { UserRole } from '../models/userRole.model';

// CreateUser service
export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return omit(user.toJSON(), excludedFields);
};

// Add Role to user
export const updateRole = async (targetUser: Partial<User>, role: Partial<UserRole>) => {

  const user = userModel.findOneAndUpdate(
    { user: targetUser },
    { role: role },

  );

  return user;

};

// Find User by Id
export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
};

// Find User by Email
export const findUserByEmail = async (email: string) => {
  return await userModel.findOne({ email: email });
}

// Find All users
export const findAllUsers = async () => {
  return await userModel.find();
};

// Find one user by any fields
export const findUser = async (
  query: FilterQuery<User>,
  options: QueryOptions = {}
) => {
  return await userModel.findOne(query, {}, options).select('+password');
};

// Sign Token
export const signToken = async (user: DocumentType<User>) => {
  // Sign the access token
  const access_token = signJwt(
    {
      sub: {
        '_id': user.id,
        'firstname': user.firstname,
        'lastname': user.lastname,
        'email': user.email,
        'company': user.company,
        'role': user.role,
      }
    },
    {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    }
  );

  // Create a Session
  redisClient.set(JSON.stringify(user._id), JSON.stringify(user), {
    EX: 60 * 60,
  });

  // Return access token
  return { access_token };
};