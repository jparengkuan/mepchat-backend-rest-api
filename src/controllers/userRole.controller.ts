import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import teamModel from '../models/team.model';
import userRoleModel from '../models/userRole.model';
import { CreateUserRoleInput, updateUserRoleInput } from '../schema/userRole.schema';
import { findTeamById } from '../services/team.service';
import { createUserRole, deleteUserRole, findAllUserRoles, findUserRoleById } from '../services/userRole.service';
import { APIError } from '../utils/APIError';

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

    if (req.body.team) {

      console.log("finding team")

      const team = await findTeamById(req.body.team)

      if (team.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: 'Team with given id does not exist',
        });
      }
    }

    console.log(req.body.team)



    const role = await userRoleModel.findByIdAndUpdate(
      {
        _id: userRole.id
      },
      {
        $set:
        {
          name: req.body.name,
          description: req.body.description,
          permissions: req.body.permissions,
          team: req.body.team
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