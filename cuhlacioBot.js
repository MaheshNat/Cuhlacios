const discord = require('discord.js');
const cron = require('cron');

const client = new discord.Client();
client.commands = new discord.Collection();
client.mongoose = require('./utils/mongoose');

const fs = require('fs');

const commandFiles = fs
  .readdirSync('./commands/')
  .filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const usedCommandRecently = {};

const token = process.env.token;
const prefix = process.env.prefix;
const cooldownTime = process.env.cooldownTime;
const guildId = '695306368348848218';
const clearSchedule = process.env.clearSchedule;

client.on('ready', () => {
  console.log('ready');
  client.user.setActivity("nothing. I'm a bot. I can't play anything");
});

client.on('message', message => {
  if (message.author.id === '495824437506080769') {
    message.react('689310843619508297');
  }

  if (!process.env.guilds.includes(message.guild.id)) return;

  if (message.content.charAt(0) != '!') return;
  let args = message.content.substring(prefix.length).split(' ');

  if (client.commands.get(args[0])) {
    if (usedCommandRecently[message.author.id]) {
      message.reply(
        `You cannot use that command just yet! Wait another ${
          (cooldownTime -
            (new Date().getTime() - usedCommandRecently[message.author.id])) /
          1000
        } seconds`
      );
    } else {
      client.commands.get(args[0]).execute(message, args, client);
      usedCommandRecently[message.author.id] = new Date().getTime();
      setTimeout(() => {
        delete usedCommandRecently[message.author.id];
      }, cooldownTime);
    }
  }
});

cron.job(
  clearSchedule,
  () => {
    console.log('executing');
    let server = client.guilds.cache.get(guildId);
    let channels = server.channels.cache;
    channels.forEach((channel, key, map) => {
      if (channel instanceof discord.TextChannel) {
        if (
          channel.name === 'general' ||
          channel.name === 'join-log' ||
          channel.name === 'announcements' ||
          channel.name === 'memes'
        )
          return;
        client.commands.get('clear').clear(channel);
        console.log(`Cleared channel '${channel.name}'`);
      }
    });
  },
  undefined,
  true,
  'America/Chicago'
);
// .start();

client.mongoose.init();
client.login(token);
