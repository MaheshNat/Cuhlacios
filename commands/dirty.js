const dirtyEmojiImages = require('../utils/dirtyEmojiImages');

module.exports = {
  name: 'dirty',
  description: 'Sends a random dirty emoji image',
  execute(message, args) {
    message.channel.send(
      dirtyEmojiImages[Math.floor(Math.random() * dirtyEmojiImages.length)]
    );
  }
};
