const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("match")
        .setDescription("Crea un nuevo partido de LPMX"),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle("⚽ Tactify")
            .setDescription(
                "🏟️ **CREACIÓN DE PARTIDO**\n\n" +
                "Selecciona el formato del encuentro:\n\n" +
                "👥 Cada formato tendrá sus propias formaciones y posiciones."
            )
            .addFields(
                {
                    name: "📋 Estado",
                    value: "🟢 Configurando partido",
                    inline: true
                },
                {
                    name: "👔 Organizador",
                    value: `${interaction.user}`,
                    inline: true
                },
                {
                    name: "⭐ Creado por",
                    value: "66luxe",
                    inline: true
                }
            )
            .setFooter({
                text: "Tactify • LPMX • Creado por 66luxe"
            });

        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("match_5v5")
                    .setLabel("⚽ 5v5")
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setCustomId("match_6v6")
                    .setLabel("⚽ 6v6")
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setCustomId("match_7v7")
                    .setLabel("⚽ 7v7")
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId("match_8v8")
                    .setLabel("⚽ 8v8")
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setCustomId("match_9v9")
                    .setLabel("⚽ 9v9")
                    .setStyle(ButtonStyle.Primary)
            );

        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("match_10v10")
                    .setLabel("⚽ 10v10")
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId("match_11v11")
                    .setLabel("⚽ 11v11")
                    .setStyle(ButtonStyle.Danger)
            );

        await interaction.reply({
            embeds: [embed],
            components: [row1, row2]
        });
    },
};
