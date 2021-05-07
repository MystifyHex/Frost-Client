const { Schema, model } = require("mongoose");

const birthdaySchema = new Schema({
  guildId: String,
  channelId: String,
  birthdays: Object,
});

module.exports = model("Birthday", birthdaySchema);
