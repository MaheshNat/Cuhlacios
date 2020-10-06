const usedCommandRecently = {};

module.exports = async (client, message) => {
  if (message.author.bot || message.content.charAt(0) !== process.env.PREFIX)
    return;
  const args = message.content.substring(process.env.PREFIX.length).split(' ');

  if (!process.env.PERMITTED_GUILD_IDS.includes(message.guild.id)) return;

  if (client.commands.get(args[0])) {
    if (usedCommandRecently[message.author.id]) {
      message.reply(
        `You cannot use that command just yet! Wait another ${
          (process.env.COOLDOWN_TIMER -
            (new Date().getTime() - usedCommandRecently[message.author.id])) /
          1000
        } seconds`
      );
    } else {
      client.commands.get(args[0]).execute(message, args, client);
      usedCommandRecently[message.author.id] = new Date().getTime();
      setTimeout(() => {
        delete usedCommandRecently[message.author.id];
      }, process.env.COOLDOWN_TIMER);
    }
  }
};
