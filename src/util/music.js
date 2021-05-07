exports.canModifyQueue = (member) => {
  const { channelID } = member.voice;
  const botChannel = member.guild.voice.channelID;

  if (channelID !== botChannel) {
    return;
  }
};

exports.TOKEN = process.env.TOKEN;
exports.YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
exports.SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
exports.MAX_PLAYLIST_SIZE = process.env.MAX_PLAYLIST_SIZE;
exports.PRUNING = process.env.PRUNING;
exports.STAY_TIME = process.env.STAY_TIME;
exports.DEFAULT_VOLUME = process.env.DEFAULT_VOLUME;
exports.LOCALE = process.env.LOCALE;
