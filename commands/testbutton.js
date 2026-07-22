const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("testbutton")
        .setDescription("Prueba los botones de Tactify"),

    async execute(interaction) {

        const button = new ButtonBuilder()
            .setCustomId("test_button")
            .setLabel("Presiona aquí ⚽")
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder()
            .addComponents(button);

        await interaction.reply({
            content: "Prueba de botones de Tactify 🔥",
            components: [row]
        });
    },
};
