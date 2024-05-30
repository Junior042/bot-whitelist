const Discord = require("discord.js");
const { JsonDatabase } = require("wio.db");
const db3 = new JsonDatabase({ databasePath: "./databases/myJsonWhitelist.json" });

module.exports = {
  name: "whitelist",
  description: "[ADM] envie o painel WL",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "canal",
      description: "Selecione um canal onde será enviado a embed",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
    },
    {
      name: "cargo",
      description: "Selecione um cargo de whitelist",
      type: Discord.ApplicationCommandOptionType.Role,
      required: true,
    },
    {
      name: 'cor',
      description: 'Especifique a cor da embed de whitelist (código hexadecimal).',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "channellogs",
      description: "Selecione o canal de logs de aprovados",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: `${interaction.user} | Você não possui permissão para usar este comando!`,
        ephemeral: true,
      });
    }

    const canal = interaction.options.getChannel("canal");
    const cargo = interaction.options.getRole("cargo");
    const channelLogsId = interaction.options.getChannel("channellogs");
    const cor = interaction.options.getString('cor');

    if (canal.type !== Discord.ChannelType.GuildText) {
      return interaction.reply({
        content: `${interaction.user} | Selecione um canal de texto!`,
        ephemeral: true,
      });
    }

    // Armazene os valores no banco de dados
    db3.set('whitelistConfig', {
      canalId: canal.id,
      cargoId: cargo.id,
      channelLogsId: channelLogsId.id,
      corembed: cor,
    });

    let emb_eph1 = new Discord.EmbedBuilder()
    .setColor(cor)
    .setDescription(`**Sistema ativado com sucesso!**\n\n**Canal selecionado:** ${canal}\n**Tipo de sistema:** \`Whitelist\``)
    .setFooter({ text: `COPYRYGHT© ${interaction.guild.name} TODOS DIREITOS RESERVADOS` })

    const emb_wl = new Discord.EmbedBuilder()
    .setColor(cor)
    .setTitle(`WHITELIST | ${interaction.guild.name} `)
    .setDescription(`**Instruções para realizar Whitelist:**\n \`\`\`1. Conecte-se no SERVIDOR e copie o id que recebeu.\n2. Click no BOTÃO abaixo.\n3. Basta enviar ID e NOME DO PERSONAGEM e pronto!\`\`\``)
    .setFooter({ text: `COPYRYGHT© ${interaction.guild.name} TODOS DIREITOS RESERVADOS` })

    const botao_wl = new Discord.ActionRowBuilder()
    .addComponents([
        new Discord.ButtonBuilder()
        .setCustomId('wl1')
        .setLabel('Iniciar')
        .setEmoji('<a:Verify:955208590170415155>')
        .setStyle(Discord.ButtonStyle.Success)
    ])

    interaction.reply({ embeds: [emb_eph1], ephemeral: true }).then( () => {
        canal.send({ embeds: [emb_wl], components: [botao_wl] })
    })

  }
} 