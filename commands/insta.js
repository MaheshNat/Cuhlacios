const axios = require('axios');

module.exports = {
  name: 'insta',
  description: `roasts the shit out of someone on instagram using a bot acc. Usage: ${process.env.prefix}insta <username> <number of messages>`,
  async execute(message, args, client) {
    if (!args[1] || !args[2] || isNaN(args[2]))
      return message.reply(
        `You need to specify a number of messages to spam. Usage: ${process.env.prefix}insta <username> <number of messages>.`
      );

    if (
      ![
        '679533038539112455',
        '341696635467857921',
        '409513998338359296'
      ].includes(message.author.id)
    )
      return message.reply(`git good.`);

    message.reply(`Sending ${args[2]} messages to ${args[1]}`);
    axios
      .post(process.env.tyroneApi, {
        username: args[1],
        messages: parseInt(args[2])
      })
      .then(res => {
        return message.reply(
          `Successfully sent ${args[2]} messages to ${args[1]}`
        );
      })
      .catch(err => {
        console.log(err);
        return message.reply(
          `Something went wrong sending ${args[2]} messages to ${args[1]}`
        );
      });
  }
};
