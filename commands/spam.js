module.exports = {
  name: 'spam',
  description: 'spams a message repeatedly.',
  async execute(message, args, client) {
    client.spamming = true;
    let spam = args.splice(2, args.length).join(' ') + ' ';
    let length = parseInt(args[1]);
    let spamMessage = '';
    while (spamMessage.length <= 2000) spamMessage += spam;
    spamMessage = spamMessage.substring(0, 2000);

    const ids = [
      '730519603519946862',
      '679533038539112455',
      '341696635467857921'
    ];
    if (!ids.includes(message.author.id)) return message.reply('git good.');
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
