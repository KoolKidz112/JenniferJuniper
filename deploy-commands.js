const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("./config.json");

const commands = [
  new SlashCommandBuilder()
    .setName("mynuts")
    .setDescription("Find the testicles .")
    .addMentionableOption((option) =>
      option
        .setName("user")
        .setDescription("User or role to check for testicles in")
        .setRequired(true)
    ),
  new SlashCommandBuilder().setName("cool").setDescription("Cool test"),
  new SlashCommandBuilder().setName("helpme").setDescription("Comamnds"),
  new SlashCommandBuilder()
    .setName("banme")
    .setDescription("bans you from the server")
    .addBooleanOption((option) =>
      option.setName("kick").setDescription("False bans you, true kicks you")
    ),
  //   new SlashCommandBuilder()
  //     .setName("ping")
  //     .setDescription("pings everyone")
  //     .addBooleanOption((option) =>
  //       option.setName("here").setDescription("set to true to use @here")
  //     ),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Good"))
  .catch(console.error);
