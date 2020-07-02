module.exports = {
  name: 'plutus',
  description: 'Sends a spicy picture of plutus being horny af',
  execute(message, args) {
    console.log(args);
    if (isNaN(args[1]))
      return message.reply(
        `You need to enter a valid parameter for ${process.env.prefix}plutus <int>`
      );
    let num = args[1];
    let file = '';
    switch (args[1]) {
      case '1':
        file = './images/plutus/plutus_1.png';
        break;
    }
    message.channel.send({
      files: [file]
    });
    message.delete();
  }
};
