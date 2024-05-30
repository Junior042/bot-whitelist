const Discord = require("discord.js");
const { QuickDB } = require("quick.db");

module.exports = {
  name: "statusdb",
  description: "Envia o status da database",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
      interaction.reply({ content: `Você não tem permissão para utilizar este comando.`, ephemeral: true });
      return;
    }

    const db = new QuickDB();

    let statusMessage = "\n";
    const localhostDB = await db.get(`localhostp1.prod`);
    const nameuserDB = await db.get(`nameuserp1.prod`);
    const passwordDB = await db.get(`passwordp1.prod`);
    const namedbDB = await db.get(`namedbp1.prod`);

    statusMessage += `**localhost:** ${localhostDB ? `\n||\`${localhostDB}\`||` : "```Não configurado```"} \n`;
    statusMessage += `**Usuário:** ${nameuserDB ? `\n||\`${nameuserDB}\`||` : "```Não configurado```"}\n`;
    statusMessage += `**Password:** ${passwordDB ? `\n||\`${passwordDB}\`||` : "```Não configurado```"}\n`;
    statusMessage += `**NameDB:** ${namedbDB ? `\n||\`${namedbDB}\`||` : "```Não configurado```"}`;

    const embed = new Discord.EmbedBuilder()
      .setColor("#f5c800")
      .setTitle(":gear: | "+"__STATUS DO BANCO DE DADOS__")
      .setDescription(statusMessage);

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
