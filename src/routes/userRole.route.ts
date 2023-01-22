import express from 'express';
import { getAllUsersHandler } from '../controllers/user.controller';

import { createUserRoleHandler, deleteUserRoleHandler, getAllUserRolesHandler, updateUserRoleHandler } from '../controllers/userRole.controller';
import { validate } from '../middleware/validate';
import { createUserRoleSchema, deleteUserRoleSchema, updateUserRoleSchema } from '../schema/userRole.schema';

const router = express.Router();
//router.use(deserializeUser, requireUser);

// Get all user roles
router.get('/', getAllUserRolesHandler)

// Create user role
router.post('/', validate(createUserRoleSchema), createUserRoleHandler)

// Delete user role
router.delete('/:id', validate(deleteUserRoleSchema), deleteUserRoleHandler)

// Patch permissions
router.patch('/:id', validate(updateUserRoleSchema), updateUserRoleHandler)



export default router;

