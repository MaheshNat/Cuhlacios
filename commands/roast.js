const axios = require('axios');
const fs = require('fs');

module.exports = {
  name: 'roast',
  description: 'Roasts the shit out of you.',
  async execute(message, args) {
    let roasts;
    if (fs.existsSync('./utils/roasts.json')) {
      roasts = JSON.parse(fs.readFileSync('./utils/roasts.json'));
    } else {
      const res = await axios.get(
        'https://zenodo.org/api/files/4b018c73-e22f-4c7c-bd0e-bdabdbd9a28b/macro-norm-violations-n10-t0-misogynistic-slurs.csv'
      );
      roasts = res.data.split('\n')

      fs.writeFile(
        './utils/roasts.json',
        JSON.stringify(roasts),
        err => {
          if (err) return console.log(err);
          console.log('roasts.json file written.');
        }
      );
    }
    message.channel.send(roasts[Math.floor(Math.random() * roasts.length)])
  }
};
