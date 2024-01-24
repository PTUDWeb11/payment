'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.hasMany(models.Transaction, {
				foreignKey: 'sendUserId',
				as: 'sendTransactions',
			});
			User.hasMany(models.Transaction, {
				foreignKey: 'receiveUserId',
				as: 'receiveTransactions',
			});
		}
	}
	User.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
				field: 'id',
			},
			user_id: {
				unique: true,
				allowNull: false,
				type: DataTypes.INTEGER,
				field: 'user_id',
			},
			email: {
				unique: true,
				allowNull: false,
				type: DataTypes.STRING,
				field: 'email',
			},
			name: {
				type: DataTypes.STRING,
				field: 'name',
			},
			balance: {
				allowNull: false,
				defaultValue: 0,
				type: DataTypes.FLOAT,
				field: 'balance',
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
			modelName: 'User',
			paranoid: true,
			tableName: 'users',
		}
	);

	return User;
};
