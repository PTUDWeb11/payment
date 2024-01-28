import { Sequelize, DataTypes } from 'sequelize';

import * as config from '@/config/sequelize';

// import models
import userModel from '@/database/models/user';
import transactionModel from '@/database/models/transaction';

// Configuration
const env = process.env.NODE_ENV;
const sequelizeConfig = config[env];

// Create sequelize instance
const sequelize = new Sequelize(sequelizeConfig);

// Import all model files
const modelDefiners = [userModel, transactionModel];

// eslint-disable-next-line no-restricted-syntax
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize, DataTypes);
}

// Associations
Object.keys(sequelize.models).forEach((modelName) => {
	if (sequelize.models[modelName].associate) {
		sequelize.models[modelName].associate(sequelize.models);
	}
});

export default sequelize;
