const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Comprueba si Tactify funciona"),

    async execute(interaction) {
        await interaction.reply("🏓 Pong!\nDT Manager está funcionando ⚽");
    },
};
