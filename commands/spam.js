module.exports = {
  name: 'spam',
  description: 'spams a message repeatedly.',
  async execute(message, args, client) {
    let spam = args.splice(1, args.length).join(' ') + ' ';
    let spamMessage = '';
    while (spamMessage.length <= 2000) spamMessage += spam;
    spamMessage = spamMessage.substring(0, 2000);

    if (
      !(
        message.author.id === '341696635467857921' ||
        message.author.id === '679533038539112455'
      )
    )
      return message.reply(
        "Are you the almighty chubbyFreak or mediumuzivert? That's what I thought."
      );
    for (let i = 0; i < 100; i++) {
      await message.channel.send(spamMessage).then(message => {
        let args = message.content
          .substring(process.env.prefix.length)
          .split(' ');
        if (client.commands.get(args[0]))
          client.commands.get(args[0]).execute(message, args, client);
      });
    }
  }
};
