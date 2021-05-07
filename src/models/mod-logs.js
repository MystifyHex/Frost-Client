const { Schema, model } = require("mongoose");

module.exports = model(
  "modlogs-channels",
  new Schema({
    Guild: String,
    Channel: String,
  })
);
