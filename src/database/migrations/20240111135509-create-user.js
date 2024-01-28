'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('users', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
			field: 'id',
		},
		userId: {
			unique: true,
			allowNull: false,
			type: Sequelize.INTEGER,
			field: 'user_id',
		},
		client: {
			allowNull: false,
			type: Sequelize.STRING,
			field: 'client',
		},
		email: {
			unique: true,
			allowNull: false,
			type: Sequelize.STRING,
			field: 'email',
		},
		name: {
			type: Sequelize.STRING,
			field: 'name',
		},
		balance: {
			allowNull: false,
			defaultValue: 0,
			type: Sequelize.FLOAT,
			field: 'balance',
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
	await queryInterface.dropTable('users');
}
