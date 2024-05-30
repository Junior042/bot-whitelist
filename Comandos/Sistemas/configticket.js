const Discord = require("discord.js");
const { JsonDatabase } = require("wio.db");

// Certifique-se de criar o objeto JsonDatabase com o caminho correto
const db1 = new JsonDatabase({ databasePath: "./databases/myJsonRegistro.json" });

module.exports = {
  name: 'configticket',
  description: 'Use esse comando para configurar as opções do ticket.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'imagem',
      description: 'Especifique a URL da imagem do ticket.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'titulo',
      description: 'Especifique o texto a ser exibido no ticket.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'mensagem',
      description: 'Especifique a mensagem a ser enviada ao criar um novo ticket.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'cor',
      description: 'Especifique a cor do ticket (código hexadecimal).',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
      interaction.reply({ content: `Você não tem permissão para utilizar este comando.`, ephemeral: true });
      return;
    }

    const imagem = interaction.options.getString('imagem');
    const texto = interaction.options.getString('titulo');
    const mensagem = interaction.options.getString('mensagem');
    const cor = interaction.options.getString('cor');


    db1.set('ticketConfig', { imagem, texto, mensagem, cor });

    interaction.reply({ content: `✅ | Configurações do ticket salvas com sucesso!`, ephemeral: true });
  },
};