const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  id: { type: String, required: true },
  owner: { type: String, required: true },
  partners: { type: mongoose.Schema.Types.Array },
});

const roomModel = mongoose.model("Room", roomSchema);

module.exports = roomModel;
