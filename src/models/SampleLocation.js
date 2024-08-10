import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Chemin corrigé

const SampleLocation = sequelize.define('SampleLocation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    sample: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default SampleLocation;