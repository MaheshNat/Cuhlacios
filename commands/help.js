const fs = require('fs');

module.exports = {
  name: 'help',
  description: 'Sends a description of every command.',
  execute(message, args) {
    let helpMessage = 'Commands:\n';
    const commandFiles = fs
      .readdirSync('commands/')
      .filter(file => file.endsWith('.js'));
    let i = 0;
    for (const file of commandFiles) {
      const command = require(`./${file}`);
      helpMessage += `'!${command.name}': ${command.description}\n`;
      if (i % 7 === 0) {
        message.channel.send(helpMessage);
        helpMessage = `'${process.env.PREFIX}${command.name}': ${command.description}\n`;
      }
      i++
    }
    message.channel.send(helpMessage);
  }
};
