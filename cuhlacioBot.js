const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.mongoose = require('./utils/mongoose');
client.loader = require('./modules/Loader');
const OpenAI = require('openai-api');
client.openai = new OpenAI(process.env.OPENAI_API_KEY);

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');
const pingRouter = require('./routes/ping');
const tradesRouter = require('./routes/trades');
const PORT = process.env.PORT || 8080;

const init = async () => {
  console.clear();
  const loader = client.loader;
  await loader.registerModules(client);
  await loader.registerCommands(client);
  await loader.registerEvents(client);
  await loader.checkDiscordStatus(client);
  await loader.registerRestrictedCommands(client);
  try {
    await client.mongoose.init();
  } catch (err) {
    await client.logger.warn('URI needs to be defined for mongoose.');
  }
  client.scheduler.start(client);

  // initializing web server
  const app = express();

  app.use(express.json({ limit: '500mb' }));
  app.use(cors());
  app.use('/user', userRouter);
  app.use('/ping', pingRouter);
  app.use('/trades', tradesRouter);
  app.listen(PORT, () => {
    client.logger.ready(`Listening on port ${PORT}.`);
  });
  await client.login(process.env.TOKEN);
};

init();
