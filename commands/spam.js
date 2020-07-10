module.exports = {
  name: 'spam',
  description: 'spams a message repeatedly.',
  async execute(message, args, client) {
    client.spamming = true;
    let spam = args.splice(2, args.length).join(' ') + ' ';
    if (isNaN(args[1]))
      return message.reply(
        `You need to specify a number of messages to spam. Usage: ${process.env.prefix}spam <messages> <what you want to spam>.`
      );

    let length = parseInt(args[1]);
    if (length >= process.env.SPAM_LIMIT)
      return message.reply(
        "Any more than this and you're prolly gonna get kicked"
      );
    let spamMessage = '';
    while (spamMessage.length <= 2000) spamMessage += spam;
    spamMessage = spamMessage.substring(0, 2000);

    if (!process.env.spammingIds.includes(message.author.id))
      return message.reply('git good.');
    for (let i = 0; i < length; i++) {
      if (!client.spamming) return;
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
