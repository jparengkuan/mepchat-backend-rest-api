import { NextFunction, Request, Response } from 'express';
import { CreateUserRoleInput } from '../schema/userRole.schema';
import { createUserRole, deleteUserRole, findAllUserRoles } from '../services/userRole.service';

export const createUserRoleHandler = async (
  req: Request<{}, {}, CreateUserRoleInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRole = await createUserRole({
      name: req.body.name,
      description: req.body.description
    });

    res.status(201).json({
      status: 'success',
      data: {
        userRole,
      },
    });

  } catch (err: any) {
    next(err);
  }
};

export const deleteUserRoleHandler = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {

    const userRoleId: string = req.params.id;

    const userRole = await deleteUserRole(userRoleId);

    res.status(201).json({
      status: 'success',
      data: {
        userRole,
      },
    });

  } catch (err: any) {
    next(err);
  }
};

export const getAllUserRolesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await findAllUserRoles();
    res.status(200).json({
      status: 'success',
      result: roles.length,
      data: {
        roles,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

