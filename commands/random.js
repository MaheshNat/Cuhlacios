const cheerio = require('cheerio');
const axios = require('axios');

module.exports = {
  name: 'random',
  description:
    'Sends a random google image based on the search term which follows',
  execute(message, args) {
    const searchTerm = args.splice(1, args.length).join(' ');

    axios
      .get('http://results.dogpile.com/serp?qc=images&q=' + searchTerm)
      .then(res => {
        $ = cheerio.load(res.data);
        var links = $('.image a.link');
        var urls = new Array(links.length)
          .fill(0)
          .map((v, i) => links.eq(i).attr('href'));
        if (!urls.length) return message.reply('No results found.');

        message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
      });
  }
};
