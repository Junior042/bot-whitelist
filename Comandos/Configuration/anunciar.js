const Discord = require("discord.js")

module.exports = {
  name: "anunciar", // Coloque o nome do comando
  description: "[💼 Administração] Anuncie algo", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "título",
        description: "Escreva algo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "descrição",
        description: "Escreva algo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "chat",
        description: "Mencione um canal.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    },
    {
        name: "cor",
        description: "Coloque uma cor em hexadecimal.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "imagem",
        description: "Coloque o link da imagem.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `\`❌\` Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        let titulo = interaction.options.getString("título")
        let desc = interaction.options.getString("descrição")
        let cor = interaction.options.getString("cor")
        let imagem = interaction.options.getString("imagem")
        if (!cor) cor = "#f5c800"
        let chat = interaction.options.getChannel("chat")
        if (Discord.ChannelType.GuildText !== chat.type) return interaction.reply(`\`❌\` Este canal não é um canal de texto para enviar uma mensagem.`)

        let embed = new Discord.EmbedBuilder()
        .setTitle(titulo)
        .setDescription(desc)
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true })})
        .setTimestamp()
        .setImage(imagem)
        .setColor(cor);

        chat.send({ embeds: [embed] }).then( () => { 
            interaction.reply(`\`✅\` Seu anúncio foi enviado em ${chat} com sucesso.`)
        }).catch( (e) => {
            interaction.reply(`\`❌\` Algo deu errado.`)
        })
    }

  }
}