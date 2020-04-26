module.exports = {
  name: 'delete',
  description: 'Deletes a message sent by the bot with a specific id',
  execute (message, args) {
    switch (args[1].split('=')[0]) {
      case 'id':
        message.channel.messages.fetch(args[1].split('=')[1]).then(message => {
          if (message.author.bot) {
            message.delete()
          } else {
            message.reply(
              "Only messages sent by cuhlacios can be deleted using the 'delete' command"
            )
          }
        })
        break
    }
  }
}
