const usedCommandRecently = {};

module.exports = async (client, message) => {
  if (message.author.bot || message.content.charAt(0) !== client.config.prefix)
    return;
  const args = message.content
    .substring(client.config.prefix.length)
    .split(' ');

  if (client.commands.get(args[0])) {
    if (usedCommandRecently[message.author.id]) {
      message.reply(
        `You cannot use that command just yet! Wait another ${
          (client.config.cooldownTimer -
            (new Date().getTime() - usedCommandRecently[message.author.id])) /
          1000
        } seconds`
      );
    } else {
      client.commands.get(args[0]).execute(message, args, client);
      usedCommandRecently[message.author.id] = new Date().getTime();
      setTimeout(() => {
        delete usedCommandRecently[message.author.id];
      }, client.config.cooldownTimer);
    }
  }
};
