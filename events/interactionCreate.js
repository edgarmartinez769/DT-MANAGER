const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const formations = require("../formations/formations");
const matches = require("../data/matches");


module.exports = {
    name: "interactionCreate",

    async execute(interaction) {

        if (!interaction.isButton()) return;



        // Elegir formato
        if (interaction.customId.startsWith("match_")) {

            const format = interaction.customId.replace("match_", "");

            const availableFormations = Object.keys(formations[format]);

            const row = new ActionRowBuilder();


            availableFormations.forEach((formation) => {

                row.addComponents(
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

                components: [row]

            });

            return;
        }



        // Crear partido
        if (interaction.customId.startsWith("formation_")) {


            const data = interaction.customId.split("_");


            const format = data[1];
            const formation = data[2];


            const positions = formations[format][formation];


            const matchId = Date.now().toString();



            const match = {

                creator: interaction.user.id,

                format,

                formation,

                positions,

                players: {}

            };


            matches.set(matchId, match);



            await interaction.update({

                content:
                    `⚽ **PARTIDO CREADO**\n\n` +
                    `👥 Formato: **${format}**\n` +
                    `📐 Formación: **${formation}**\n\n` +
                    `👥 Jugadores:\n\n` +
                    createPlayerList(match),

                components: createButtons(matchId, match.positions)

            });


            return;
        }




        // Entrar a posición
        if (interaction.customId.startsWith("join_")) {


            const data = interaction.customId.split("_");


            const matchId = data[1];
            const positionIndex = Number(data[2]);


            const match = matches.get(matchId);


            if (!match) {

                return interaction.reply({

                    content: "❌ Partido no encontrado.",

                    ephemeral: true

                });

            }



            const position = match.positions[positionIndex];



            if (match.players[position]) {

                return interaction.reply({

                    content: "❌ Esa posición ya está ocupada.",

                    ephemeral: true

                });

            }



            // Evitar que un jugador ocupe dos posiciones

            const alreadyJoined = Object.values(match.players)
                .includes(interaction.user.username);



            if (alreadyJoined) {

                return interaction.reply({

                    content: "❌ Ya estás dentro del partido.",

                    ephemeral: true

                });

            }



            match.players[position] = interaction.user.username;



            await interaction.update({

                content:
                    `⚽ **PARTIDO CREADO**\n\n` +
                    `👥 Formato: **${match.format}**\n` +
                    `📐 Formación: **${match.formation}**\n\n` +
                    `👥 Jugadores:\n\n` +
                    createPlayerList(match),

                components: createButtons(matchId, match.positions)

            });


            return;
        }




        // Salir del partido
        if (interaction.customId.startsWith("leave_")) {


            const matchId = interaction.customId.replace("leave_", "");


            const match = matches.get(matchId);


            if (!match) {

                return interaction.reply({

                    content: "❌ Partido no encontrado.",

                    ephemeral: true

                });

            }



            let removed = false;



            for (const position in match.players) {


                if (match.players[position] === interaction.user.username) {

                    delete match.players[position];

                    removed = true;

                }

            }



            if (!removed) {

                return interaction.reply({

                    content: "❌ No estás dentro del partido.",

                    ephemeral: true

                });

            }



            await interaction.update({

                content:
                    `⚽ **PARTIDO CREADO**\n\n` +
                    `👥 Formato: **${match.format}**\n` +
                    `📐 Formación: **${match.formation}**\n\n` +
                    `👥 Jugadores:\n\n` +
                    createPlayerList(match),

                components: createButtons(matchId, match.positions)

            });

        }

    }

};



function createPlayerList(match) {


    let text = "";


    match.positions.forEach((position) => {

        text += `${position}: ${match.players[position] || "Libre"}\n`;

    });


    return text;

}




function createButtons(matchId, positions) {


    const rows = [];

    let row = new ActionRowBuilder();



    positions.forEach((position, index) => {


        row.addComponents(

            new ButtonBuilder()

                .setCustomId(`join_${matchId}_${index}`)

                .setLabel(position)

                .setStyle(ButtonStyle.Success)

        );



        if (row.components.length === 5) {

            rows.push(row);

            row = new ActionRowBuilder();

        }

    });



    if (row.components.length > 0) {

        rows.push(row);

    }



    const leaveRow = new ActionRowBuilder();


    leaveRow.addComponents(

        new ButtonBuilder()

            .setCustomId(`leave_${matchId}`)

            .setLabel("🚪 Salir del partido")

            .setStyle(ButtonStyle.Danger)

    );


    rows.push(leaveRow);



    return rows;

}
