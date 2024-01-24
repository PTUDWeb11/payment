import { Sequelize, DataTypes } from 'sequelize';

import * as config from '@/config/sequelize';

// import models

// Configuration
const env = process.env.NODE_ENV;
const sequelizeConfig = config[env];

// Create sequelize instance
const sequelize = new Sequelize(sequelizeConfig);

// Import all model files
const modelDefiners = [];

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
