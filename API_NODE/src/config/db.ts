import { Sequelize } from "sequelize";

const sequelize = new Sequelize("cluam", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default sequelize;
