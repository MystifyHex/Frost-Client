const { Client, Message, MessageEmbed } = require("discord.js");
const Schema = require("../../models/member-count");

module.exports = {
  category: "Fun",
  aliases: ["create-counter-channel", "create-membercount-channel"],
  requiredPermissions: ["ADMINISTRATOR"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  callback: async ({ client, message, args }) => {
    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (data) data.delete();

      const channel = await message.guild.channels.create(
        `Members: ${message.guild.memberCount}`,
        {
          type: "voice",
          permissionsOverwrites: [
            {
              id: message.guild.id,
              deny: ["CONNECT"],
            },
          ],
        }
      );

      new Schema({
        Guild: message.guild.id,
        Channel: channel.id,
        Member: message.guild.memberCount,
      }).save();
    });
  },
};
