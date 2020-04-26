module.exports = {
  name: 'niceCockBro',
  description: "Sends the 'nice cock bro' image",
  execute (message, args) {
    message.channel.send({
      files: ['./images/nice_cock_bro.jpg']
    });
  }
};
