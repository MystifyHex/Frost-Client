const { Client, Message, MessageEmbed } = require("discord.js");

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
        if (!track) return;

        const embed = new MessageEmbed()
            .setAuthor("Currently playing")
            .setThumbnail(track.thumbnail)
            .addField("Title", track.title, true)
            .addField("Artist", track.author, true)
            .addField(
                "Description",
                // If there is a track description
                track.description
                    ? // If the length is longer than 150 characters, slice it
                      track.description.length > 150
                        ? track.description.substring(0, 150) +
                          "\n" +
                          "And more...".toLowerCase()
                        : // otherwise show the full description
                          track.description
                    : // If there is no description, show "No description"
                      "No description",
                true
            )
            .addField(
                "\u200B",
                client.player.createProgressBar(message, {
                    timecodes: true
                })
            )
            .setTimestamp()
            .setColor("#2F3136");

        return message.channel.send(embed);
    }
};
