import { body } from 'express-validator';

export const createUserRules = [body('token').exists().isJWT()];
