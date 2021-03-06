const cheerio = require('cheerio');
const axios = require('axios');

module.exports = {
  name: 'art',
  description: 'Sends ASCII art.',
  nsfw: true,
  execute(message, args) {
    var options = {
      url: 'https://www.asciiart.eu/people/sexual/women',
      method: 'GET',
      headers: {
        Accept: 'text/html',
        'User-Agent': 'Chrome'
      }
    };

    axios.get('https://www.asciiart.eu/people/sexual/women').then(res => {
      const $ = cheerio.load(res.data);
      const _women = $('pre');
      const women = new Array(_women.length)
        .fill(0)
        .map((v, i) => _women.eq(i).text());
      if (!women.length) return;
      women.splice(0, 2);
      const woman = women[Math.floor(Math.random() * women.length)];
      const chunks = woman.match(/(.|[\r\n]){1,1994}/g);
      for (const chunk of chunks) {
        message.channel.send(
          '```' + chunk.replace('```', '`\u200b`\u200b`') + '```'
        );
      }
    });
  }
};
