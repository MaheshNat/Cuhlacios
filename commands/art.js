const cheerio = require('cheerio');
const request = require('request');

module.exports = {
  name: 'art',
  description: 'Sends ASCII art.',
  execute(message, args) {
    if (!message.channel.nsfw) {
      return message.reply('This command can only be used in an nsfw channel.');
    }

    var options = {
      url: 'https://www.asciiart.eu/people/sexual/women',
      method: 'GET',
      headers: {
        Accept: 'text/html',
        'User-Agent': 'Chrome'
      }
    };

    request(options, (error, response, responseBody) => {
      if (error) {
        console.log(error);
        return;
      }
      const $ = cheerio.load(responseBody);
      const _women = $('pre');
      const women = new Array(_women.length)
        .fill(0)
        .map((v, i) => _women.eq(i).text());
      if (!women.length) return;
      women.splice(0, 2);
      const woman = women[Math.floor(Math.random() * women.length)];
      const chunks = woman.match(/(.|[\r\n]){1,1994}/g);
      for (const chunk of chunks) {
        console.log(chunk.length);
        message.channel.send(
          '```' + chunk.replace('```', '`\u200b`\u200b`') + '```'
        );
      }
    });
  }
};
