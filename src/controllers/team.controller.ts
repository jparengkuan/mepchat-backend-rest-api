import { NextFunction, Request, Response } from 'express';
import { CreateTeamInput, deleteTeamInput, getTeamInput, updateUserToTeamInput } from '../schema/team.schema';
import { addUser, createTeam, deleteTeamById, deleteUser, findAllTeams, findTeamById, findTeamByName, userIsMemberofTeam } from '../services/team.service';
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


export const getTeamHandler = async (
  req: Request<{ id: string }, {}, getTeamInput>,
  res: Response,
  next: NextFunction
) => {
  try {

    const team = await findTeamById(req.params.id)
    if (!team) {
      return res.status(404).json({
        status: 'fail',
        message: 'Team does not exist',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        team
      },
    });
  } catch (err: any) {
    next(err);
  }
};


export const deleteTeamHandler = async (
  req: Request<{ id: string }, {}, deleteTeamInput>,
  res: Response,
  next: NextFunction
) => {
  try {

    const team = await deleteTeamById(req.params.id)

    if (!team) {
      return res.status(404).json({
        status: 'fail',
        message: 'Team does not exist',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        team
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
  req: Request<{}, {}, updateUserToTeamInput>,
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
      // Check if user already in team
      const isAlreadyMember = await userIsMemberofTeam(req.body.teamName, user);

      if (isAlreadyMember) {
        return res.status(404).json({
          status: 'fail',
          message: 'User already in team',
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

export const deleteUserFromTeamHandler = async (
  req: Request<{}, {}, updateUserToTeamInput>,
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

      // Check if user exists in team
      const userIsMemberOfTeam = await userIsMemberofTeam(req.body.teamName, user);

      if (!userIsMemberOfTeam) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not in team',
        });

      }

      const updatedTeam = await deleteUser(req.body.teamName, user._id)

      res.status(201).json({
        status: 'success',
        data: {
          updatedTeam,
        },
      });
    }
    catch (err: any) {
      next(err);
    }
  } catch (err: any) {
    next(err);
  }
};