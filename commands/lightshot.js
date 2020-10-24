const cheerio = require('cheerio');
const axios = require('axios');

module.exports = {
  name: 'lightshot',
  description: 'Spams lightshot links',
  async execute(message, args) {
    if (message.author.id !== process.env.OWNER_USER_ID)
      return message.reply('git good.');
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

    setInterval(async () => {
      console.log('starting searching for a lightshot image.');
      let tries = 0;
      let foundImage = false;
      while (!foundImage) {
        const url = `https://prnt.sc/${makeId()}/direct`;
        let res;
        try {
          res = await axios.get(url);
        } catch (e) {
          return;
        }
        tries++;
        if (
          res.request.res.responseUrl !== url &&
          res.request.res.responseUrl !==
            'https://st.prntscr.com/2020/08/01/0537/img/0_173a7b_211be8ff.png'
        ) {
          message.channel.send(url);
          message.channel.send(`lightshot search took ${tries} tries.`);
          foundImage = true;
        }
      }
    }, parseInt(process.env.LIGHTSHOT_POLL_INTERVAL) * 1000);
  }
};
