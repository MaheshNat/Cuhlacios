module.exports = {
    name: 'rutvij',
    description: 'Sends a spicy picture of rutvij threatening to delete your life if you delete his arabic.',
    execute(message, args) {
      message.channel.send({
        files: ['./images/rutvij/rutvij_1.png']
      });
      message.delete();
    }
  };
  