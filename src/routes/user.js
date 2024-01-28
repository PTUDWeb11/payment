import { Router } from 'express';

import * as userController from '@/controllers/user';
import * as userValidations from '@/routes/validations/user';
import { validate } from '@/middlewares';

const router = Router();

router.post('/', validate(userValidations.createUserRules), userController.createUser);

export default router;
