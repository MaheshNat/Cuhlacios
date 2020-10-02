module.exports = {
  name: 'ok',
  description: "Sends the 'ok' image",
  execute(message, args) {
    message.channel.send({
      files: ['./images/ok.png']
    });
  }
};
