const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.commands = new Collection();

const pingCommand = require("./commands/ping.js");
client.commands.set(pingCommand.data.name, pingCommand);

client.once("ready", () => {
  console.log(`DT Manager conectado como ${client.user.tag} ⚽`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.TOKEN);
