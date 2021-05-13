const { Client, Message, MessageEmbed, Util } = require("discord.js");
const Genius = require("genius-lyrics");
const genius = new Genius.Client();

module.exports = {
    category: "Music",
    description: "Get the lyrics of the currently playing song",
    /**
     * @param {Object} options
     * @param {Client} options.client
     * @param {Message} options.message
     * @param {String[]} options.args
     */
    callback: async ({ client, message, args }) => {
        if (
            !client.player.getQueue(message) ||
            !client.player.nowPlaying(message)
        )
            return message.channel.send(
                "There is no music being played on this server!"
            );
        try {
            const results = await genius.songs.search(
                client.player.nowPlaying(message).title
            );
            const song = results[0];
            const lyrics = await song.lyrics();

            if (!lyrics)
                return message.channel.send(
                    "No lyrics found for currently playing song!"
                );

            const chunks = Util.splitMessage(lyrics, { maxLength: 1024 });

            const embed = new MessageEmbed()
                .setTitle(
                    `Lyrics for ${client.player.nowPlaying(message).title}`
                )
                .setTimestamp()
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL() ?? undefined
                )
                .setColor("#2F3136");

            chunks.forEach((chunk) => {
                embed.addField("\u200b", chunk);
            });
            return message.channel.send(embed);
        } catch (err) {
            return message.channel.send(`${err}`);
        }
    }
};
