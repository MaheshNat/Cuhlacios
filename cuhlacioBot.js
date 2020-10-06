const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.mongoose = require('./utils/mongoose');
client.config = require('./config.js');
client.loader = require('./modules/Loader');

const init = async () => {
  console.clear();
  const loader = client.loader;
  await loader.registerModules(client);
  await loader.registerCommands(client);
  await loader.registerEvents(client);
  await loader.checkDiscordStatus(client);
  try {
    await client.mongoose.init();
  } catch (err) {
    await client.logger.warn('URI needs to be defined for mongoose.');
  }
  await client.login(process.env.token);
  client.scheduler.start(client);
};

init();
