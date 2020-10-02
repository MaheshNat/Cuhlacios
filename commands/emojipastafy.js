const axios = require('axios');
const fs = require('fs');
const { generateEmojiPasta } = require('../utils/emojipasta');

module.exports = {
  name: 'emojipastafy',
  description: 'Converts text into emojipasta form.',
  async execute(message, args) {
    let emojiMappings;
    if (fs.existsSync('./utils/emojiMappings.json')) {
      emojiMappings = JSON.parse(fs.readFileSync('./utils/emojiMappings.json'));
    } else {
      const res = await axios.get(
        'https://kevingal.com/static/js/apps/emojipasta/emoji-mappings.js'
      );
      emojiMappings = JSON.parse(res.data.substring(17, res.data.length - 1));

      fs.writeFile(
        './utils/emojiMappings.json',
        res.data.substring(17, res.data.length - 1),
        err => {
          if (err) return console.log(err);
          console.log('emojiMappings.json file written.');
        }
      );
    }
    const emojiPasta = generateEmojiPasta(
      args.slice(1, args.length).join(' '),
      emojiMappings
    );
    const chunks = emojiPasta.match(/(.|[\r\n]){1,1999}/g);
    for (let chunk of chunks) message.channel.send(chunk);
  }
};
