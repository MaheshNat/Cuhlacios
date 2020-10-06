module.exports = {
  name: 'arjun',
  description: 'Sends a spicy picture of arjun being horny af',
  execute(message, args) {
    if (isNaN(args[1])) {
      return message.reply(
        `You need to enter a valid parameter for ${process.env.PREFIX}arjun <int>`
      );
    }
    // const num = args[1] // num is never used
    let file = '';
    switch (args[1]) {
      case '1':
        file = './images/arjun/arjun.png';
        break;
      case '2':
        file = './images/arjun/dumbass.png';
        break;
      case '3':
        file = './images/arjun/dimension.png';
        break;
      case '4':
        file = './images/arjun/recursive.png';
        break;
      case '5':
        file = './images/arjun/blind.png';
        break;
      case '6':
        file = './images/arjun/cock.JPG';
        break;
      default:
        return message.reply(
          'there is no arjun image for the specified number.'
        );
    }
    message.channel.send({
      files: [file]
    });
    message.delete();
  }
};
