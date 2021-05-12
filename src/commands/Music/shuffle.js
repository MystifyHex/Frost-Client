const { Client, Message, MessageCollector } = require("discord.js");

module.exports = {
    category: "Music",
    description: "Suffle the current queue",
    /**
     * @param {Object} options
     * @param {Client} options.client
     * @param {Message} options.message
     * @param {String[]} options.args
     */
    callback: async ({ client, message, args }) => {
        if (!client.player.getQueue(MessageCollector))
            return message.channel.send(
                "There is no music being played on this server!"
            );
        client.player.shuffle(message);
        return message.channel.send("Successfully shuffled the queue!");
    }
};
