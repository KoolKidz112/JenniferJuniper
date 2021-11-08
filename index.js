// Start farting
const { Client, Intents, WebhookClient } = require('discord.js');
const { token } = require('./config.json');
require("dotenv").config();

// Wowza
const client = new Client({ intents: [Intents.FLAGS.GUILDS], disableEveryone: false });
const prefix = process.env.PREFIX;
const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_ID });

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
    const rand = Math.round(Math.random());
    const option = getIntOption(interaction)
    // console.log(option);
    await interaction.reply(`<@${option.name === "user" ? '!' : '&'}${option.value}> has ${rand ? "TESTICLES. Good Job. We're done here." : "NO TESTICLES! NO PENIS! NO BALLS! THEY ARE A  MOTHER    FUCKING KLUTZ!! Sorry I Dont make the rules around here."}`);
    await interaction.followUp({"content":"sorry dont know how to mention roles","ephemeral":"true"})
  } else if (interaction.commandName === "banme") {
    const user = interaction.member;
    const option = getIntOption(interaction)
    console.log(option ? option.value : false);
    user.send("Hi you are going to get kicked/baned if you wanna come back you can always rejoin with https://discord.gg/Zzw7rVhPXV (if yuo are Ip Baned ask the admins to get you back in)")
    await interaction.reply("Goodbye");
    if (option ? !option.value : false) { // WHY IS OPTION.VALUE NOT FALSE WHEN IT'S UNDEFINED YOU DAFT CUNT
        user.ban({"reason":"Ip Baned by Jennifer Juniper (/banme)"}).catch(error => {
          if (error.code === 50013) { interaction.followUp("Sory I don have permison to do this (Check to see if you are higher rank than me in the server becuz you cannot run this on owners)") }
        });
    } else {
        user.kick("Kicked by Jennifer Juniper").catch(error => {
          if (error.code === 50013) { interaction.followUp("Sory I don have permison to do this (Check to see if you are higher rank than me in the server becuz you cannot run this on owners)") }
        });
    }
  } else if (interaction.commandName === "helpme") {
    interaction.reply({"content":"Jennifer Juniper is right around the corner. And with that, sus. This BOT Runs OFF OF Slash Comansd. Just Press / on yor keyboard and all the commands along with descriptions Will Display.","ephemeral":"true","files":["https://media.discordapp.net/attachments/862154953295396884/906768994999107625/bunny.gif"]})
  } else if (interaction.commandName === "say") {
    const text = getIntOption(interaction);
    console.log(text.value);
    await interaction.reply(text.value);
  } else if (interaction.commandName === "webhooksend") {
    const cont = getIntOption(interaction,0).value;
    const usern = getIntOption(interaction,1) ? getIntOption(interaction,1).value : "Jennifer Juniper";
    const avatar = getIntOption(interaction, 2) ? (getIntOption(interaction, 2).value) : "https://images-ext-1.discordapp.net/external/A2wjggCFcu0g2vBts4wqO71sJ37xB43smDdDQE5GLHQ/https/media.discordapp.net/attachments/906768055311401013/907354948415651920/bunny.gif?width=94&height=94";
    // console.log(cont,usern,avatar)
    console.log(interaction.options._hoistedOptions)
    await webhookClient.send({
      content: cont,
      username: usern,
      avatarURL: avatar,
      // embeds: [embed], TODO Add later
    }).then(interaction.reply({"content":"successfuly sent your message","ephemeral":"true"}))
  }
});

// Login to Discord with your client's token
client.login(token);

const getIntOption = (interaction, id=0) => interaction.options._hoistedOptions[id];

function isValidUrl(_string) {
  const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return matchpattern.test(_string);
}