const Discord = require('discord.js');
const fs = require('fs');
const Pagination = require('discord-paginationembed');
const path = require('path');

module.exports = {
  name: 'help',
  description: `Sends a description of every command. Use help \`command\` for help on a specific command.`,
  usage: `${process.env.PREFIX}help \`command\`\n${process.env.PREFIX}help`,
  execute(message, args, kwargs, client) {
    if (args.length === 2) {
      // handling call for specific command
      try {
        const command = require(path.join(__dirname, args[1]) + '.js');
        message.channel.send(`**${command.name}**: ${command.description}`);
      } catch (e) {
        return message.channel.send(
          new Discord.MessageEmbed()
            .setDescription(`No command named ${args[1]} found.`)
            .setColor(process.env.EMBED_COLOR)
        );
      }
    } else {
      // handling call for all commands, building paginated fields embed
      const embed = new Pagination.FieldsEmbed();
      embed.embed.setTitle(`Help`).setColor(process.env.EMBED_COLOR);
      embed
        .setArray(
          fs
            .readdirSync('commands/')
            .filter((file) => file.endsWith('.js'))
            .map((file) => {
              const command = require(`./${file}`);
              return {
                word: `**${
                  command.name instanceof Array
                    ? command.name.join(',')
                    : command.name
                }**: ${command.description}\n${command.nsfw ? 'nsfw\n' : ''}`,
              };
            })
        )
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(true)
        .setElementsPerPage(4)
        .formatField('Commands', (el) => el.word)
        .build();
    }
  },
};
