"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("cluam", "root", "Bogota2023.", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});
exports.default = sequelize;
