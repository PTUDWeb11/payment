'use strict';
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
			status: {
				type: DataTypes.ENUM('pending', 'success', 'failed', 'expired'),
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
			tableName: 'transaction',
		}
	);
	return Transaction;
};
