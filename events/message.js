const usedCommandRecently = {};
const cooldownTime = 60; // Not sure what to put here.

module.exports = async (client, message) => {
  if (message.author.id === '495824437506080769') {
    message.react('689310843619508297');
  }

  if (message.author.bot || message.content.charAt(0) !== '!') return;
  const args = message.content.substring(client.config.prefix.length).split(' ');

  if (client.commands.get(args[0])) {
    if (usedCommandRecently[message.author.id]) {
      message.reply(
        `You cannot use that command just yet! Wait another ${
        (cooldownTime -
          (new Date().getTime() - usedCommandRecently[message.author.id])) /
        1000
        } seconds`
      );
    } else {
      client.commands.get(args[0]).execute(message, args);
      usedCommandRecently[message.author.id] = new Date().getTime();
      setTimeout(() => {
        delete usedCommandRecently[message.author.id];
      }, cooldownTime);
    }
  }
};
