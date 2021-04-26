module.exports = {
  name: 'stop',
  description: 'stops spaming.',
  async execute(message, args, client) {
    client.stopped = true;
    setTimeout(() => {
      client.stopped = false;
    }, 5000);
  },
};
