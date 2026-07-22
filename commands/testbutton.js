const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const commands = [];

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

const CLIENT_ID = "TU_APPLICATION_ID";
const GUILD_ID = "TU_SERVER_ID";

(async () => {
    try {
        console.log("Registrando comandos...");

        await rest.put(
            Routes.applicationGuildCommands(
                CLIENT_ID,
                GUILD_ID
            ),
            { body: commands }
        );

        console.log("Comandos registrados correctamente ⚽");
    } catch (error) {
        console.error(error);
    }
})();
