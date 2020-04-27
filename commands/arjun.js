module.exports = {
  name: 'arjun',
  description: 'Sends a spicy picture of arjun being horny af',
  execute(message, args) {
    console.log(args);
    if (isNaN(args[1])) {
      return message.reply(
        `You need to enter a valid parameter for ${process.env.prefix}arjun <int>`
      );
    }
    // const num = args[1] // num is never used
    let file = '';
    switch (args[1]) {
      case '1':
        file = './images/arjun.png';
        break;
      case '2':
        file = './images/dumbass.png';
        break;
    }
    message.channel.send({
      files: [file]
    });
    message.delete();
  }
};
