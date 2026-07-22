const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: "ping",
        description: "Comprueba si DT Manager funciona",
    },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

const CLIENT_ID = "PON_AQUI_EL_ID_DE_TU_BOT";

const GUILD_ID = "PON_AQUI_EL_ID_DE_TU_SERVIDOR";

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
