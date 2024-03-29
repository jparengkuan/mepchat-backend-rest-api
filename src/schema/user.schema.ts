import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    company: string({ required_error: 'Companyname is required' }),
    firstname: string({ required_error: 'Firstname is required' }),
    lastname: string({ required_error: 'Lastname is required' }),
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email'
    ),
    password: string({ required_error: 'Password is required' })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({ required_error: 'Please confirm your password' }),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email or password'
    ),
    password: string({ required_error: 'Password is required' }).min(
      8,
      'Invalid email or password'
    ),
  }),
});

export const updateRoleOfUserSchema = object({
  body: object({
    email: string({ required_error: 'User email is required' }).email(
      'Invalid email'
    ),
    roleId: string({ required_error: "Role id is required" })
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
export type updateRoleOfUserInput = TypeOf<typeof updateRoleOfUserSchema>['body'];