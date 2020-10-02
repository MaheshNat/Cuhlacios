module.exports = {
  name: 'gnp',
  description: 'if you know, you know.',
  execute(message, args) {
    message.channel.send(':avocado: :gorilla: :eggplant:');
    message.delete();
  }
};
