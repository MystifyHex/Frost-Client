const { Client, Message } = require("discord.js");

module.exports = {
<<<<<<< HEAD
  category: "Music",
  description: "Stop the currently playing song",
  /**
   * @param {Object} options
   * @param {Client} options.client
   * @param {Message} options.message
   * @param {String[]} options.args
   */
  callback: async ({ client, message, args }) => {
    const queue = client.player.getQueue(message);

    if (!queue) {
      return message.channel.send(
        "There is no music being played on this server!"
      );
    }

    client.player.stop(message);
    return message.channel.send("Successfully stopped the music!");
  },
=======
    category: "Music",
    description: "Stop the currently playing song",
    /**
     * @param {Object} options
     * @param {Client} options.client
     * @param {Message} options.message
     * @param {String[]} options.args
     */
    callback: async ({ client, message, args }) => {
        const queue = client.player.getQueue(message);

        if (!queue) {
            return message.channel.send(
                "There is no music being played on this server!"
            );
        }

        client.player.stop(message);
        return message.channel.send("Successfully stopped the music!");
    }
>>>>>>> ed68a44118fafcccb09e76e2c27d6ce4fcd5e19c
};
