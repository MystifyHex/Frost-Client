const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    /**
     * @param {Object} options
     * @param {Client} options.client
     * @param {Message} options.message
     * @param {String[]} options.args
     */
    callback: async ({ client, message, args }) => {
        if (!message.member.voice.channel)
            return message.channel.send(
                "You are not connected to any voice channel!"
            );

        if (
            !message.guild.me.voice.channel ||
            message.member.voice.channel.id !==
                message.guild.me.voice.channel.id
        )
            return message.channel.send(
                "You are currently not in the same voice channel!"
            );

        client.player.skip(message);
    }
};
