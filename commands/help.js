const fs = require('fs')

module.exports = {
  name: 'help',
  description: 'Sends a description of every command.',
  execute (message, args) {
    let helpMessage = 'Commands:\n'
    const commandFiles = fs
      .readdirSync('commands/')
      .filter((file) => file.endsWith('.js'))
    for (const file of commandFiles) {
      const command = require(`./${file}`)
      helpMessage += `'!${command.name}': ${command.description}\n`
      if (command.name === 'help' || command.name === 'random') {
        message.channel.send(helpMessage)
        helpMessage = `'${process.env.prefix}${command.name}': ${command.description}\n`
      }
    }
    message.channel.send(helpMessage)
  }
}
