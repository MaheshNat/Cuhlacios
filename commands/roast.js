const axios = require('axios');
const Roast = require('../models/roast.js');

module.exports = {
  name: 'roast',
  description: 'Roasts the shit out of you.',
  execute(message, args) {
    Roast.countDocuments().then(count => {
      const random = Math.floor(Math.random() * count);
      Roast.findOne()
        .skip(random)
        .then(roast => {
          message.channel.send(roast.roast.substring(0, 2000));
        });
    });
  }
};
