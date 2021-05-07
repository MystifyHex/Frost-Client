const {
    Client,
    Message,
    MessageEmbed,
    MessageAttachment,
  } = require("discord.js");
  const { Canvas } = require("canvacord");
  
  module.exports = {
      category: "Fun",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    callback: async ({ client, message, args }) => {
      let user = message.author;
  
      let text = args.join(" ");
      if (!text) return message.reply("Please specify a quote text");
  
      let color = "#0000FF";
  
      const userAvatar = user.displayAvatarURL({ dynamic: false, format: "png" });
  
      const img = await Canvas.quote({
        image: userAvatar,
        message: text,
        username: user.username,
        color: color,
      });
  
      let attachemnt = new MessageAttachment(img, "quote.png");
      message.channel.send(attachemnt);
    },
  };
  