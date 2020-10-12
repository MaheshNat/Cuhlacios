const dirtyEmojiImages = require('../utils/dirtyEmojiImages');

module.exports = {
  name: 'dirty',
  description: 'Sends a random dirty emoji image',
  execute(message, args) {
    if (!message.channel.nsfw) {
      return message.reply('This command can only be used in an nsfw channel.');
    }
    message.channel.send(
      dirtyEmojiImages[Math.floor(Math.random() * dirtyEmojiImages.length)]
    );
  }
};
