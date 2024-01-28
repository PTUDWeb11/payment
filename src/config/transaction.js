import 'dotenv/config';

const { TRANSACTION_RECEIVER, TRANSACTION_DURATION } = process.env;

export default {
	receiver: Number(TRANSACTION_RECEIVER),
	duration: Number(TRANSACTION_DURATION),
};
