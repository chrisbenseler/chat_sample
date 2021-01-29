const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Chat = require("./interfaces/chat");
const RoomModel = require("./db/mongo/Room");
const RoomsRepository = require("./domain/room/repository");

const RoomsService = require("./services/room");
const BroadcastService = require("./services/broadcast");

const startServer = () => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));

  const roomsRepository = RoomsRepository({ roomDAO: RoomModel });

  const roomsService = RoomsService({ roomsRepository });

  const broadcastService = BroadcastService({});

  const chat = Chat({ roomsService, broadcastService });

  app.get("/health_check", (req, res) => {
    res.json({ status: "OK", date: new Date() });
  });

  app.post("/rooms", async (req, res) => {
    const userId = req.body["userId"];
    try {
      const result = await chat.newRoom({ userId });
      res.json(result);
    } catch (e) {
      res.status(500).json(e);
    }
  });

  app.post("/rooms/:roomId/join", async (req, res) => {
    const userId = req.body["userId"];
    const roomId = req.params["roomId"];

    try {
      const result = await chat.joinRoom({ roomId, userId });
      res.json(result);
    } catch (e) {
      res.status(500).json(e);
    }
  });

  const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port", server.address().port);
  });
};

const dbConnect = async () => {
  mongoose.connect(process.env.DBURI || "mongodb://localhost/testchat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  startServer();
};
dbConnect();
