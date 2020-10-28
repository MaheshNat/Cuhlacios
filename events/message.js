const usedCommandRecently = {};

module.exports = async (client, message) => {
  if (message.author.bot || message.content.charAt(0) !== process.env.PREFIX)
    return;
  const args = message.content.substring(process.env.PREFIX.length).split(' ');

  if (!process.env.PERMITTED_GUILD_IDS.includes(message.guild.id))
    return message.reply(
      'Cuhlacios is not authorized to be used in this server.'
    );

  const command = client.commands.get(args[0]);
  if (command) {
    if (usedCommandRecently[message.author.id]) {
      message.reply(
        `You cannot use that command just yet! Wait another ${
          (process.env.COOLDOWN_TIMER -
            (new Date().getTime() - usedCommandRecently[message.author.id])) /
          1000
        } seconds`
      );
    } else {
      if (!message.channel.nsfw && command.nsfw)
        return message.reply(
          'This command can only be used in an nsfw channel.'
        );
      if (
        client['restrictedCommands'][args[0]] &&
        !client['restrictedCommands'][args[0]].includes(message.guild.id)
      )
        return message.reply('This command cannot be used in this server.');
      command.execute(message, args, client);
      usedCommandRecently[message.author.id] = new Date().getTime();
      setTimeout(() => {
        delete usedCommandRecently[message.author.id];
      }, process.env.COOLDOWN_TIMER);
    }
  }
};
