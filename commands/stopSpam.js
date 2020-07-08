module.exports = {
  name: 'stopSpam',
  description: 'stops spamming.',
  async execute(message, args, client) {
    client.spamming = false;
    message.channel.send('stopped spamming.');
  }
};
