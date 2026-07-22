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

const CLIENT_ID = "1529338284273176576";

(async () => {
    try {
        console.log("Registrando comandos globales...");

        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands }
        );

        console.log("✅ Comandos globales registrados correctamente.");

    } catch (error) {
        console.error(error);
    }
})();
