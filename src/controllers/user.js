import createError from 'http-errors';
import db from '@/database';
import { tokenHelper } from '@/helpers';
import { clientConfig } from '@/config';
import Response from '@/views';

/**
 * POST /users
 * Create user request
 */
export const createUser = async (req, res, next) => {
	try {
		const { token } = req.body;

		// decode token
		const decodedToken = tokenHelper.verifyToken(token);

		// check client
		if (!clientConfig.includes(decodedToken.client)) {
			return next(createError(400, 'Invalid client'));
		}

		// check if user exists
		const user = await db.models.User.findOne({ where: { userId: decodedToken.id } });
		if (user) {
			return next(createError(400, 'User already exists'));
		}

		// create user
		const newUser = await db.models.User.create({
			userId: decodedToken.id,
			client: decodedToken.client,
			email: decodedToken.email,
			name: decodedToken.name,
		});
		if (!newUser) {
			return next(createError(500, 'Failed to create user'));
		}

		return new Response(res).json(newUser);
	} catch (err) {
		return next(err);
	}
};
