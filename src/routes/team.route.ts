import express from 'express';
import { addUserToTeamHandler, newTeamHandler } from '../controllers/team.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { addUserToTeamSchema, createTeamSchema } from '../schema/team.schema';
//import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();
//router.use(deserializeUser, requireUser);

// Create new team route
router.post('/new', validate(createTeamSchema), newTeamHandler);

// Add user to a team route
router.post('/addUser', validate(addUserToTeamSchema), addUserToTeamHandler);

export default router;

