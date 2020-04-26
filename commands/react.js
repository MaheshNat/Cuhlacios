const emojiMap = {
  a: '🇦',
  b: '🇧',
  c: '🇨',
  d: '🇩',
  e: '🇪',
  f: '🇫',
  g: '🇬',
  h: '🇭',
  i: '🇮',
  j: '🇯',
  k: '🇰',
  l: '🇱',
  m: '🇲',
  n: '🇳',
  o: '🇴',
  p: '🇵',
  q: '🇶',
  r: '🇷',
  s: '🇸',
  t: '🇹',
  u: '🇺',
  v: '🇻',
  w: '🇼',
  x: '🇽',
  y: '🇾',
  z: '🇿'
}

module.exports = {
  name: 'react',
  description:
    "Reacts to a specific message with emojified text. Requires the 'id=' flag, which specifies a message to be reacted to.",
  execute (message, args) {
    const text = args
      .splice(2, args.length)
      .join(' ')
      .toLowerCase()
      .replace(/\W|[0-9]|_/g, '')

    if (text.length > 20) {
      message.reply('You cannot reply with more than 20 emojis')
      return
    }

    switch (args[1].split('=')[0]) {
      case 'id':
        message.channel.messages.fetch(args[1].split('=')[1]).then(message => {
          for (const i in text) message.react(emojiMap[text.charAt(i)])
        })
        break
    }
  }
}
