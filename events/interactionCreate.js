module.exports = {
    name: "interactionCreate",

    async execute(interaction) {

        if (!interaction.isButton()) return;

        if (interaction.customId === "test_button") {
            await interaction.reply({
                content: "🔥 ¡Botón funcionando correctamente!",
                ephemeral: true
            });
        }
    },
};
