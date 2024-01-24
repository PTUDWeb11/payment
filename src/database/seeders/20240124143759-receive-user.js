'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	return queryInterface.bulkInsert('users', [
		{
			user_id: 0,
			email: 'payment@poshop.com',
			name: 'POSHOP LTD.',
			balance: 0,
		},
	]);
}
export async function down(queryInterface, Sequelize) {
	return queryInterface.bulkDelete('users', null, {});
}
