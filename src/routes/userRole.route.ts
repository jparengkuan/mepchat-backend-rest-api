import express from 'express';

import { createUserRoleHandler, deleteUserRoleHandler } from '../controllers/userRole.controller';
import { validate } from '../middleware/validate';
import { createUserRoleSchema, deleteUserRoleSchema } from '../schema/userRole.schema';

const router = express.Router();
//router.use(deserializeUser, requireUser);

// Create user role
router.post('/', validate(createUserRoleSchema), createUserRoleHandler)

// Delete user role
router.delete('/:id', validate(deleteUserRoleSchema), deleteUserRoleHandler)

export default router;

