const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("match")
        .setDescription("Crea un nuevo partido de LPMX"),

    async execute(interaction) {

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("match_5v5")
                    .setLabel("5v5")
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setCustomId("match_6v6")
                    .setLabel("6v6")
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setCustomId("match_7v7")
                    .setLabel("7v7")
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setCustomId("match_8v8")
                    .setLabel("8v8")
                    .setStyle(ButtonStyle.Primary)
            );

        await interaction.reply({
            content:
                "⚽ **DT Manager**\n\n" +
                "Crear nuevo partido\n\n" +
                "Selecciona el formato:",
            components: [buttons]
        });
    },
};
