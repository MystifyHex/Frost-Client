const { Client, Message, MessageEmbed } = require("discord.js");
const { sudo } = require("weky");

module.exports = {
  category: 'Fun',
  requiredPermissions: ["ADMINISTRATOR"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  callback: async ({ client, message, args }) => {
    const member = message.mentions.members.first();
    if (!member) return message.reply(`Couldn't find any user!`);

    const msg = args.slice(1).join(" ");
    if (!msg) return message.reply("What should the user say?");

    const sud = new sudo({
      message: message,
      text: msg,
      member: member,
    });
    sud.start();
  },
};
