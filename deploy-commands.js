const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: "ping",
        description: "Comprueba si DT Manager funciona",
    },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

const CLIENT_ID = "1529338284273176576";

const GUILD_ID = "1138329385955500072";

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
