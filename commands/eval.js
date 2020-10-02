module.exports = {
  name: 'eval',
  description: 'Evaluates code following command in javascript',
  execute(message, args) {
    if (message.author.id !== '341696635467857921')
      return message.reply('git good.');
    let code = args.slice(1, args.length).join(' ');
    if (code.includes('process.env'))
      return message.reply('You cannot access process.env.');
    try {
      message.channel.send(eval(code), { code: 'javascript' });
    } catch (err) {
      message.channel.send(`ERROR!\n${err}`, { code: 'javascript' });
    }
  }
};
