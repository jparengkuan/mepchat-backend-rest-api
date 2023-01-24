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
router.get('/', checkPermissions('USER_ROLE_VIEW'), getAllUserRolesHandler)

// Create user role
router.post('/', checkPermissions('USER_ROLE_CREATE'), validate(createUserRoleSchema), createUserRoleHandler)

// Delete user role
router.delete('/:id', checkPermissions('USER_ROLE_DELETE'), validate(deleteUserRoleSchema), deleteUserRoleHandler)

// Patch permissions
router.patch('/:id', checkPermissions("USER_ROLE_EDIT"), validate(updateUserRoleSchema), updateUserRoleHandler)



export default router;

