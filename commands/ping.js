const discord = require('discord.js');

module.exports = {
  name: 'ping',
  description:
    'Responds with an embed and latency time, to check if the bot is working.',
  execute(message, args) {
    message.channel.send('🏓 Pinging....').then(msg => {
      const _ = new discord.MessageEmbed()
        .setTitle('Pong!')
        .setThumbnail(
          'https://cdn.dribbble.com/users/540729/screenshots/3845838/empty.gif'
        )
        .setDescription(
          `🏓 Pong!\nLatency is ${Math.floor(
            msg.createdTimestamp - message.createdTimestamp
          )}ms`
        )
        .setColor('RANDOM');
      msg.edit(_);
      msg.edit('\u200B');
    });
  }
};
