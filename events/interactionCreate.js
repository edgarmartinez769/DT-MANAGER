const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const formations = require("../formations/formations");
const matches = require("../data/matches");


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

            const availableFormations = Object.keys(formations[format]);


            const buttons = new ActionRowBuilder();


            availableFormations.forEach((formation) => {

                buttons.addComponents(
                    new ButtonBuilder()
                        .setCustomId(`formation_${format}_${formation}`)
                        .setLabel(formation)
                        .setStyle(ButtonStyle.Secondary)
                );

            });


            await interaction.update({

                content:
                    `⚽ **DT MANAGER**\n\n` +
                    `Formato seleccionado: **${format}**\n\n` +
                    `📐 Selecciona una formación:`,

                components: [buttons]

            });

            return;
        }



        // Selección de formación
        if (interaction.customId.startsWith("formation_")) {


            const data = interaction.customId.split("_");


            const format = data[1];
            const formation = data[2];


            const positions = formations[format][formation];


            const matchId = Date.now().toString();



            matches.set(matchId, {

                creator: interaction.user.id,

                format,

                formation,

                positions,

                players: {}

            });



            await interaction.update({

                content:
                    `⚽ **PARTIDO CREADO**\n\n` +

                    `👥 Formato: **${format}**\n` +

                    `📐 Formación: **${formation}**\n\n` +

                    `🟢 Estado: Buscando jugadores\n\n` +

                    `Posiciones disponibles:\n\n` +

                    positions.join("\n"),


                components: []

            });

        }

    },
};
