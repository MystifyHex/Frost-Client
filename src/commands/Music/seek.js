const { Client, Message } = require("discord.js");

module.exports = {
    category: "Music",
    description: "Jump to a specific spot in the song",
    usage: "seek <timestamp **in seconds** to skip too>",
    /**
     * @param {Object} options
     * @param {Client} options.client
     * @param {Message} options.message
     * @param {String[]} options.args
     */
    callback: async ({ client, message, args }) => {
        if (!args[0])
            return message.channel.send("Please provide a timecode to seek to");

        client.player.seek(message, parseInt(args.join(" ")) * 1000);
        return message.channel.send("Successfully moved player positon");
    }
};
