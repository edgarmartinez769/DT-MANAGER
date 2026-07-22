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

        }


        // Formatos de partido
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


            await interaction.update({
                content:
                    `⚽ **DT MANAGER**\n\n` +
                    `Formato seleccionado: **${format}**\n\n` +
                    `📐 Selecciona una formación:\n\n` +
                    formations.join("\n"),
                components: []
            });

        }
    },
};
