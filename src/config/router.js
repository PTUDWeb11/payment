import indexRouter from '@/routes/index';
import userRouter from '@/routes/user';
import transactionRouter from '@/routes/transaction';

export default function (app) {
	app.use('/', indexRouter);
	app.use('/users', userRouter);
	app.use('/transactions', transactionRouter);
}
