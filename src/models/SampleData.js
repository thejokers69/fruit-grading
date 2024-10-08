// FRUIT-GRADING/src/models/SampleData.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js"; 

const SampleData = sequelize.define("SampleData", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sample: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default SampleData;
