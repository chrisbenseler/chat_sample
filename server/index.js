const express = require("express");
const mongoose = require("mongoose");

const dbConnect = async () => {
  const db = await mongoose.createConnection(
    process.env.DBURI || "mongodb://localhost/testchat"
  );

  startServer();
};
dbConnect();

const startServer = () => {
  const app = express();

  app.get("/health_check", (req, res) => {
    res.json({ status: "OK", date: new Date() });
  });

  const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port", server.address().port);
  });
};
