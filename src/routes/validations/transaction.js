import { body, query } from 'express-validator';

export const createTransactionRules = [body('token').exists().isJWT()];

export const showProcessTransactionRules = [query('token').exists().isJWT(), query('redirect_url').exists().isURL()];

export const processTransactionRules = [query('token').exists().isJWT(), query('redirect_url').exists().isURL()];
