import { NextFunction, Request, Response } from 'express';
import { addUserToTeamInput, CreateTeamInput } from '../schema/team.schema';
import { addUser, createTeam, findTeamByName } from '../services/team.service';
import { findUserById } from '../services/user.service';

export const newTeamHandler = async (
  req: Request<{}, {}, CreateTeamInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const team = await createTeam({
      name: req.body.name,
    });

    res.status(201).json({
      status: 'success',
      data: {
        team,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'fail',
        message: 'Team already exist',
      });
    }
    next(err);
  }
};

export const addUserToTeamHandler = async (
  req: Request<{}, {}, addUserToTeamInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    // First check if the given team exist
    const team = await findTeamByName(req.body.teamName)

    // Return 404 if team does not exists
    if (!team) {
      return res.status(404).json({
        status: 'fail',
        message: 'Team does not exist',
      });
    }

    // Second check if the given user exist
    try {
      const user = await findUserById(req.body.userId)
      const updatedTeam = await addUser(req.body.teamName, user)

      res.status(201).json({
        status: 'success',
        data: {
          updatedTeam,
        },
      });
    }
    catch (err: any) {
      if (err.kind == 'ObjectId') {
        res.status(400).json({
          status: 'fail',
          message: "userId is not valid"
        });
      }
    }
  } catch (err: any) {
    next(err);
  }
};