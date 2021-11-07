// require the discord.js module
const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
require("dotenv").config(); // environment commands

// config
const { token } = require('./config.json');

// create a new Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
const prefix = process.env.PREFIX;

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('A new age of darkness and despair befalls this server');
  console.log('Prefix is '+prefix);
});

// login to Discord with your app's token
client.login(token);


// listen for messages and report them to the console
client.on('message', message => {
  console.log("DoDO Do Do DoDO")
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
	    command.execute(message, args);
    } catch (error) {
	    console.error(error);
	    message.reply('something went wrong');
    }
});

// client.on('message', async message => {
// 	if (!message.content.startsWith(prefix) || message.author.bot) return;

// 	const args = message.content.slice(prefix.length).trim().split(/ +/);
//     const commandName = args.shift().toLowerCase();

//     const command = client.commands.get(commandName);

//     if (!cooldowns.has(command.name)) {
//         cooldowns.set(command.name, new Collection());
//     }
    
//     const now = Date.now();
//     const timestamps = cooldowns.get(command.name);
//     const cooldownAmount = (command.cooldown || 3) * 1000;
    
//     if (timestamps.has(message.author.id)) {
//         const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
//         if (now < expirationTime) {
//             const timeLeft = (expirationTime - now) / 1000;
//             return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
//         }
//     }
// });