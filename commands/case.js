module.exports = {
  name: 'case',
  description: 'converts text to random case',
  execute(message, args) {
    let transformed = '';
    for (let i = 0; i < message.substring(6).length; i++) {
      let char = message.substring(6).charAt(i);
      transformed +=
        Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
    }
    message.channel.send(transformed);
  }
};
