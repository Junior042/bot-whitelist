const { QuickDB } = require("quick.db");
const db = new QuickDB();
const Discord = require("discord.js");
const { JsonDatabase } = require("wio.db");
const db1 = new JsonDatabase({ databasePath: "./databases/myJsonRegistro.json" })
const db2 = new JsonDatabase({ databasePath: "./databases/myJsonConfig.json" })

module.exports = {
  name: 'configdb',
  description: 'Use esse comando para configurar a database.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'localhost',
      description: 'Especifique o localhost.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'usuario',
      description: 'Especifique o Usuário.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'password',
      description: 'Especifique a senha.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'namedb',
      description: 'Especifique o name da sua database.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
      interaction.reply({ content: `Você não tem permissão para utilizar este comando.`, ephemeral: true });
      return;
    }
  const localhostp1 = interaction.options.getString('localhost')
  await db.set(`localhostp1`, { prod: localhostp1 })
  var data_id2 = Math.floor(Math.random() * 999999999999999);
  db2.set(`${data_id2}.LocalHost`, `${localhostp1}`)

  const nameuserp1 = interaction.options.getString('usuario')
  await db.set(`nameuserp1`, { prod: nameuserp1 })
  var data_id3 = Math.floor(Math.random() * 999999999999999);
  db2.set(`${data_id3}.NameUser`, `${nameuserp1}`)

  const passwordp1 = interaction.options.getString('password')
  await db.set(`passwordp1`, { prod: passwordp1 })
  var data_id4 = Math.floor(Math.random() * 999999999999999);
  db2.set(`${data_id4}.PassWord`, `${passwordp1}`)

  const namedbp1 = interaction.options.getString('namedb')
  await db.set(`namedbp1`, { prod: namedbp1 })
  var data_id5 = Math.floor(Math.random() * 999999999999999);
  db2.set(`${data_id5}.NameDB`, `${namedbp1}`)

  interaction.reply({ content: `✅ | Configurações salvas com sucesso!`, ephemeral: true });
},
};