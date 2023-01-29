import express from 'express';
import {
  getAllTeamsHandler,
  getAllUsersHandler,
  getMeHandler,
  updateRoleOfUserHandler,
} from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';
import { updateRoleOfUserSchema } from '../schema/user.schema';

const router = express.Router();
router.use(deserializeUser, requireUser);

// Admin Get Users route
router.get('/', restrictTo('admin'), getAllUsersHandler);

// Get all teams where the user is in
router.get('/teams', getAllTeamsHandler);

// Get my info route
router.get('/me', getMeHandler);

// Update user role
router.post('/updateRole', validate(updateRoleOfUserSchema), updateRoleOfUserHandler);


export default router;

