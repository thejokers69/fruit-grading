// FRUIT-GRADING/src/db.js
import { Sequelize } from 'sequelize';
import config from './config.js';

const sequelize = new Sequelize(
    config.database.database,
    config.database.username,
    config.database.password,
    {
        host: config.database.host,
        dialect: config.database.dialect,
    }
);

export default sequelize;