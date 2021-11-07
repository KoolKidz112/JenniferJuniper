module.exports = {
  name: "ping",
  description: "hello world",
  execute(message, args) {
    message.channel.send(
      "Jennifer is right around the corner. And with that, sus. " +
        message.author.username
    );
  },
};
