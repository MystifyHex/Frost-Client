const { Client, Message } = require("discord.js");

module.exports = {
    category: "Music",
    description: "Play a song!",
    usage: "play <song name or url>",
    /**
     * @param {Object} options
     * @param {Client} options.client
     * @param {Message} options.message
     * @param {String[]} options.args
     */
    callback: async ({ client, message, args }) => {
        if (!args[0])
            return message.channel.send(
                "Please provide a song to play! | `play <song name or url>`"
            );

        client.player.play(message, args.join(" "));
    }
};