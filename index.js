// discording the javascription
const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");

// new cleint
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// run this once when the client is ready
client.once("ready", () => {
  console.log("A new age of darkness and despair befalls this server");
});

// login
client.login(token);
