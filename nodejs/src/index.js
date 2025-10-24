const express = require("express");
const { initDb } = require("./config/sequelize")
const logRoutes = require("./routes/log.routes"); 
const cors = require("cors");
//
const app = express();
const PORT = 5000
// --- Configuration CORS ---
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  preflightContinue: false,
};
app.use(cors(corsOptions));
//connect to database
initDb();
//routes
app.use("/api/logs", logRoutes);
//server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
