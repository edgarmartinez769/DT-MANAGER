const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "interactionCreate",

    async execute(interaction) {

        if (!interaction.isButton()) return;


        // Botón de prueba
        if (interaction.customId === "test_button") {

            await interaction.reply({
                content: "🔥 ¡Botón funcionando correctamente!",
                ephemeral: true
            });

            return;
        }


        // Selección de formato
        if (interaction.customId.startsWith("match_")) {

            const format = interaction.customId.replace("match_", "");

            let formations = [];


            if (format === "5v5") {
                formations = [
                    "🔷 2-1-1",
                    "⚡ 1-2-1",
                    "🛡️ 2-2"
                ];
            }


            if (format === "6v6") {
                formations = [
                    "🛡️ 2-2-1",
                    "⚔️ 3-1-1",
                    "⚡ 2-1-2"
                ];
            }


            if (format === "7v7") {
                formations = [
                    "🛡️ 2-3-1",
                    "⚔️ 3-2-1",
                    "🔷 2-2-2",
                    "⚡ 1-3-2"
                ];
            }


            if (format === "8v8") {
                formations = [
                    "🛡️ 3-3-1",
                    "⚔️ 3-2-2",
                    "🔥 2-3-2"
                ];
            }


            const formationButtons = new ActionRowBuilder();

            formations.forEach((formation, index) => {

                formationButtons.addComponents(
                    new ButtonBuilder()
                        .setCustomId(`formation_${format}_${index}`)
                        .setLabel(formation)
                        .setStyle(ButtonStyle.Secondary)
                );

            });


            await interaction.update({

                content:
                    `⚽ **DT MANAGER**\n\n` +
                    `Formato seleccionado: **${format}**\n\n` +
                    `📐 Selecciona una formación:`,

                components: [formationButtons]

            });

        }

    },
};
