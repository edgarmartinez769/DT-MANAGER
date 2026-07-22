const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Comprueba si DT Manager funciona"),

    async execute(interaction) {
        await interaction.reply("🏓 Pong!\nDT Manager está funcionando ⚽");
    },
};
