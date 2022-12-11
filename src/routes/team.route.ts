import express from 'express';
import { newTeamHandler } from '../controllers/team.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createTeamSchema } from '../schema/team.schema';
//import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();
//router.use(deserializeUser, requireUser);

// Create new team route
router.post('/new', validate(createTeamSchema), newTeamHandler);

export default router;

