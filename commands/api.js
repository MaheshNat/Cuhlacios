module.exports = {
  name: 'api',
  description: 'Sends a spicy picture of rutvij being a nig rayst api.',
  execute(message, args) {
    message.channel.send({
      files: ['./images/api.png']
    });
  }
};
