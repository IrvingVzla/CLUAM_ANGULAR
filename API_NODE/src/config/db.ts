import { Sequelize } from "sequelize";

const sequelize = new Sequelize("cluam", "root", "Bogota2023.", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default sequelize;
