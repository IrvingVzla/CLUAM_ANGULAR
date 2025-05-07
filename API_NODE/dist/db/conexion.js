"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('cluam', 'root', 'Martin21072020', {
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = sequelize;
