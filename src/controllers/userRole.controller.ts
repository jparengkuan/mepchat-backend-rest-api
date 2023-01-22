import { NextFunction, Request, Response } from 'express';
import userRoleModel from '../models/userRole.model';
import { CreateUserRoleInput, updateUserRoleInput } from '../schema/userRole.schema';
import { createUserRole, deleteUserRole, findAllUserRoles, findUserRoleById } from '../services/userRole.service';

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

export const updateUserRoleHandler = async (
  req: Request<{ id: string }, {}, updateUserRoleInput>,
  res: Response,
  next: NextFunction
) => {
  try {

    const userRole = await findUserRoleById(req.params.id);

    if (!userRole) {
      return res.status(404).json({
        status: 'fail',
        message: 'Role with given id does not exist',
      });
    }


    const role = await userRoleModel.findByIdAndUpdate(
      {
        _id: userRole.id
      },
      {
        $set:
        {
          name: req.body.name,
          description: req.body.description,
          permissions: req.body.permissions
        }
      }
    )

    res.status(200).json({
      status: 'success',
      data: {
        role,
      },
    });

  } catch (err: any) {
    next(err);
  }
};