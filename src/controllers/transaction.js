import createError from 'http-errors';
import db from '@/database';
import { tokenHelper } from '@/helpers';
import { clientConfig } from '@/config';
import Response from '@/views';

/**
 * POST /transactions
 * Create transaction request
 */
export const createTransaction = async (req, res, next) => {
	try {
		const { token } = req.body;

		// decode token
		const decodedToken = tokenHelper.verifyToken(token);

		// find user
		const user = await db.models.User.findOne({ where: { userId: decodedToken.user_id } });
		if (!user) {
			return next(createError(400, 'User not found'));
		}

		// create transaction
		const newTransaction = await db.models.Transaction.create({
			sendUserId: user.id,
			amount: decodedToken.amount,
			callbackUrl: decodedToken.callback_url,
		});
		if (!newTransaction) {
			return next(createError(500, 'Failed to create transaction'));
		}

		const newToken = tokenHelper.generateToken({
			transaction_id: newTransaction.id,
		});

		return new Response(res).json({ token: newToken });
	} catch (err) {
		return next(err);
	}
};

/**
 * GET /transactions/process
 * Show process transaction page
 */
export const showProcessTransaction = async (req, res, next) => {
	try {
		const { token } = req.query;

		// decode token
		const decodedToken = tokenHelper.verifyToken(token);

		// get transaction
		const transaction = await db.models.Transaction.findOne({
			where: { id: decodedToken.transaction_id },
			include: [
				{
					model: db.models.User,
					as: 'sendUser',
				},
				{
					model: db.models.User,
					as: 'receiveUser',
				},
			],
		});
		if (!transaction) {
			return next(createError(400, 'Transaction not found'));
		}

		return new Response(res).html('transaction', {
			layout: false,
			data: {
				transaction: transaction.dataValues,
				user: transaction.sendUser.dataValues,
				recipient: transaction.receiveUser.dataValues,
			},
		});
	} catch (err) {
		return next(err);
	}
};

/**
 * POST /transactions/process
 * Process transaction
 */
export const processTransaction = async (req, res, next) => {
	try {
		const { token, redirect_url } = req.query;

		// decode token
		const decodedToken = tokenHelper.verifyToken(token);

		// get transaction
		const transaction = await db.models.Transaction.findOne({
			where: { id: decodedToken.transaction_id },
			include: [
				{
					model: db.models.User,
					as: 'sendUser',
				},
				{
					model: db.models.User,
					as: 'receiveUser',
				},
			],
		});
		if (!transaction) {
			return new Response(res).html('result', {
				layout: false,
				data: {
					success: false,
					message: 'Transaction not found',
					redirect: redirect_url,
				},
			});
		}

		if (transaction.status !== 'pending') {
			return new Response(res).html('result', {
				layout: false,
				data: {
					success: false,
					message: 'Invalid transaction',
					user: transaction.sendUser.dataValues,
					redirect: redirect_url,
				},
			});
		}

		if (transaction.sendUser.balance < transaction.amount) {
			return new Response(res).html('result', {
				layout: false,
				data: {
					success: false,
					message: 'Insufficient balance',
					user: transaction.sendUser.dataValues,
					redirect: redirect_url,
				},
			});
		}

		await db.transaction(async (t) => {
			// update balance
			await transaction.sendUser.update(
				{ balance: transaction.sendUser.balance - transaction.amount },
				{ transaction: t }
			);
			await transaction.receiveUser.update(
				{ balance: transaction.receiveUser.balance + transaction.amount },
				{ transaction: t }
			);

			// update transaction status
			await transaction.update({ status: 'success' }, { transaction: t });

			// callback
			if (transaction.callbackUrl) {
				await fetch(transaction.callbackUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						token: tokenHelper.generateToken({
							transaction_id: transaction.id,
							status: 'success',
						}),
					}),
				});
			}
		});

		return new Response(res).html('result', {
			layout: false,
			data: {
				success: true,
				message: 'Congratulations, your transaction has been successfully processed',
				user: transaction.sendUser.dataValues,
				redirect: redirect_url,
			},
		});
	} catch (err) {
		return next(err);
	}
};
