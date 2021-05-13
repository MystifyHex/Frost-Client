const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    aliases: ["repeat"],
    description: "Set the queue or song to repeat mode.",
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
            message.guild.me.voice.channel &&
            message.member.voice.channel.id !==
                message.guild.me.voice.channel.id
        )
            return message.channel.send(
                "You are currently not in the same voice channel!"
            );

        if (!client.player.getQueue(message))
            return message.channel.send(
                "There is no music being played on this server!"
            );

        if (args.join(" ").toLowerCase("queue")) {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                return message.channel.send(
                    "Repeat mode has been disabled for the queue!"
                );
            } else {
                client.player.setLoopMode(message, true);
                return message.channel.send(
                    "Repeat mode has been enabled for the queue!"
                );
            }
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(
                    `\`${client.player.nowPlaying(
                        message
                    )}\` will no longer be repeated!`
                );
            } else {
                client.player.setRepeatMode(message, true);
                return message.channel.send(
                    `\`${client.player.nowPlaying(
                        message
                    )}\` will now be repeated!`
                );
            }
        }
    }
};
