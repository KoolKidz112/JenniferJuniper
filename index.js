// Start farting
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
require("dotenv").config();

// Wowza
const client = new Client({ intents: [Intents.FLAGS.GUILDS], disableEveryone: false });
const prefix = process.env.PREFIX;

// Die
client.once('ready', () => {
	console.log('A new age of darkness and despair befalls this server');
  console.log('Prefix is '+prefix);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	
  // console.log(interaction);

  // if (interaction.commandName === "ping") {
  //   const everyone = await interaction.guild.defaultRole; // dunno how to do it within the message
  //   await interaction.reply(everyone+" hi there "+interaction.user.username+" wanted me to ping all of you");
  // }
  if (interaction.commandName === "mynuts") {
    // console.log(interaction.options);
    const rand = Math.round(Math.random());
    const option = interaction.options._hoistedOptions[0]
    await interaction.reply(`<@${option.name === "user" ? '!' : '&'}${option.value}> has ${rand ? "TESTICLES. Good Job. We're done here." : "NO TESTICLES! NO PENIS! NO BALLS! THEY ARE A  MOTHER    FUCKING KLUTZ!! Sorry I Dont make the rules around here."}`);
  }
});

// Login to Discord with your client's token
client.login(token);

