const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "autoconnect",
  description: "Sistema de autoconnect",
  type: Discord.ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {
    try {
      if (
        !interaction.member.permissions.has(
          Discord.PermissionFlagsBits.Administrator
        )
      )
        return interaction.reply({
          content: "``🔮`` **Você não tem permições suficentes!**",
        });

      let embed_painel = new Discord.EmbedBuilder()
        .setColor("2f3136")
        .setAuthor({
          name: "Sistema de AutoConnect",
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setDescription(
          `**STATUS:**
          \`\`\`🟢Online\`\`\`
          **IP FIVEM:**
          \`\`\`connect 104.234.63.104\`\`\``
        )
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }));

      interaction.reply({ embeds: [embed_painel] });
    } catch (error) {
      console.log("[ERROR]:", error);
    }
  },
};
