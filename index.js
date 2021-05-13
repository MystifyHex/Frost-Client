require("dotenv").config();
const { Client, MessageEmbed, Util } = require("discord.js");
const OrangedAPI = require("oranged-api");
const Parser = require("rss-parser");
const parser = new Parser();
const cron = require("node-cron");
const dayjs = require("dayjs");
const ms = require("ms");
const client = new Client();

const { Player } = require("discord-player");
const player = new Player(client);

const youtube = require("./src/models/youtube");
const member = require("./src/models/member-count");
const birthdayModel = require("./src/models/birthday");

client.player = player;

client.on("ready", async () => {
  console.log("Frost Utilities is online!");
  console.log(`Running in ${client.guilds.cache.size} servers!`);
  client.user.setActivity("Frost Client", { type: "WATCHING" });

  new OrangedAPI(client, {
    commandsDir: "src/commands",
    featureDir: "src/features",
    showWarns: false,
  })
    .setMongoPath(process.env.MONGO_URL)
    .setDefaultPrefix("f!")
    .setCategorySettings([
      {
        name: "Fun",
        emoji: "🎮",
      },
      {
        name: "Music",
        emoji: "🎵",
      },
    ]);

  const youtubeData = await youtube.find();
  youtubeData.forEach((mongooseData) => {
    const guild = client.guilds.cache.get(mongooseData.guildId);
    setTimeout(() => {
      Object.entries(mongooseData.channels).forEach(async (element) => {
        parser
          .parseURL(
            `https://www.youtube.com/feeds/videos.xml?channel_id=${element[0]}`
          )
          .then(async (ytData) => {
            if (!ytData.items[0]) return;
            const data = await youtube.findOne({
              guildId: guild.id,
            });
            if (data.postedVideos.includes(ytData.items[0].id)) return;

            const ytTime = dayjs(ytData.items[0].isoDate);
            const currTime = dayjs();
            if (currTime.diff(ytTime, "days") > 1) return;

            element[1].forEach((channelId) => {
              const channel = guild.channels.cache.get(channelId);
              channel.send(
                `Hey @everyone, ${ytData.title} just posted a new video, go check it out! ${ytData.items[0].link}`
              );
            });

            data.postedVideos.push(ytData.items[0].id);
            data.markModified("postedVideos");
            await data.save();
          })
          .catch((error) => {
            console.log(`Error auto-posting youtube video: ${error}`);
          });
      });
    }, 5000);
  });

  const birthdayData = await birthdayModel.find();
  birthdayData.forEach((mongooseData) => {
    const guild = client.guilds.cache.get(mongooseData.guildId);
    Object.entries(mongooseData.birthdays).forEach(async (element) => {
      const userId = element[0];
      const user = await guild.members.fetch(userId);

      const birthday = element[1];

      const birthdayParts = birthday.split("-");
      const day = birthdayParts[0];
      const month = birthdayParts[1];

      cron.schedule(`0 0 ${day} ${month} *`, async () => {
        const mongoData = await birthdayModel.findOne({
          guildId: guild.id,
        });
        if (!mongoData) {
          const newData = new birthdayModel({ guildId: guild.id });
          await newData.save();
          return user.send(
            `Happy birthday ${user.username} :tada: ! Please let one of the admins know that ${guild.name} doesn't have a birthday channel setup, and all birthday notifications are currently being dmed to the users. Use the command \`set-birthday-channel\` to set the channel.`
          );
        } else if (!mongoData.channelId) {
          return user.send(
            `Happy birthday ${user.username} :tada: ! Please let one of the admins know that ${guild.name} doesn't have a birthday channel setup, and all birthday notifications are currently being dmed to the users. Use the command \`set-birthday-channel\` to set the channel.`
          );
        } else {
          guild.channels.cache
            .get(mongoData.channelId)
            .send(`Happy birthday <@${user.id}> :tada:`);
        }
      });
    });
  });

  setInterval(() => {
    member.find().then((data) => {
      if (!data && !data.length) return;

      data.forEach((value) => {
        const guild = client.guilds.cache.get(value.Guild);
        const memberCount = guild.memberCount;

        if (value.Member != memberCount) {
          console.log("The member count differs!");
          const channel = guild.channels.cache.get(value.Channel);
          channel.setName(`Members: ${memberCount}`);

          value.Member = memberCount;
          value.save();
        }
      });
    });
  }, ms("10 minutes"));
});

client.player
  .on("trackStart", (message, track) =>
    message.channel.send(
      `Now playing \`${track.title}\` requested by \`${track.requestedBy.tag}\`!`
    )
  )
  .on("trackAdd", (message, _, track) =>
    message.channel.send(`\`${track.title}\` has been added to the queue!`)
  )
  .on("playlistAdd", (message, _, playlist) =>
    message.channel.send(
      `\`${playlist.title}\` has been added to the queue (\`${playlist.tracks.length}\` songs), requested by \`${playlist.requestedBy.tag}\``
    )
  )
  .on("searchResults", (message, query, tracks) => {
    const embed = new MessageEmbed()
      .setAuthor(`Here are your search results for ${query}!`)
      .setDescription(
        tracks
          .slice(0, 5)
          .map((t, i) => `${i + 1}. ${Util.escapeMarkdown(t.title)}`)
      )
      .setColor("#2F3136")
      .setFooter("Send the number of the song you want to play!");
    message.channel.send(embed);
  })
  .on("searchInvalidResponse", (message, _, tracks, content, collector) => {
    if (content === "cancel") {
      collector.stop();
      return message.channel.send("Search cancelled!");
    }

    message.channel.send(
      `You must send a valid number between 1 and ${tracks.length}!`
    );
  })
  .on("noResults", (message, query) =>
    message.channel.send(`No results found on YouTube for \`${query}\`!`)
  )

  .on("queueEnd", (message) =>
    message.channel.send(
      "Music stopped as there is no more music in the queue!"
    )
  )
  .on("channelEmpty", (message) =>
    message.channel.send(
      "Music stopped as everyone has left the voice channel!"
    )
  )
  .on("botDisconnect", (message) =>
    message.channel.send(
      "Music stopped as I have been disconnected from the channel!"
    )
  )
  .on("error", (error, message) => {
    switch (error) {
      case "NotPlaying":
        message.channel.send("There is no music being played on this server!");
        break;
      case "NotConnected":
        message.channel.send("You are not connected to any voice channel!");
        break;
      case "UnableToJoin":
        message.channel.send(
          "I am not able to join your voice channel, please check my permissions!"
        );
        break;
      default:
        message.channel.send(`Something went wrong, error: \`${error}\``);
    }
  })

client.login(process.env.TOKEN);
