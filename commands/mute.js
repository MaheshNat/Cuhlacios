const ms = require('ms');

const muteID = '695306368583860232';

module.exports = {
  name: 'mute',
  description: 'Temporarily mutes a user',
  execute(message, args) {
    if (
      !(
        message.member.roles.cache.some(role => role.name === 'mod') ||
        message.member.roles.cache.some(role => role.name === 'owner')
      )
    ) {
      message.reply('Sorry, only owners and mods can use this command.');
      return;
    }
    const person = message.guild.member(message.mentions.members.first());
    if (!person) return message.reply("Couldn't find that member");

    if (!args[2]) {
      return message.reply("You didn't specify a time!");
    }
    person.roles.add(muteID);

    message.channel.send(
      `@${person.user.tag} has now been muted for ${ms(ms(args[2]))}`
    );

    setTimeout(() => {
      person.roles.remove(muteID);
      message.channel.send(`@${person.user.tag} has been unmuted!`);
    }, ms(args[2]));
  }
};
