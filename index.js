require("dotenv").config();
const Discord = require("discord.js");
const OrangedAPI = require("oranged-api");
const Parser = require("rss-parser");
const parser = new Parser();
const dayjs = require("dayjs");
const cron = require("node-cron");
const ms = require("ms");
const client = new Discord.Client();

const youtube = require("./src/models/youtube");
const birthdayModel = require("./src/models/birthday");
const member = require("./src/models/member-count");

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
        name: "Admin",
        emoji: "📮",
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

client.login(process.env.TOKEN);
