module.exports = {
  generateEmojiPasta(text, emojiMappings) {
    function splitIntoBlocks(text) {
      return text.match(/\s*[^\s]*/g);
    }

    function generateEmojisFrom(block) {
      var trimmedBlock = trimNonAlphanumericalChars(block);
      var matchingEmojis = getMatchingEmojis(trimmedBlock);
      var emojis = [];
      if (matchingEmojis) {
        var numEmojis = Math.floor(
          Math.random() * (parseInt(process.env.maxEmojisPerBlock) + 1)
        );
        for (var i = 0; i < numEmojis; i++) {
          emojis.push(
            matchingEmojis[Math.floor(Math.random() * matchingEmojis.length)]
          );
        }
      }
      return emojis.join('');
    }

    function trimNonAlphanumericalChars(text) {
      return text.replace(/^\W*/, '').replace(/\W*$/, '');
    }

    function getMatchingEmojis(word) {
      var key = getAlphanumericPrefix(word.toLowerCase());
      if (key in emojiMappings) {
        return emojiMappings[key];
      }
      return [];
    }

    function getAlphanumericPrefix(s) {
      return s.match(/^[a-z0-9]*/i);
    }

    var blocks = splitIntoBlocks(text);
    var newBlocks = [];
    blocks.forEach(block => {
      newBlocks.push(block);
      emojis = generateEmojisFrom(block);
      if (emojis) {
        newBlocks.push(' ' + emojis);
      }
    });
    return newBlocks.join('');
  }
};
