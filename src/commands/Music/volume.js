const { Client, Message } = require("discord.js");

module.exports = {
    category: "Music",
    description: "Set the volume of the currently playing song",
    expectedArgs: "volume <volume>",
    /**
     * @param {Object} options
     * @param {Client} options.client
     * @param {Message} options.message
     * @param {String[]} options.args
     */
    callback: async ({ client, message, args }) => {
        if (!args[0] || isNaN(args[0]))
            return message.channel.send("Volume must be a valid number");

        if (parseInt(args[0]) < 1 || parseInt(args[0]) > 200)
            return message.channel.send("Volume must be between 1 and 200");

        const worked = client.player.setVolume(message, parseInt(args[0]));
        if (worked) {
            return message.channel.send(
                `Successfully set the volume to ${args[0]}%`
            );
        }
    }
};
