import { Router } from 'express';

import * as transactionController from '@/controllers/transaction';
import * as transactionValidations from '@/routes/validations/transaction';
import { validate } from '@/middlewares';

const router = Router();

router.post('/', validate(transactionValidations.createTransactionRules), transactionController.createTransaction);

router
	.route('/process')
	.get(validate(transactionValidations.showProcessTransactionRules), transactionController.showProcessTransaction)
	.post(validate(transactionValidations.processTransactionRules), transactionController.processTransaction);

export default router;
