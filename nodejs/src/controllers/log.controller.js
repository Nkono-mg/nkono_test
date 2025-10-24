const { Logs} = require("../config/sequelize")
const { Op } = require("sequelize");


module.exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Logs.findAll({
        attributes: ["name", "pin", "time"],
        group: ["name", "pin", "time"],
        order: [["time", "ASC"]],
          
    });
    if (logs.length > 0) {
      return res.status(200).json({
        success: true,
        data: logs,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "La liste des utilisateurs est vide.",
        data: [],
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  } 
};

module.exports.getLogsByDate = async (req, res) => {
    try {
      const { date } = req.query; // format attendu: YYYY-MM-DD
      if (!date) return res.status(400).json({ error: "Date requise" });
  
      // Récupérer les logs filtrés par date
      const logs = await Log.findAll({
        where: {
          time: {
            [Op.between]: [
              new Date(`${date}T00:00:00`),
              new Date(`${date}T23:59:59`)
            ],
          },
        },
        order: [["time", "ASC"]],
      });
  
      // Transformer les logs par collaborateur (matricule unique)
      const result = {};
      logs.forEach(log => {
        const key = log.pin; // chaque collaborateur identifié par son pin
        if (!result[key]) {
          result[key] = {
            name: log.name,
            pin: log.pin,
            cards: new Set(),
            firstEntry: log.time,
            lastExit: log.time,
            passages: 0,
          };
        }
  
        // Ajouter la carte
        result[key].cards.add(log.card_no);
  
        // Mettre à jour la première entrée et la dernière sortie
        if (log.time < result[key].firstEntry) result[key].firstEntry = log.time;
        if (log.time > result[key].lastExit) result[key].lastExit = log.time;
  
        // Compter le nombre de passages (peut être utilisé comme nombre de pauses)
        result[key].passages += 1;
      });
  
      // Convertir Set en Array
      const formattedResult = Object.values(result).map(r => ({
        ...r,
        cards: Array.from(r.cards),
      }));
  
      res.json(formattedResult);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  };