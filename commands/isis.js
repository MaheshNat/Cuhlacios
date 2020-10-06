const axios = require('axios');
const fs = require('fs');

module.exports = {
  name: 'isis',
  description: 'Sends a random isis based shitpost picture.',
  async execute(message, args, client) {
    let isisImages;
    if (fs.existsSync('./utils/isisImages.json')) {
      isisImages = JSON.parse(fs.readFileSync('./utils/isisImages.json'));
    } else {
      const isisData = await axios.get(process.env.MEDIUM_ISIS_ARTICLE_URL);
      isisImages = isisData.data
        .match(/ImageMetadata:1\*\w+\.\w+/g)
        .map(match => {
          return `https://miro.medium.com/max/602/${match.substring(14)}`;
        });

      fs.writeFile(
        './utils/isisImages.json',
        JSON.stringify(isisImages),
        err => {
          if (err) return console.log(err);
          console.log('isisImages.json file written.');
        }
      );
    }
    message.channel.send(
      isisImages[Math.floor(Math.random() * isisImages.length)]
    );
  }
};
