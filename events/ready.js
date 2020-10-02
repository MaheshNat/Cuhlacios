module.exports = async client => {
  client.logger.ready('Ready!');
  client.user.setActivity("nothing. I'm a bot. I can't play anything");
};
