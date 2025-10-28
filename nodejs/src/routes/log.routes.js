const router = require("express").Router();
const logController = require("../controllers/log.controller");

//
router.get("/all", logController.getAllLogs);
//
module.exports = router;
