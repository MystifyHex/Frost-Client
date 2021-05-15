const { Client, Message, MessageEmbed } = require("discord.js");
const apikey = process.env.HYPIXEL_API_KEY;
const HypixelAPIReborn = require("hypixel-api-reborn");
const hypixelAPIReborn = new HypixelAPIReborn.Client(apikey);
const commaNumber = require("comma-number");

module.exports = {
  category: "Fun",
  aliases: ["duel"],
  /**
   * @param {Object} options
   * @param {Client} options.client
   * @param {Message} options.message
   * @param {String[]} options.args
   */
  callback: async ({ client, message, args }) => {
    if (!args[0]) return message.channel.send("Please specify a player.");

    if (!args[1])
      return message.channel.send("Please specify a specific type of duel.");

    if (args[1] == "classic") {
      hypixelAPIReborn
        .getPlayer(args[0])
        .then((player) => {
          const embed = new MessageEmbed()
            .setTitle("Classic Duels Stats")
            .setDescription(`[${player.rank}] ${player.nickname}`)
            .setColor("RANDOM")
            .addField("Kills:", commaNumber(player.stats.duels.classic.kills))
            .addField("Losses:", commaNumber(player.stats.duels.classic.losses))
            .addField("Deaths:", commaNumber(player.stats.duels.classic.deaths))
            .addField("Wins:", commaNumber(player.stats.duels.classic.wins));

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
    }

    if (args[1] == "uhc") {
      hypixelAPIReborn
        .getPlayer(args[0])
        .then((player) => {
          const embed = new MessageEmbed()
            .setTitle("UHC Duels Stats")
            .setDescription(`[${player.rank}] ${player.nickname}`)
            .setColor("RANDOM")
            .addField("Kills:", commaNumber(player.stats.duels.uhc.v1.kills))
            .addField("Losses:", commaNumber(player.stats.duels.uhc.v1.losses))
            .addField("Deaths:", commaNumber(player.stats.duels.uhc.v1.deaths))
            .addField("Wins:", commaNumber(player.stats.duels.uhc.v1.wins));

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
    }

    if (args[1] == "skywars" || args[0] == "sw") {
      hypixelAPIReborn
        .getPlayer(args[0])
        .then((player) => {
          const embed = new MessageEmbed()
            .setTitle("Skywars Duels Stats")
            .setDescription(`[${player.rank}] ${player.nickname}`)
            .setColor("RANDOM")
            .addField(
              "Kills:",
              commaNumber(player.stats.duels.skywars.v1.kills)
            )
            .addField(
              "Losses:",
              commaNumber(player.stats.duels.skywars.v1.losses)
            )
            .addField(
              "Deaths:",
              commaNumber(player.stats.duels.skywars.v1.deaths)
            )
            .addField("Wins:", commaNumber(player.stats.duels.skywars.v1.wins));

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
    }

    if (args[1] == "bridge") {
      hypixelAPIReborn
        .getPlayer(args[0])
        .then((player) => {
          const embed = new MessageEmbed()
            .setTitle("The Bridge Duels Stats")
            .setDescription(`[${player.rank}] ${player.nickname}`)
            .setColor("RANDOM")
            .addField("Kills:", commaNumber(player.stats.duels.bridge.v1.kills))
            .addField(
              "Losses:",
              commaNumber(player.stats.duels.bridge.v1.losses)
            )
            .addField(
              "Deaths:",
              commaNumber(player.stats.duels.bridge.v1.deaths)
            )
            .addField("Wins:", commaNumber(player.stats.duels.bridge.v1.wins));

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
    }

    if (args[1] == "sumo") {
      hypixelAPIReborn
        .getPlayer(args[0])
        .then((player) => {
          const embed = new MessageEmbed()
            .setTitle("Sumo Duels Stats")
            .setDescription(`[${player.rank}] ${player.nickname}`)
            .setColor("RANDOM")
            .addField("Kills:", commaNumber(player.stats.duels.sumo.kills))
            .addField("Losses:", commaNumber(player.stats.duels.sumo.losses))
            .addField("Deaths:", commaNumber(player.stats.duels.sumo.deaths))
            .addField("Wins:", commaNumber(player.stats.duels.sumo.wins));

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
    }

    if (args[1] == "op") {
      hypixelAPIReborn
        .getPlayer(args[0])
        .then((player) => {
          const embed = new MessageEmbed()
            .setTitle("OP Duels Stats")
            .setDescription(`[${player.rank}] ${player.nickname}`)
            .setColor("RANDOM")
            .addField("Kills:", commaNumber(player.stats.duels.op.v1.kills))
            .addField("Losses:", commaNumber(player.stats.duels.op.v1.losses))
            .addField("Deaths:", commaNumber(player.stats.duels.op.v1.deaths))
            .addField("Wins:", commaNumber(player.stats.duels.op.v1.wins));

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
    }

    if (args[1] == "combo") {
      hypixelAPIReborn
        .getPlayer(args[0])
        .then((player) => {
          const embed = new MessageEmbed()
            .setTitle("Combo Duels Stats")
            .setColor("RANDOM")
            .addField("Kills:", commaNumber(player.stats.duels.combo.kills))
            .addField("Losses:", commaNumber(player.stats.duels.combo.losses))
            .addField("Deaths:", commaNumber(player.stats.duels.combo.deaths))
            .addField("Wins:", commaNumber(player.stats.duels.combo.wins));

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
    }
  },
};
