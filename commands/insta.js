const axios = require('axios');

module.exports = {
  name: 'insta',
  description: `roasts the shit out of someone on instagram using a bot acc. Usage: ${process.env.prefix}insta <username> <number of messages> <'roast' for a roast message>`,
  async execute(message, args, client) {
    if (!args[1] || !args[2] || isNaN(args[2]))
      return message.reply(
        `You need to specify a number of messages to spam. Usage: ${process.env.prefix}insta <username> <number of messages>.`
      );

    if (
      ![
        '679533038539112455',
        '341696635467857921',
        '409513998338359296',
        '484442275175464960'
      ].includes(message.author.id)
    )
      return message.reply(`git good.`);

    message.reply(
      `Sending ${args[2]} messages to ${args[1]}, don't worry if you don't get a response from me the spam will still go through, heroku is gay and has a request timeout limit.`
    );
    axios({
      method: 'post',
      url: process.env.tyroneApi,
      timeout: 1000 * 600,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: args[1],
        messages: parseInt(args[2]),
        roast: args[3] === 'roast' ? 'True' : 'False',
        ...({ message: args.slice(3).join(' ') } && args[3] === 'roast')
      }
    })
      .then(res => {
        return message.reply(
          `Successfully sent ${args[2]} messages to ${args[1]}`
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
};
