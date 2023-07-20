const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  level: {
    type: Number,
    default: 1,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  classement: {
    type: Number,
    default: 0,
  },
  playingTime: {
    type: Number,
    default: 0,
  },
  maxRound: {
    type: Number,
    required: true,
    default: 0,
  },
  speeds: {
    type: Array,
    required: true,
    default: [],
  },
  keyPerSecond: {
    type: Number,
    default: 0,
  },
  totalGood: {
    type: Number,
    default: 0,
  },
  totalMiss: {
    type: Number,
    default: 0,
  },
  accuracy: {
    type: Number,
    default: 0,
  },
  totalAccuracy: {
    type: Array,
    required: true,
    default: [],
  },
});

module.exports = mongoose.model("User", userModel);
