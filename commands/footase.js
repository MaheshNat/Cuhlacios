module.exports = {
  name: 'footase',
  description: 'Sends a spicy picture of nigendra performing footase.',
  execute(message, args) {
    message.channel.send({
      files: ['./images/footase.png'],
    });
  },
};
