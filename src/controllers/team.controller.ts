import { NextFunction, Request, Response } from 'express';
import { CreateTeamInput } from '../schema/team.schema';
import { createTeam } from '../services/team.service';

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