module.exports = {
  name: 'cursed',
  description: 'Sends a random cursed image.',
  execute(message, args) {
    message.channel.send({
      files: [
        './images/cursed/cursed_' +
          (Math.floor(Math.random() * 19) + 1) +
          '.jpg'
      ]
    });
  }
};
