const cron = require('cron');
const Discord = require('discord.js');

exports.start = client => {
  if (!process.env.CLEARING) return;
  cron
    .job(
      process.env.CLEAR_SCHEDULE,
      () => {
        client.guilds.cache
          .get(str(process.env.SEM_SERVER_GUILD_ID))
          .channels.cache.forEach((channel, key, map) => {
            if (
              channel instanceof Discord.TextChannel &&
              process.env.SEM_SERVER_CLEAR_CHANNELS.includes(channel.name)
            ) {
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
