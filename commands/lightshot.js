const cheerio = require('cheerio');
const axios = require('axios');

module.exports = {
  name: 'lightshot',
  description: 'Spams lightshot links',
  async execute(message, args) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const makeId = () => {
      let result = '';
      for (var i = 0; i < 6; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    };

    let tries = 0;
    while (true) {
      const url = `https://prnt.sc/${makeId()}/direct`;
      const res = await axios.get(url);
      tries++;
      if (res.request.res.responseUrl !== url) {
        message.channel.send(url);
        message.channel.send(`lighthouse search took ${tries} tries.`);
        tries = 0;
      }
    }
  }
};
