const { Client, Message, MessageEmbed } = require("discord.js");
const apikey = process.env.HYPIXEL_API_KEY;
const HypixelAPIReborn = require("hypixel-api-reborn");
const hypixelAPIReborn = new HypixelAPIReborn.Client(apikey);
const commaNumber = require("comma-number");

module.exports = {
  category: "Fun",
  aliases: ["bw"],
  /**
   * @param {Object} options
   * @param {Client} options.client
   * @param {Message} options.message
   * @param {String[]} options.args
   */
  callback: async ({ client, message, args }) => {
    if (!args[0]) return message.channel.send("Please specify a vaild player.");

    hypixelAPIReborn
      .getPlayer(args[0])
      .then((player) => {
        const embed = new MessageEmbed()
          .setTitle("BedWars Stats")
          .setColor("RANDOM")
          .setDescription(`[${player.rank}] ${player.nickname}`)
          .setImage(
            "https://hypixel.net/styles/hypixel-v2/images/game-icons/BedWars-64.png"
          )
          .addField("Level", `${player.stats.bedwars.level}✫`, true)
          .addField("KD Ratio:", player.stats.bedwars.KDRatio, true)
          .addField("Final KD Ratio:", player.stats.bedwars.finalKDRatio, true)
          .addField("WL Ratio:", player.stats.bedwars.WLRatio, true)
          .addField(
            "Bed Breaks:",
            commaNumber(player.stats.bedwars.beds.broken),
            true
          )
          .addField(
            "Beds Lost:",
            commaNumber(player.stats.bedwars.beds.lost),
            true
          )
          .addField("Bed BL Ratio:", player.stats.bedwars.beds.BLRatio, true)
          .addField("Coins:", commaNumber(player.stats.bedwars.coins), true)
          .addField(
            "Total Deaths:",
            commaNumber(player.stats.bedwars.deaths),
            true
          )
          .addField(
            "Final Deaths:",
            commaNumber(player.stats.bedwars.finalDeaths),
            true
          )
          .addField(
            "Total Kills:",
            commaNumber(player.stats.bedwars.kills),
            true
          )
          .addField(
            "Total Final Kills:",
            commaNumber(player.stats.bedwars.finalKills),
            true
          )
          .addField(
            "Winstreak:",
            commaNumber(player.stats.bedwars.winstreak),
            true
          )
          .addField("Total Wins:", commaNumber(player.stats.bedwars.wins), true)
          .addField(
            "Iron Collected:",
            commaNumber(player.stats.bedwars.collectedItemsTotal.iron),
            true
          )
          .addField(
            "Gold Collected:",
            commaNumber(player.stats.bedwars.collectedItemsTotal.gold),
            true
          )
          .addField(
            "Diamonds Collected:",
            commaNumber(player.stats.bedwars.collectedItemsTotal.diamond),
            true
          )
          .addField(
            "Emeralds Collected:",
            commaNumber(player.stats.bedwars.collectedItemsTotal.emerald),
            true
          );

        message.channel.send(embed);
      })
      .catch((e) => {
        if (e.message === HypixelAPIReborn.Errors.PLAYER_DOES_NOT_EXIST) {
          message.channel.send(
            "I could not find that player in the API. Check spelling and name history."
          );
        } else {
          console.log(e);
        }
      });
  },
};
