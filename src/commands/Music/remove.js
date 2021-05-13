const { Client, Message } = require("discord.js");

module.exports = {
    category: "Music",
    description: "Remove a song from the queue",
    expectedArgs: "play <song name or url>",
    /**
     * @param {Object} options
     * @param {Client} options.client
     * @param {Message} options.message
     * @param {String[]} options.args
     */
    callback: async ({ client, message, args }) => {
        const queue = client.player.getQueue(message);

        if (!queue) {
            return message.error("NO_MUSIC_PLAYING");
        }

        if (!args[0] || isNaN(parseInt(args[0]))) {
            return message.channel.send(
                "Incorrect usage! | `remove <number of song in queue>`"
            );
        }

        const removed = client.player.remove(message, parseInt(args[0]));
        if (!removed) {
            return message.channel.send(
                "Could not find that track in the queue"
            );
        }

        message.channel.send(
            `Successfully removed \`${removed.title}\` from the queue`
        );

        if (!queue.tracks[0]) {
            client.player.stop(message);
            return message.channel.send(
                "Music stopped as there is no more music in the queue"
            );
        }
    }
};
