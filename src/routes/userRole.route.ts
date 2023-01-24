import express from 'express';

import { createUserRoleHandler, deleteUserRoleHandler, getAllUserRolesHandler, updateUserRoleHandler } from '../controllers/userRole.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { checkPermissions } from '../middleware/restrictTo';
import { validate } from '../middleware/validate';
import { createUserRoleSchema, deleteUserRoleSchema, updateUserRoleSchema } from '../schema/userRole.schema';

const router = express.Router();
router.use(deserializeUser, requireUser);

// Get all user roles
router.get('/', checkPermissions('PERM1'), getAllUserRolesHandler)

// Create user role
router.post('/', validate(createUserRoleSchema), createUserRoleHandler)

// Delete user role
router.delete('/:id', validate(deleteUserRoleSchema), deleteUserRoleHandler)

// Patch permissions
router.patch('/:id', validate(updateUserRoleSchema), updateUserRoleHandler)



export default router;

