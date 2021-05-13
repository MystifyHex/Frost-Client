const cron = require("node-cron");
const birthday = require("../../models/birthday");

module.exports = {
    category: 'Fun',
    callback: async ({ client, message, args }) => {
        if (args.length === 0)
            return message.channel.send("Incorrect usage! | `birthday <date>`");

        const parts = message.content.split("-");
        const day = parts[0].split(" ")[1];
        const month = parts[1];
        if (
            ![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(
                parseInt(month)
            ) ||
            !Array.from({ length: 32 }, (_, i) => i).includes(parseInt(day))
        )
            return message.channel.send(
                "Invalid date! Correct format is `day-month`. Ex: `11-4`"
            );

        cron.schedule(`0 0 ${day} ${month} *`, async () => {
            const mongoData = await birthday.findOne({
                guildId: message.guild.id
            });
            if (!mongoData) {
                const newData = new birthday({ guildId: message.guild.id });
                await newData.save();
                return message.author.send(
                    `Happy birthday ${message.author.username} :tada: ! Please let one of the admins know that ${message.guild.name} doesn't have a birthday channel setup, and all birthday notifications are currently being dmed to the users. Use the command \`set-birthday-channel\` to set the channel.`
                );
            } else if (!mongoData.channelId) {
                return user.send(
                    `Happy birthday ${message.author.username} :tada: ! Please let one of the admins know that ${message.guild.name} doesn't have a birthday channel setup, and all birthday notifications are currently being dmed to the users. Use the command \`set-birthday-channel\` to set the channel.`
                );
            } else {
                message.guild.channels.cache
                    .get(mongoData.channelId)
                    .send(`Happy birthday <@${message.author.id}> :tada:`);
            }
        });

        const mongoData = await birthday.findOne({
            guildId: message.guild.id
        });
        if (!mongoData) {
            const newData = new birthday({
                guildId: message.guild.id,
                birthdays: { [message.author.id]: `${day}-${month}` }
            });
            await newData.save();
        } else if (
            !mongoData.birthdays ||
            Object.keys(mongoData.birthdays).includes(message.author.id)
        ) {
            mongoData.birthdays[message.author.id] = `${day}-${month}`;
            mongoData.markModified("birthdays");
            await mongoData.save();
        } else {
            mongoData.birthdays = {
                ...mongoData.birthdays,
                [message.author.id]: `${day}-${month}`
            };
            mongoData.markModified("birthdays");
            await mongoData.save();
        }

        message.channel.send("Successfully set your birthday!");
    }
};
