'use strict';
import { transactionConfig } from '@/config';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class Transaction extends Model {
		static associate(models) {
			Transaction.belongsTo(models.User, {
				foreignKey: 'sendUserId',
				as: 'sendUser',
			});
			Transaction.belongsTo(models.User, {
				foreignKey: 'receiveUserId',
				as: 'receiveUser',
			});
		}
	}
	Transaction.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
				field: 'id',
			},
			sendUserId: {
				references: { model: 'users', key: 'id' },
				type: DataTypes.INTEGER,
				field: 'send_user_id',
			},
			receiveUserId: {
				references: { model: 'users', key: 'id' },
				type: DataTypes.INTEGER,
				field: 'receive_user_id',
			},
			amount: {
				allowNull: false,
				type: DataTypes.FLOAT,
				field: 'amount',
			},
			status: {
				type: DataTypes.ENUM('pending', 'success', 'failed', 'expired'),
			},
			callbackUrl: {
				type: DataTypes.STRING,
				field: 'callback_url',
			},
			createdAt: {
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
				type: DataTypes.DATE,
				field: 'created_at',
			},
			updatedAt: {
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
				type: DataTypes.DATE,
				field: 'updated_at',
			},
			deletedAt: {
				allowNull: true,
				type: DataTypes.DATE,
				field: 'deleted_at',
			},
		},
		{
			sequelize,
			modelName: 'Transaction',
			paranoid: true,
			tableName: 'transactions',
		}
	);

	Transaction.beforeCreate((transaction, _) => {
		if (!transaction.status) {
			transaction.status = 'pending';
		}
		if (transaction.receiveUserId == null) {
			transaction.receiveUserId = transactionConfig.receiver;
		}
	});

	return Transaction;
};
