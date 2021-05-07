const birthday = require("../../models/birthday");
const { Client, Message } = require("discord.js");

module.exports = {
    category: "Configuration",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    callback: async ({ client, message, args }) => {
        if (!message.mentions.channels.first())
            return message.channel.send("You must **mention** a channel!");

        const mongoData = await birthday.findOne({
            guildId: message.guild.id
        });

        if (!mongoData) {
            const newData = new birthday({
                guildId: message.guild.id,
                channelId: message.mentions.channels.first().id
            });
            await newData.save();
        } else {
            mongoData.channelId = message.mentions.channels.first().id;
            await mongoData.save();
        }

        return message.channel.send("Successfully set the birthday channel!");
    }
};
