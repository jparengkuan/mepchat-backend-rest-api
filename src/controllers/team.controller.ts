import { NextFunction, Request, Response } from 'express';
import { addUserToTeamInput, CreateTeamInput } from '../schema/team.schema';
import { addUser, createTeam, findAllTeams, findTeamByName } from '../services/team.service';
import { findUser } from '../services/user.service';

export const getAllTeamsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const teams = await findAllTeams()
    res.status(200).json({
      status: 'success',
      result: teams.length,
      data: {
        teams
      },
    });
  } catch (err: any) {
    next(err);
  }
};


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
      // Get the user from the collection
      const user = await findUser({ email: req.body.email });

      // Return 404 if the user does not exist
      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'User does not exist',
        });

      }
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