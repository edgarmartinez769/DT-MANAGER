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



        // Elegir formato
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



        // Elegir formación y crear partido
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



            const positionRows = [];

            let row = new ActionRowBuilder();



            positions.forEach((position, index) => {

                row.addComponents(

                    new ButtonBuilder()
                        .setCustomId(`join_${matchId}_${index}`)
                        .setLabel(position)
                        .setStyle(ButtonStyle.Success)

                );


                if (row.components.length === 5) {

                    positionRows.push(row);
                    row = new ActionRowBuilder();

                }

            });



            if (row.components.length > 0) {

                positionRows.push(row);

            }



            await interaction.update({

                content:
                    `⚽ **PARTIDO CREADO**\n\n` +
                    `👥 Formato: **${format}**\n` +
                    `📐 Formación: **${formation}**\n\n` +
                    `🟢 Estado: Buscando jugadores\n\n` +
                    `Selecciona tu posición:`,

                components: positionRows

            });


            return;
        }



        // Unirse a una posición
        if (interaction.customId.startsWith("join_")) {


            const data = interaction.customId.split("_");


            const matchId = data[1];
            const positionIndex = Number(data[2]);


            const match = matches.get(matchId);


            if (!match) {

                await interaction.reply({

                    content: "❌ Este partido ya no existe.",

                    ephemeral: true

                });

                return;
            }



            const position = match.positions[positionIndex];



            // Revisar si la posición ya está ocupada

            if (match.players[position]) {

                await interaction.reply({

                    content: "❌ Esa posición ya está ocupada.",

                    ephemeral: true

                });

                return;

            }



            // Guardar jugador

            match.players[position] = interaction.user.username;



            let playerList = "";


            match.positions.forEach((pos) => {

                playerList += `\n${pos}: ${match.players[pos] || "Libre"}`;

            });



            await interaction.update({

                content:
                    `⚽ **PARTIDO CREADO**\n\n` +
                    `👥 Formato: **${match.format}**\n` +
                    `📐 Formación: **${match.formation}**\n\n` +
                    `👥 Jugadores:${playerList}`,

                components: []

            });

        }

    },
};
