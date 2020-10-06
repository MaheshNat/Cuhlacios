const cron = require('cron');
const Discord = require('discord.js');
const config = require('../config.js');

exports.start = client => {
  if (!process.env.CLEARING) return;
  cron
    .job(
      client.config.clearSchedule,
      () => {
        let server = client.guilds.cache.get(client.config.guildID);
        if (server.id === config.oasisID) return;
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
