module.exports = {
  name: 'poll',
  description: 'Creates a poll based on the text which follows the command',
  execute (message, args) {
    const poll = args.slice(1, args.length).join(' ')
    message.channel.send(poll).then(messageReaction => {
      messageReaction.react('👍')
      messageReaction.react('👎')
    })
  }
}
