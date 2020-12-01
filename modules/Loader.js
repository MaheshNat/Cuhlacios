const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const axios = require('axios');
const cheerio = require('cheerio');

exports.registerModules = async client => {
  const moduleFiles = await readdir('./modules/');
  moduleFiles.forEach(file => {
    const moduleName = file.split('.')[0];
    if (
      moduleName[0] === moduleName[0].toLowerCase() ||
      moduleName === 'Loader'
    ) {
      return;
    }
    client[moduleName.toLowerCase()] = require('./' + moduleName);
  });
};

exports.registerCommands = async client => {
  const cmdFiles = await readdir('./commands/');
  if (cmdFiles.length > 0) {
    client.logger.log(`Loading ${cmdFiles.length} commands`);
  }
  const registeredCommands = [];
  cmdFiles.forEach(file => {
    const commandName = file.split('.')[0];
    const props = require(`../commands/${file}`);
    client.commands.set(props.name, props);
    registeredCommands.push(commandName);
  });
  client.logger.log(`Loaded: [${registeredCommands.join(' ')}]`);
};

exports.registerEvents = async client => {
  const eventFiles = await readdir('./events/');
  client.logger.log(`Loading ${eventFiles.length} events`);

  const registeredEvents = [];
  eventFiles.forEach(file => {
    const eventName = file.split('.')[0];
    const evt = require(`../events/${file}`);
    client.on(eventName, evt.bind(null, client));
    registeredEvents.push(eventName);
  });
  client.logger.log(`Loaded: [${registeredEvents.join(' ')}]`);
};

exports.checkDiscordStatus = client => {
  axios
    .get(process.env.STATUS_URL)
    .then(({ data }) =>
      client.logger.log(`Discord API Status: ${data.status.description}`)
    );
};

exports.registerRestrictedCommands = client => {
  client['restrictedCommands'] = JSON.parse(process.env.RESTRICTED_COMMANDS);
};

exports.checkNvidiaDrop = client => {
  client.interval = setInterval(async () => {
    let res;
    try {
      res = await axios.get(
        'https://www.bestbuy.com/site/nvidia-geforce-rtx-3060-ti-8gb-gddr6-pci-express-4-0-graphics-card-steel-and-black/6439402.p?skuId=6439402'
      );
    } catch (e) {
      console.log(e);
      // clearInterval(client.interval);
      return;
    }
    if (!res.data.includes('Coming Soon')) {
      for (let i = 0; i < 200; i++) {
        let spamMessage = '';
        while (spamMessage.length <= 2000)
          spamMessage += `@everyone AYO FUCKING FAGRAYSTS THE SHIT IS IN STOCK GO FUCKING COOOOPPP!!!! @everyone https://www.bestbuy.com/site/nvidia-geforce-rtx-3060-ti-8gb-gddr6-pci-express-4-0-graphics-card-steel-and-black/6439402.p?skuId=6439402 `;
        spamMessage = spamMessage.substring(0, 2000);
        client.channels.cache
          .get(process.env.SPAM_CHANNEL_ID)
          .send(spamMessage);
      }
      clearInterval(client.interval);
    }
    console.log('checked.');
  }, parseInt(process.env.CHECK_NVIDIA_DELAY));
};
