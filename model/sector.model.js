const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const sectorSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  minIvstment: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Sector = mongoose.model("Sector", sectorSchema);

module.exports = Sector;
