import { NextFunction, Request, Response } from 'express';
import { getUserPermissions } from '../services/user.service';
import AppError from '../utils/appError';

export const restrictTo =
  (...allowedRoles: string[]) =>
    (req: Request, res: Response, next: NextFunction) => {
      const user = res.locals.user;
      if (!allowedRoles.includes(user.role)) {
        return next(
          new AppError('You are not allowed to perform this action', 403)
        );
      }

      next();
    };

export const checkPermissions =
  (...permissions: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {

      next();
      return;

      // Get the user from the redis database
      const user = res.locals.user;

      // Get all the permissions
      const userPermisions = await getUserPermissions(user);

      // @ts-ignore
      if (!permissions.every(perm => userPermisions?.includes(perm))) {
        return next(
          new AppError('You are not allowed to perform this action', 403)
        );
      }

      next();
    };

