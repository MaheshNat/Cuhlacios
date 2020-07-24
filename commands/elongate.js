module.exports = {
  name: 'elongate',
  description:
    "adds a space between each letter of a message, the number of spaces between letters can be changed using the 'spaces=' flag",
  execute(message, args) {
    let spaces = 1;
    let text = args.slice(1, args.length).join(' ');
    if (args[1].startsWith('spaces=')) {
      spaces = parseInt(args[1].substring(7));
      text = args.slice(2, args.length).join(' ');
    }
    let reply = '';
    for (let i in text) {
      reply += text.charAt(i);
      for (let j = 0; j < spaces; j++) reply += ' ';
    }
    if (reply.length >= 2000)
      message.reply(
        'You cannot send messages greater than 2000 characters in length.'
      );
    else message.channel.send(reply);
    message.delete();
  }
};
