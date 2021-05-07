const { Client, Message, MessageEmbed } = require("discord.js");
const suggestionSchema = require('../../models/suggestions')
const { fetchSuggestionChannels } = require('../../features/suggestions')

module.exports = {
  category: "Configuration",
  requiredPermissions: ["ADMINISTRATOR"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  callback: async ({ client, message, args }) => {
    const channel = message.mentions.channels.first() || message.channel;

    const {
      guild: { id: guildId },
    } = message;
    const { id: channelId } = channel;

    await suggestionSchema.findOneAndUpdate(
      {
        _id: guildId,
      },
      {
        _id: guildId,
        channelId,
      },
      {
        upsert: true,
      }
    );

    message.reply(`The suggestions channel has been set to ${channel}`);

    fetchSuggestionChannels(guildId);
  },
};
