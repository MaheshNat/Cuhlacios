const cron = require('cron');
const Discord = require('discord.js');

exports.start = client => {
  cron
    .job(
      client.config.clearSchedule,
      () => {
        let server = client.guilds.cache.get(client.config.guildID);
        let channels = server.channels.cache;
        channels.forEach((channel, key, map) => {
          if (channel instanceof Discord.TextChannel) {
            if (
              channel.name === 'join-log' ||
              channel.name === 'announcements' ||
              channel.name === 'computer-science' ||
              channel.name === 'memes'
            )
              return;
            client.commands.get('clear').clear(channel);
            client.logger.log(`Cleared channel '${channel.name}'`);
          }
        });
      },
      undefined,
      true,
      'America/Chicago'
    )
    .start();
};
