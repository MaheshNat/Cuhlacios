module.exports = {
  name: 'spam',
  description: 'spams a message repeatedly.',
  async execute(message, args) {
    let spam = args.splice(1, args.length).join(' ') + ' ';
    let spamMessage = '';
    while (spamMessage.length <= 2000) spamMessage += spam;
    spamMessage = spamMessage.substring(0, 2000);

    if (message.author.id !== '341696635467857921')
      return message.reply(
        "Are you the almighty chubbyFreak? That's what I thought."
      );
    for (let i = 0; i < 100; i++) {
      message.channel.send(spamMessage);
    }
  }
};
