const axios = require('axios');
const fs = require('fs');

module.exports = {
  name: 'emojimapping',
  description: 'Returns the emojimapping for a given word',
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
    if (!emojiMappings[args.slice(1, args.length).join(' ')])
      return message.reply('No emoji mapping found for that word(s).');
    const chunks = JSON.stringify(
      emojiMappings[args.slice(1, args.length).join(' ')]
    ).match(/(.|[\r\n]){1,1999}/g);
    for (let chunk of chunks) message.channel.send(chunk);
  }
};
