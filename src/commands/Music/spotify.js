const { Client, Message, MessageEmbed } = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
    category: "Music",
    description: "Get the currently playing song in the queue",
    /**
     * @param {Object} options
     * @param {Client} options.client
     * @param {Message} options.message
     * @param {String[]} options.args
     */
    callback: async ({ client, message, args }) => {
        const track = client.player.nowPlaying(message);

        const card = new canvacord.Spotify()
            .setAuthor(track.author)
            .setStartTimestamp()
            .setEndTimestamp()
            .setImage(track.thumbnail)
            .setTitle(track.title);
    }
};
