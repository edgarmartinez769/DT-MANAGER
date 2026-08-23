const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const formations = require("../formations/formations");
const matches = require("../data/matches");

module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        if (!interaction.isButton()) return;

        // 1. Seleccionar formato
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
                    `⚽ **Tactify**\n\n` +
                    `Formato seleccionado: **${format}**\n\n` +
                    `📐 Selecciona una formación:`,
                components: [row]
            });
            return;
        }

        // 2. Crear partido
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
                    `${getStatus(match)}\n\n` +
                    `👥 Jugadores:\n\n` +
                    createPlayerList(match),
                components: createButtons(matchId, match)
            });
            return;
        }

        // 3. Entrar a posición (Por índice de botón único)
        if (interaction.customId.startsWith("join_")) {
            const data = interaction.customId.split("_");
            const matchId = data[1];
            const positionIndex = Number(data[2]);

            const match = matches.get(matchId);
            if (!match) return;

            if (match.players[positionIndex]) {
                return interaction.reply({
                    content: "❌ Esa posición ya está ocupada.",
                    ephemeral: true
                });
            }

            if (Object.values(match.players).includes(interaction.user.username)) {
                return interaction.reply({
                    content: "❌ Ya estás dentro del partido.",
                    ephemeral: true
                });
            }

            match.players[positionIndex] = interaction.user.username;

            await interaction.update({
                content:
                    `⚽ **PARTIDO CREADO**\n\n` +
                    `👥 Formato: **${match.format}**\n` +
                    `📐 Formación: **${match.formation}**\n\n` +
                    `${getStatus(match)}\n\n` +
                    `👥 Jugadores:\n\n` +
                    createPlayerList(match),
                components: createButtons(matchId, match)
            });
            return;
        }

        // 4. Iniciar partido
        if (interaction.customId.startsWith("start_")) {
            const createLineupImage = require("../utils/lineupImage");
            const matchId = interaction.customId.replace("start_", "");
            const match = matches.get(matchId);

            if (!match) return;

            if (interaction.user.id !== match.creator) {
                return interaction.reply({
                    content: "❌ Solo el DT que creó el partido puede iniciarlo.",
                    ephemeral: true
                });
            }

            try {
                // Notificar respuesta en proceso para prevenir timeout
                await interaction.deferUpdate();

                const image = await createLineupImage(match);

                await interaction.editReply({
                    content:
                        `🚀 **PARTIDO INICIADO**\n\n` +
                        `⚽ Formación: **${match.formation}**\n\n` +
                        `👥 Alineación:`,
                    files: [
                        {
                            attachment: image,
                            name: "alineacion.png"
                        }
                    ],
                    components: []
                });
            } catch (error) {
                console.error("Error iniciando partido:", error);
                await interaction.followUp({
                    content: "❌ Ocurrió un error al generar la imagen.",
                    ephemeral: true
                });
            }
            return;
        }

        // 5. Salir del partido
        if (interaction.customId.startsWith("leave_")) {
            const matchId = interaction.customId.replace("leave_", "");
            const match = matches.get(matchId);

            if (match) {
                for (const idx in match.players) {
                    if (match.players[idx] === interaction.user.username) {
                        delete match.players[idx];
                    }
                }

                await interaction.update({
                    content:
                        `⚽ **PARTIDO CREADO**\n\n` +
                        `👥 Formato: **${match.format}**\n` +
                        `📐 Formación: **${match.formation}**\n\n` +
                        `${getStatus(match)}\n\n` +
                        `👥 Jugadores:\n\n` +
                        createPlayerList(match),
                    components: createButtons(matchId, match)
                });
            }
        }
    }
};

function createPlayerList(match) {
    let text = "";

    match.positions.forEach((position, index) => {
        const player = match.players[index];
        text += `${position}: ${player || "Libre"}\n`;
    });

    return text;
}

function getStatus(match) {
    const count = Object.keys(match.players).length;

    if (count === match.positions.length) {
        return "🟢 **EQUIPO COMPLETO**\n\n[Listo para iniciar]";
    }

    return `🟡 Buscando jugadores (${count}/${match.positions.length})`;
}

function createButtons(matchId, match) {
    const rows = [];
    let row = new ActionRowBuilder();

    match.positions.forEach((position, index) => {
        const isTaken = !!match.players[index];

        row.addComponents(
            new ButtonBuilder()
                .setCustomId(`join_${matchId}_${index}`)
                .setLabel(position)
                .setStyle(isTaken ? ButtonStyle.Secondary : ButtonStyle.Success)
                .setDisabled(isTaken)
        );

        if (row.components.length === 5) {
            rows.push(row);
            row = new ActionRowBuilder();
        }
    });

    if (row.components.length > 0) rows.push(row);

    const extra = new ActionRowBuilder();

    extra.addComponents(
        new ButtonBuilder()
            .setCustomId(`leave_${matchId}`)
            .setLabel("🚪 Salir")
            .setStyle(ButtonStyle.Danger)
    );

    if (Object.keys(match.players).length === match.positions.length) {
        extra.addComponents(
            new ButtonBuilder()
                .setCustomId(`start_${matchId}`)
                .setLabel("🚀 Iniciar partido")
                .setStyle(ButtonStyle.Primary)
        );
    }

    rows.push(extra);
    return rows;
}
