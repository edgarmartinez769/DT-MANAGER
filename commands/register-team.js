const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const teams = require("../data/teams");

module.exports = {

    data: new SlashCommandBuilder()

        .setName("register-team")

        .setDescription("Registra un equipo en DT Manager")

        .addStringOption(option =>
            option
                .setName("nombre")
                .setDescription("Nombre del equipo")
                .setRequired(true)
        ),


    async execute(interaction) {

        const name = interaction.options.getString("nombre");

        const guildId = interaction.guild.id;


        if (teams.has(guildId)) {

            return interaction.reply({

                content: "❌ Este servidor ya tiene un equipo registrado.",

                ephemeral: true

            });

        }


        teams.set(guildId, {

            name: name,

            owner: interaction.user.id,

            players: []

        });


        const embed = new EmbedBuilder()

            .setTitle("⚽ Equipo registrado")

            .setDescription(
                `🏳️ **Equipo:** ${name}\n\n` +
                `👑 **DT:** ${interaction.user}\n\n` +
                `✅ Tactify está listo para organizar tu equipo.`
            )

            .setFooter({

                text: "Tactify • 66luxe"

            });


        await interaction.reply({

            embeds: [embed]

        });

    }

};
