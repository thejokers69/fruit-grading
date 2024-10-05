// FRUIT-GRADING/src/models/User.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
  },
});

export default User;
