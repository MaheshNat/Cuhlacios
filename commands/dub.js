module.exports = {
  name: 'dub',
  description: "Sends a random 'dub' picture",
  execute(message, args) {
    message.channel.send({
      files: [
        './images/dub/dub_' + (Math.floor(Math.random() * 21) + 1) + '.jpg'
      ]
    });
  }
};
