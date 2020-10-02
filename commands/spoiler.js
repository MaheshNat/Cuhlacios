module.exports = {
  name: 'spoiler',
  description: 'Converts a message into a character by character spoiler',
  execute(message, args) {
    const text = message.content.substring(9);
    let output = '';
    for (let i = 0; i < text.length; i++) {
      output += `||${text.charAt(i)}||`;
    }
    message.channel.send(output).then(result => {
      message.delete();
    });
  }
};
