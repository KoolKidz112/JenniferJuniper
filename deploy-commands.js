const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("./config.json");

const commands = [
  new SlashCommandBuilder()
    .setName("mynuts")
    .setDescription("Find the testicles .")
    .addUserOption(
      (
        option // change to menitonable
      ) =>
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
  new SlashCommandBuilder()
    .setName("say")
    .setDescription("make jenifer say ANYTHINg ....")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("what you want jenifer junipir to say")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("webhooksend")
    .setDescription("send data tnhrough the jeifer webhook")
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription(
          "the text (can include mentions, links, videos, but not attachments and embeds)"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription("the username")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("avatar")
        .setDescription("the url leading to the avatar image")
        .setRequired(false)
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Good"))
  .catch(console.error);
