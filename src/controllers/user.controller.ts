import { NextFunction, Request, Response } from 'express';
import { updateRoleOfUserInput } from '../schema/user.schema';
import { findAllTeamsFromUser } from '../services/team.service';
import { findAllUsers, findUserByEmail, updateRole } from '../services/user.service';
import { findUserRoleById } from '../services/userRole.service';

export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllTeamsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user._id;

    const teams = await findAllTeamsFromUser(userId);

    console.log(userId)
    console.log(teams)

    res.status(200).json({
      status: 'success',
      data: {
        teams,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAllUsers();
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateRoleOfUserHandler = async (
  req: Request<{}, {}, updateRoleOfUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {

    const targetUser = await findUserByEmail(req.body.email);
    const userRole = await findUserRoleById(req.body.roleId);

    if (!targetUser) {
      return res.status(404).json({
        status: 'fail',
        message: 'User does not exist',
      });
    }

    if (!userRole) {
      return res.status(404).json({
        status: 'fail',
        message: 'UserRole with given id does not exist',
      });
    }

    const user = await updateRole(targetUser, userRole);

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });



  } catch (err: any) {
    next(err);
  }
};

