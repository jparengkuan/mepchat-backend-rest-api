import express from 'express';
import { addUserToTeamHandler, deleteTeamHandler, deleteUserFromTeamHandler, getAllTeamsHandler, newTeamHandler } from '../controllers/team.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createTeamSchema, deleteTeamInputSchema, updateUserToTeamSchema } from '../schema/team.schema';
//import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();
//router.use(deserializeUser, requireUser);

// Create new team route
router.post('/', validate(createTeamSchema), newTeamHandler);

// Add user to a team route
router.post('/addUser', validate(updateUserToTeamSchema), addUserToTeamHandler);

// Delete user from a team route
router.delete('/deleteUser', validate(updateUserToTeamSchema), deleteUserFromTeamHandler);

// Get all the teams
router.get('/', getAllTeamsHandler);

// Delete team
router.delete('/:id', validate(deleteTeamInputSchema), deleteTeamHandler);

export default router;

