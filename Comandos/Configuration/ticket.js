const Discord = require("discord.js");
const { JsonDatabase } = require("wio.db");
const db1 = new JsonDatabase({ databasePath: "./databases/myJsonRegistro.json" });

module.exports = {
    name: "ticket",
    description: "[Configuração] Utilize para enviar uma embed para abrir um ticket",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return interaction.reply({
            content: `**❌ | ${interaction.user}, Você precisa da permissão \`ADMNISTRATOR\` para usar este comando!**`,
            ephemeral: true,
        });
        const ticketConfig = db1.get('ticketConfig') || {
            imagem: 'URL_DA_IMAGEM_PADRÃO',
            texto: 'TEXTO_PADRÃO',
            mensagem: 'MENSAGEM_PADRÃO',
            cor: 'COR_PADRÃO'
        };
        await interaction.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                    .setColor(ticketConfig.cor) 
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) }) 
                    .addFields(
                        { name: ticketConfig.texto, value: ticketConfig.mensagem },
                    )
                    .setImage(ticketConfig.imagem) 
                    .setFooter({ text: `${interaction.guild.name} - COPYRIGHT© TODOS DIREITOS RESERVADOS`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            ],
            components: [
                new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('start_ticket')
                            .setLabel('ABRIR TICKET')
                            .setStyle(1)
                    )
            ]
        });

        interaction.reply({content: `**✅ | Embed enviada com sucesso!**`,ephemeral: true,});
    }
}