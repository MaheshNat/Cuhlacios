const urban = require('urban');
const discord = require('discord.js');

module.exports = {
  name: 'ud',
  description: 'Searches urban dictionary, or returns random result.',
  execute(message, args) {
    if (args.length <= 1 || !['random', 'search'].includes(args[1]))
      return message.reply(
        `Please enter a command in the format '${process.env.prefix}ud <search|random> query'`
      );
    let search =
      args[1] !== 'random' ? urban(args.slice(1).join(' ')) : urban.random();
    try {
      search.first(res => {
        if (!res) return message.reply('No results found.');
        let {
          word,
          definition,
          example,
          thumbs_up,
          thumbs_down,
          permalink,
          author
        } = res;
        let embed = new discord.MessageEmbed()
          .setAuthor(`Urban Dictionary | ${word}`)
          .setDescription(
            `Definition: ${definition || 'No definition.'}\nExample: ${
              example || 'No example.'
            }\nUpvote: ${thumbs_up || 0}\nDownvote: ${
              thumbs_down || 0
            }\nLink: ${permalink || 'https://www.urbandictionary.com'}`
          )
          .setTimestamp()
          .setFooter(`Written by ${author || 'unknown'}`);
        message.channel.send(embed);
      });
    } catch (e) {
      console.log(e);
      return message.channel.send('Lmfao this shit broke.');
    }
  }
};
