'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('transactions', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
			field: 'id',
		},
		sendUserId: {
			references: { model: 'users', key: 'id' },
			type: Sequelize.INTEGER,
			field: 'send_user_id',
		},
		receiveUserId: {
			references: { model: 'users', key: 'id' },
			type: Sequelize.INTEGER,
			field: 'receive_user_id',
		},
		status: {
			type: Sequelize.ENUM('pending', 'success', 'failed', 'expired'),
		},
		createdAt: {
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			type: Sequelize.DATE,
			field: 'created_at',
		},
		updatedAt: {
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			type: Sequelize.DATE,
			field: 'updated_at',
		},
		deletedAt: {
			allowNull: true,
			type: Sequelize.DATE,
			field: 'deleted_at',
		},
	});
}
export async function down(queryInterface, Sequelize) {
	await queryInterface.dropTable('transactions');
}
