const Discord = require("discord.js")


module.exports = {
    name: "limpardm",
    description: `[EVERYONE] limpe a DM com o bot`,
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        const dm = await interaction.member.createDM();
        await interaction.reply({ephemeral: true, embeds: [ new Discord.EmbedBuilder()
            .setDescription(`Estou limpando a nossa \`DM\`, ${interaction.user} aguarde um pouco em quanto eu á limpo.`)
            .setColor("Random")]})
            
            setTimeout(() => {
                interaction.editReply({ephemeral: true, embeds: [
                    new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setDescription(`<a:Loading:964975104163446856> | **Limpando nossa DM..**`)
                ]})
            }, 1000)
            setTimeout(() => {
                interaction.editReply({ephemeral: true, embeds: [
                    new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setDescription(`<a:Loading:964975104163446856> | **Limpando nossa DM...**`)
                ]})
            }, 2000)
            setTimeout(() => {
                interaction.editReply({ephemeral: true, embeds: [
                    new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setDescription(`<a:Loading:964975104163446856> | **Limpando nossa DM..**`)
                ]})
            }, 3000)
            setTimeout(() => {
              interaction.editReply({ephemeral: true, embeds: [
                new Discord.EmbedBuilder()
                  .setColor("Random")
                  .setDescription(`<a:Loading:964975104163446856> | **Limpando nossa DM...**`)
              ]})
          }, 4000)
          setTimeout(() => {
            interaction.editReply({ephemeral: true, embeds: [
                new Discord.EmbedBuilder()
                .setColor("Random")
                .setDescription(`<a:Loading:964975104163446856> | **Limpando nossa DM..**`)
            ]})
        }, 5000)
        setTimeout(() => {
          interaction.editReply({ephemeral: true, embeds: [
            new Discord.EmbedBuilder()
              .setColor("Random")
              .setDescription(`<a:Loading:964975104163446856> | **Limpando nossa DM...**`)
          ]})
      }, 6000)
        setTimeout(() => {
            interaction.editReply({
                ephemeral: true,
                embeds: [ 
                new Discord.EmbedBuilder()
                .setDescription(`<a:Verify:955208590170415155> | Prontinho, ${interaction.user} nossa DM foi limpada com sucesso!`)
                .setColor(`Random`)]
            })}, 8000)
        const deleteMessages = await client.channels.cache
            .get(dm.id)
            .messages.fetch({ limit: 100 });
        await deleteMessages.map((msg) => {
            if (msg.author.bot) {
                msg.delete();
            }
        });
    }
}