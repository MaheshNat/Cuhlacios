module.exports = {
  name: 'hump',
  description: 'Sends a spicy picture of rutvij humping you.',
  execute(message, args) {
    message.channel.send({
      files: ['./images/hump.jpg']
    });
  }
};
