module.exports = {
  name: 'spam',
  description: 'spams a message repeatedly.',
  async execute(message, args, client) {
    if (!process.env.PERMITTED_SPAM_GUILD_IDS.includes(message.guild.id))
      return message.reply('Spamming is prohibited on this server.');
    let spam = args.splice(2, args.length).join(' ') + ' ';
    if (isNaN(args[1]))
      return message.reply(
        `You need to specify a number of messages to spam. Usage: ${process.env.PREFIX}spam <messages> <what you want to spam>.`
      );

    let length = parseInt(args[1]);
    if (
      length >= process.env.SPAM_LIMIT &&
      message.author.id !== process.env.OWNER_USER_ID
    )
      return message.reply(
        `The spam limit is currently set to ${process.env.SPAM_LIMIT} messages.`
      );
    let spamMessage = '';
    while (spamMessage.length <= 2000) spamMessage += spam;
    spamMessage = spamMessage.substring(0, 2000);

    if (!process.env.PERMITTED_SPAM_USER_IDS.includes(message.author.id))
      return message.reply('You are not permitted to use the spam command.');
    for (let i = 0; i < length; i++) {
      await message.channel.send(spamMessage).then(message => {
        let args = message.content
          .substring(process.env.PREFIX.length)
          .split(' ');
        if (client.commands.get(args[0]))
          client.commands.get(args[0]).execute(message, args, client);
      });
    }
  }
};
