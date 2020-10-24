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
      let res;
      try {
        res = await axios.get(url);
      } catch (e) {
        continue;
      }
      tries++;
      if (
        res.request.res.responseUrl !== url &&
        res.request.res.responseUrl !==
          'https://st.prntscr.com/2020/08/01/0537/img/0_173a7b_211be8ff.png'
      ) {
        message.channel.send(url);
        message.channel.send(`lightshot search took ${tries} tries.`);
        tries = 0;
      }
    }
  }
};
