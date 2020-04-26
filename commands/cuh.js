module.exports = {
  name: 'cuh',
  description: 'Sends the cuhlacios bot profile picture.',
  execute (message, args) {
    message.channel.send({
      files: ['./images/on_my_momma_cuh.jpg']
    })
  }
}
