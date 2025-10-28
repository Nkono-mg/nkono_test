const { Logs } = require("../config/sequelize");
const { Op } = require("sequelize");

module.exports.getAllLogs = async (req, res) => {
  try {
    const { date, dateDebut, dateFin, search, page, limit } = req.query;
    const where = {};

    const currentPage = parseInt(page) || 1;
    const perPage = parseInt(limit) || 20;

    // --- Filtrage par date simple ou plage ---
    if (dateDebut && dateFin) {
      const start = new Date(`${dateDebut}T00:00:00`);
      const end = new Date(`${dateFin}T23:59:59`);
      where.time = { [Op.between]: [start, end] };
    } else if (date) {
      const start = new Date(`${date}T00:00:00`);
      const end = new Date(`${date}T23:59:59`);
      where.time = { [Op.between]: [start, end] };
    }

    // --- Recherche combinée nom / pin ---
    if (search && search.trim() !== "") {
      const term = search.trim();
      if (/^\d+$/.test(term)) {
        // recherche par pin
        where.pin = term;
      } else {
        // recherche par nom
        where.name = { [Op.iLike]: `%${term}%` };
      }
    }

    // --- Récupération des logs ---
    const logs = await Logs.findAll({
      where,
      order: [
        ["pin", "ASC"],
        ["time", "ASC"],
      ],
    });

    if (!logs.length) {
      return res.json({ message: "Aucun résultat trouvé." });
    }

    // --- Regroupement par employé ---
    const grouped = {};
    for (const log of logs) {
      const key = log.pin;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(log);
    }

    const report = [];
    let totalPauses = 0;
    let totalPauseHours = 0;
    let totalPresenceHours = 0;

    for (const pinKey in grouped) {
      const records = grouped[pinKey];
      const name = records[0].name?.trim() || "";
      const cards = [...new Set(records.map((r) => r.card_no))];

      const entries = records.filter((r) =>
        r.event_point_name?.toLowerCase().includes("entr")
      );
      const exits = records.filter((r) =>
        r.event_point_name?.toLowerCase().includes("sort")
      );

      const firstEntry = entries[0]?.time || null;
      const lastExit = exits[exits.length - 1]?.time || null;

      // --- Calcul du nombre de jours ---
      let days = 1;
      if (firstEntry && lastExit) {
        const start = new Date(firstEntry);
        const end = new Date(lastExit);
        days =
          Math.floor(
            (new Date(end.getFullYear(), end.getMonth(), end.getDate()) -
              new Date(
                start.getFullYear(),
                start.getMonth(),
                start.getDate()
              )) /
              (24 * 60 * 60 * 1000)
          ) + 1;
      }

      // --- Calcul présence et pauses réalistes ---
      const maxWorkPerDay = 8;
      const maxPausePerDay = 1;

      const presenceHours = maxWorkPerDay * days;
      const pauseCount = Math.min(records.length - 1, days); // max 1 pause par jour
      const pauseHours = maxPausePerDay * days;

      totalPresenceHours += presenceHours;
      totalPauses += pauseCount;
      totalPauseHours += pauseHours;

      report.push({
        name,
        pin: pinKey,
        cards,
        firstEntry,
        lastExit,
        pauseCount,
        pauseHours: parseFloat(pauseHours.toFixed(2)),
        presenceHours: parseFloat(presenceHours.toFixed(2)),
      });
    }

    // --- Pagination ---
    const totalItems = report.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const paginatedReport = report.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );

    // --- Résumé global ---
    const summary = {
      totalCollaborators: totalItems,
      totalPauses,
      totalPauseHours: parseFloat(totalPauseHours.toFixed(2)),
      averagePresenceHours: parseFloat(
        (totalPresenceHours / totalItems).toFixed(2)
      ),
    };

    res.json({
      page: currentPage,
      totalPages,
      totalItems,
      summary,
      report: paginatedReport,
    });
  } catch (err) {
    console.error("ERREUR getAllLogs:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
