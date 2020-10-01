module.exports = {
  name: 'eval',
  description: 'Evaluates code following command in javascript',
  execute(message, args) {
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
