const Sequelize = require('sequelize');
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
require('dotenv').config();

const connection = {
  database: process.env.DATABASE_NAME,
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  dialectmodel: process.env.DIALECTMODEL,
};

const sequelize = new Sequelize(connection);
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Dynamically import all models
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

// Define associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Associations for Participant, Work, and Home models
db.Participant.hasOne(db.Work, { foreignKey: { allowNull: false } });
db.Work.belongsTo(db.Participant, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

db.Participant.hasOne(db.Home, { foreignKey: { allowNull: false } });
db.Home.belongsTo(db.Participant, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

module.exports = db;
