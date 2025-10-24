const { Sequelize,DataTypes } = require("sequelize");
const logModel = require("../models/log.model")

const sequelize = new Sequelize("recrutement", "si", "9uSi%G4r", {
  host: "preprod-bdd-server.madcom.local",
  dialect: "postgres",
  port: 5432,
  logging: false,
});
const Logs = logModel(sequelize, DataTypes);
const initDb = async () => {
    try {
      await sequelize.sync();
      console.log("✅ Connexion à la base de données réussie.");
    } catch (error) {
      console.error("❌ Erreur lors de la connexion à la base :", error);
    }
  };
  module.exports = {
    initDb,
    Logs
  };