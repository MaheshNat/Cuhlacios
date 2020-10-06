const discord = require('discord.js');

module.exports = {
  name: 'clear',
  description:
    "Clears the entirety of the message channel containing the command. Optional arguments include 'messages=', which specifies the number of messages to be deleted. If the optional argument is not written, all of the channel's messages are deleted.",
  async execute(message, args) {
    if (
      !(
        message.member.roles.cache.some(role => role.name === 'mod') ||
        message.member.roles.cache.some(role => role.name === 'owner')
      )
    ) {
      message.reply('Sorry, only owners and mods can use this command.');
      return;
    }
    if (message.channel instanceof discord.DMChannel)
      return message.channel.delete();
    let fetched;
    for (const arg of args) {
      if (arg.split('=')[0] === 'messages') {
        const numMessages = parseInt(arg.split('=')[1]);
        if (numMessages > 100) {
          message.reply(
            `Can only delete a maximum of 100 messages in a single call, type '${process.env.PREFIX}clear' to clear the entire channel`
          );
        }
        fetched = await message.channel.messages.fetch({
          limit: numMessages
        });
        message.channel.bulkDelete(fetched);
        message.reply(`Successfully deleted ${numMessages} messages`);
        return;
      }
    }
    fetched = await message.channel.messages.fetch({ limit: 100 });
    message.channel.bulkDelete(fetched);
  },
  async clear(channel) {
    do {
      var fetched = await channel.messages.fetch({ limit: 100 });
      try {
        channel.bulkDelete(fetched);
      } catch (e) {
        return channel.send("Can't bulk delete messages over 30 days old.");
      }
    } while (fetched.size >= 2);
  }
};
