module.exports = {
  name: 'api',
  description: 'Sends a spicy picture of nigendra man.',
  execute(message, args) {
    message.channel.send({
      files: ['./images/nigendra.png']
    });
  }
};
