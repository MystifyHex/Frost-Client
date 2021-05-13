const { Client, Message } = require("discord.js");

module.exports = {
<<<<<<< HEAD
  category: "Music",
  description: "Suffle the current queue",
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

    if (!client.player.getQueue(message))
      return message.channel.send(
        "There is no music being played on this server!"
      );

    try {
      client.player.shuffle(message);
      return message.channel.send("Successfully shuffled the queue!");
    } catch (err) {
      console.log(`Music Error: ${err}`);
    }
  },
=======
    category: "Music",
    description: "Shuffle the current queue",
    /**
     * @param {Object} options
     * @param {Client} options.client
     * @param {Message} options.message
     * @param {String[]} options.args
     */
    callback: async ({ client, message, args }) => {
        if (!client.player.getQueue(message))
            return message.channel.send(
                "There is no music being played on this server!"
            );
        client.player.shuffle(message);
        return message.channel.send("Successfully shuffled the queue!");
    }
>>>>>>> ed68a44118fafcccb09e76e2c27d6ce4fcd5e19c
};
