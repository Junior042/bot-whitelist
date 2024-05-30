const { QuickDB } = require("quick.db");
const db = new QuickDB();
const Discord = require("discord.js");
const { JsonDatabase } = require("wio.db");
const db1 = new JsonDatabase({ databasePath: "./databases/myJsonRegistro.json" })
const db2 = new JsonDatabase({ databasePath: "./databases/myJsonConfig.json" })

module.exports = {
  name: "limpardb",
  description: "Limpa os valores do banco de dados",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
      interaction.reply({ content: `Você não tem permissão para utilizar este comando.`, ephemeral: true });
      return;
    }
    
      await db.delete(`localhostp1.prod`);
      await db.delete(`nameuserp1.prod`);
      await db.delete(`passwordp1.prod`);
      await db.delete(`namedbp1.prod`);
      db2.deleteAll();
      db1.deleteAll();

    const authorName = interaction.user.tag;
    const authorName2 = interaction.user;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
    const logMessage = new Discord.EmbedBuilder()
      .setColor("#f5c800")
      .setTitle("Database Deletada") 
      .setDescription(`**DELETADO POR:** \`\`\`${authorName}\`\`\`${authorName2}\n\n**DATA:** \`\`\`${formattedDate} ás ${formattedTime}\`\`\``) 
      .setTimestamp(); 

    const logChannelId = "1165056008670949409"; 
    const logChannel = interaction.guild.channels.cache.get(logChannelId);

    if (logChannel) {
      logChannel.send({ embeds: [logMessage] });
    } else {
      console.error("Canal de registro não encontrado.");
    }
    await interaction.reply({ content: `✅ | Database limpa com sucesso! `, ephemeral: true });
  },
};
