const discord = require('discord.js');

module.exports = {
  name: 'clear',
  description:
    "Clears the entirety of the message channel containing the command. Optional arguments include 'messages=', which specifies the number of messages to be deleted. If the optional argument is not written, all of the channel's messages are deleted.",
  async execute(message, args) {
    message.reply(
      'The clear command is currently disabled due to excessive yeetage of messages for no apparent reason ¯\\_(ツ)_/¯'
    );
    //   if (
    //     !(
    //       message.member.roles.cache.some(role => role.name === 'mod') ||
    //       message.member.roles.cache.some(role => role.name === 'owner')
    //     )
    //   ) {
    //     message.reply('Sorry, only owners and mods can use this command.');
    //     return;
    //   }
    //   if (message.channel instanceof discord.DMChannel)
    //     return message.channel.delete();
    //   let fetched;
    //   for (let arg of args) {
    //     if (arg.split('=')[0] === 'messages') {
    //       let numMessages = parseInt(arg.split('=')[1]);
    //       if (numMessages > 100)
    //         message.reply(
    //           `Can only delete a maximum of 100 messages in a single call, type '${process.env.prefix}clear' to clear the entire channel`
    //         );
    //       message.channel.messages;
    //       fetched = await message.channel.messages.fetch({
    //         limit: numMessages
    //       });
    //       message.channel.bulkDelete(fetched);
    //       message.reply(`Successfully deleted ${numMessages} messages`);
    //       return;
    //     }
    //   }
    //   do {
    //     fetched = await message.channel.messages.fetch({ limit: 100 });
    //     message.channel.bulkDelete(fetched);
    //   } while (fetched.size >= 2);
    // },
    // async clear(channel) {
    //   do {
    //     fetched = await channel.messages.fetch({ limit: 100 });
    //     channel.bulkDelete(fetched);
    //   } while (fetched.size >= 2);
    // }
  }
};
