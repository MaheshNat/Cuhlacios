const puppeteer = require('puppeteer');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const axios = require('axios');

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

exports.checkNvidiaDrop = async client => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  client.browser = browser;
  client.logger.ready('Puppeteer launched.');
  setInterval(async () => {
    console.log('checking...');
    const page = await client.browser.newPage();
    await page.setViewport({
      width: 3960,
      height: 2160,
      deviceScaleFactor: 3
    });
    await page.goto(
      'https://www.bestbuy.com/site/nvidia-geforce-rtx-3060-ti-8gb-gddr6-pci-express-4-0-graphics-card-steel-and-black/6439402.p'
    );
    const text = await page.evaluate(() => {
      const featureArticle = document.evaluate(
        '//*[@id="fulfillment-add-to-cart-button-b242d90a-abdc-4568-b636-f20625066b50"]/div/div/div/button',
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      return featureArticle.textContent;
    });
    if (text !== 'Sold Out') {
      for (let i = 0; i < 5; i++) {
        let spamMessage = '';
        while (spamMessage.length <= 2000)
          spamMessage += `@everyone AYO FUCKING FAGRAYSTS THE SHIT IS IN STOCK GO FUCKING COOOOPPP!!!! @everyone https://www.bestbuy.com/site/nvidia-geforce-rtx-3060-ti-8gb-gddr6-pci-express-4-0-graphics-card-steel-and-black/6439402.p?skuId=6439402 `;
        spamMessage = spamMessage.substring(0, 2000);
        client.channels.cache
          .get(process.env.SPAM_CHANNEL_ID)
          .send(spamMessage);
      }
    }
    console.log(`checked: ${text}`);
    await page.close();
  }, parseInt(process.env.CHECK_NVIDIA_DELAY));
};
