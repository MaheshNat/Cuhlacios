module.exports = {
  name: 'emojify',
  description: 'Turns a string of letters into emojis',
  execute(message, args) {
    let text = args
      .slice(1, args.length)
      .join(' ')
      .toLowerCase()
      .replace(/\W|[0-9]|_/g, '');
    let reply = '';
    for (let i in text)
      reply += ' :regional_indicator_' + text.charAt(i) + ': ';

    message.channel.send(reply);
    message.delete();
  }
};
