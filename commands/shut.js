module.exports = {
  name: 'shut',
  description: "Sends the 'shut' image",
  execute(message, args) {
    message.channel.send({
      files: ['./images/shut.png']
    });
  }
};
