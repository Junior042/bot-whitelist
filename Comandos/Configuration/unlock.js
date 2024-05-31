const Discord = require("discord.js")

module.exports = {
    name: "unlock",
    description: "Use esse comando para abrir o chat", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, message, args) => {

        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            message.reply(`Você não possui a permissão \`Genrenciar Canais\` para poder uttilizar este comando.`)
        } else {

            let embed = new Discord.EmbedBuilder()
                .setTitle("\`🔓` Canal Destrancado")
                .setColor("#f5c800")
                .setDescription(`Este chat foi destrancado com sucesso por: ${message.member} `)

            message.reply({ embeds: [embed] }).then(msg => {
                message.channel.permissionOverwrites.edit(message.guild.id, { SendMessages: true }).catch(o => {
                    console.log(o)
                    msg.edit(`❌ Ops, algo deu errado ao tentar destrancar este chat.`)
                })
            })
    
                }
            }        
    }