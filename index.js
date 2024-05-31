const Discord = require("discord.js");
const config = require("./config.json");
const { ActivityType } = require("discord.js");
const client = new Discord.Client({
  // intents: [3276799],
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
  ],
});

module.exports = client;

// const { QuickDB } = require("quick.db");
// const db = new QuickDB();
// const { JsonDatabase } = require("wio.db");
// // const db1 = new JsonDatabase({
// //   databasePath: "./databases/myJsonRegistro.json",
// // });

const mysql2 = require("mysql2/promise");

const db3 = new JsonDatabase({
  databasePath: "./databases/myJsonWhitelist.json",
});
client.on("interactionCreate", (interaction) => {
  if (interaction.type === Discord.InteractionType.ApplicationCommand) {
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.reply(`Error`);
    interaction["member"] = interaction.guild.members.cache.get(
      interaction.user.id
    );
    cmd.run(client, interaction);
  }
});

client.slashCommands = new Discord.Collection();

require("./handler/index.js")(client);

client.on("ready", async () => {
  console.clear();
  let ativy = [
      `⚜️| Vanguard RP`,
      // `🌐| Versão v${require('discord.js').version.slice(0, 6)}`,
      `👾| Dev by IMPERIUM STORE`,
    ],
    at = 0;
  await setInterval(
    () =>
      client.user.setPresence({
        activities: [
          {
            name: `${ativy[at++ % ativy.length]}`,
            type: ActivityType.Watching,
          },
        ],
        status: "dnd",
      }),
    1000 * 5
  );
  await console.log("\n[Info]: " + `✔️ BOT ON LINE ${client.user.username}`);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "wl1") {
      const userId = interaction.user.id;

      const modal100 = new Discord.ModalBuilder()
        .setCustomId("modal100")
        .setTitle(`${interaction.guild.name}`);

      const idjogo = new Discord.TextInputBuilder()
        .setCustomId("idjogo")
        .setLabel("Qual seu ID?")
        .setMaxLength(6)
        .setMinLength(1)
        .setPlaceholder("Informe seu id-game")
        .setStyle(Discord.TextInputStyle.Short);

      const nomeper = new Discord.TextInputBuilder()
        .setCustomId("nomeper")
        .setLabel("Qual nome do seu Personagem")
        .setMaxLength(20)
        .setMinLength(1)
        .setPlaceholder("Informe seu nome in-game")
        .setStyle(Discord.TextInputStyle.Short);

      const p1 = new Discord.ActionRowBuilder().addComponents(idjogo);
      const p2 = new Discord.ActionRowBuilder().addComponents(nomeper);
      modal100.addComponents(p1, p2);
      await interaction.showModal(modal100);
    }
  } else if (interaction.isModalSubmit()) {
    if (interaction.customId === "modal100") {
      const idJogo = interaction.fields.getTextInputValue("idjogo");
      const nomePersonagem = interaction.fields.getTextInputValue("nomeper");

      const member = interaction.member;

      if (config.hostdb && config.userdb && config.databasename) {
        try {
          const con = await mysql2.createPool({
            host: config.hostdb,
            user: config.userdb,
            password: config.passdb,
            database: config.databasename,
          });

          // Verificar se o ID já possui whitelist  ######## atenção aqui no nome da sua tabela do banco de dados whitelist ou whitelisted
          const [whitelistRows] = await con.execute(
            `SELECT whitelist FROM ${config.table_user_db} WHERE id = ?`,
            [idJogo]
          );
          const hasWhitelist =
            whitelistRows.length > 0 && whitelistRows[0].whitelist === 1;
          if (hasWhitelist) {
            interaction.reply({
              content: `O ID especificado já possui whitelist.`,
              ephemeral: true,
            });
            return;
          }

          const [idExistsRows] = await con.execute(
            `SELECT COUNT(*) AS count, discord FROM ${config.table_user_db} WHERE id = ?`,
            [idJogo]
          );

          const idExists = idExistsRows[0].count > 0;
          const discordInDatabase = idExistsRows[0].discord;
          if (
            discordInDatabase !== "0" &&
            discordInDatabase !== interaction.user.id
          ) {
            interaction.reply({
              content: `Você não pode liberar um ID que não é seu.`,
              ephemeral: true,
            });
            return;
          }

          if (!idExists) {
            interaction.reply({
              content: `O ID especificado não existe no nosso banco de dados.`,
              ephemeral: true,
            });
            return;
          }

          const sql = `UPDATE ${config.table_user_db} SET whitelist = 1, discord = ? WHERE id = ?`;
          await con.execute(sql, [interaction.user.id, idJogo]);
          const cargoAprovadoId = db3.get("whitelistConfig.cargoId");

          //#####################################################################################
          //ATENÇÃO AQUI PRECISA COLOCAR O CARGO QUE VAI SER REMOVIDO QUANDO O PLAYER FIZER A WL
          const cargoARemoverId = "";
          //#####################################################################################

          if (cargoAprovadoId) {
            if (member.roles.cache.has(cargoAprovadoId)) {
              await member.roles.remove(cargoAprovado);
              console.log("cargo removido");
            }
            const cargoAprovado =
              interaction.guild.roles.cache.get(cargoAprovadoId);

            if (cargoAprovado) {
              if (member.roles.cache.has(cargoARemoverId)) {
                await member.roles.remove(cargoARemoverId);
                console.log("cargo atualizado");
                interaction.reply({
                  content: `Você foi liberado para entrar no servidor!`,
                  ephemeral: true,
                });
              }
              await member.roles.add(cargoAprovado);
              const novoApelido = `${nomePersonagem} #${idJogo}`;
              await member.setNickname(novoApelido);
            } else {
              console.error(
                `Cargo aprovado com ID ${cargoAprovadoId} não encontrado.`
              );
            }
          } else {
            console.error(
              `ID do cargo aprovado não encontrado no banco de dados.`
            );
          }

          const emb_aprovado1 = new Discord.EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Nova Whitelist!")
            .setDescription(
              `**Discord:** ${interaction.user}\n**Cidadão:** \`\`\`${nomePersonagem}\`\`\` \n**ID:** \`\`\`${idJogo}\`\`\``
            )
            .setFooter({
              text: `COPYRYGHT© ${interaction.guild.name} TODOS DIREITOS RESERVADOS`,
            });
          const canalLogs = db3.get("whitelistConfig.channelLogsId");
          if (canalLogs) {
            const channelLogsId =
              interaction.guild.channels.cache.get(canalLogs);
            await channelLogsId.send({ embeds: [emb_aprovado1] });
          } else {
            console.error(
              `ID do canal de logs não encontrado no banco de dados.`
            );
          }

          interaction.reply({
            content: "Sua whitelist foi liberada!",
            ephemeral: true,
          });
          return;
        } catch (error) {
          console.log("[ERROR]: ", error);
          interaction.reply({
            content: `Ocorreu um erro ao atualizar a whitelist. Por favor, contate um administrador.`,
            ephemeral: true,
          });
        }
      } else {
        interaction.reply({
          content: `O banco de dados não foi configurado. Contate um administrador para obter assistência.`,
          ephemeral: true,
        });
      }
    }
  }
});

client.on("guildMemberRemove", async (member) => {
  const userId = member.user.id;

  if (config.hostdb && config.userdb && config.databasename) {
    try {
      const con = await mysql2.createPool({
        host: config.hostdb,
        user: config.userdb,
        password: config.passdb,
        database: config.databasename,
      });
      const [discordIdRows] = await con.execute(
        `SELECT discord FROM ${config.table_user_db} WHERE discord = ?`,
        [userId]
      );
      const discordId = discordIdRows[0].discord;

      //#####################################################################################
      //ATENÇÃO AQUI NO NOME DA TABELA DO SEU BANCO DE DADOS
      if (discordId) {
        const sql = `UPDATE ${config.table_user_db} SET whitelist = 0 WHERE discord = ?`;
        await con.execute(sql, [userId]);
      }
      //#####################################################################################
    } catch (error) {
      console.error(
        `Ocorreu um erro ao remover a whitelist do usuário: ${error}`
      );
    }
  }
});

//#####################################################################################
//Coloque o ID do canal onde você deseja enviar a embed de boas-vindas (165056008419278931) TEM QUE TROCAR ESSE NÚMERO PELO SEU
client.on("guildMemberAdd", (member) => {
  const channelId = config.canal_boasvindas;
  const channel = member.guild.channels.cache.get(channelId);
  if (!channel) return;
  const serverIconURL = member.guild.iconURL({
    format: "png",
    dynamic: true,
    size: 256,
  });
  const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: "NOVO VISITANTE", iconURL: serverIconURL })
    .setColor(0x8700ff)
    .setThumbnail(
      member.user.displayAvatarURL({ format: "png", dynamic: true, size: 256 })
    )
    .setDescription(
      `***Olá ${member.user} Seja Bem-Vindo ao Nosso Servidor!***\n
> Leia as **__REGRAS__**\n
> Faça sua **__WHITELIST__** e venha fazer sua própria historia...\n\n
**Agora somos ${member.guild.memberCount} moradores da Vanguard!**`
    )
    .setImage(serverIconURL)
    .setFooter({
      text: "COPYRIGHT© TODOS DIREITOS RESERVADOS",
      iconURL: serverIconURL,
    });
  //#####################################################################################
  //embed dos botoes de regras
  const button = new Discord.ButtonBuilder()
    .setLabel("📕 REGRAS")
    .setURL(config.url_canal_regras)
    .setStyle(Discord.ButtonStyle.Link);
  const button2 = new Discord.ButtonBuilder()
    .setLabel("🔰 WHITELIST")
    .setURL(config.url_canal_whitelist)
    .setStyle(Discord.ButtonStyle.Link);
  const row = new Discord.ActionRowBuilder().addComponents(button, button2);
  //#####################################################################################
  //cargo que o usuario vai receber ao entrar no discord
  channel.send({
    content: `||${member.user}||`,
    embeds: [embed],
    components: [row],
  });
  var role = member.guild.roles.cache.get(config.cargo_boasvindas);
  member.roles.add(role);
});

client.on("interactionCreate", require("./events/startTicket").execute);

process.on("uncaughtException", (err) => {
  console.error(`Erro não tratado: ${err}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(`Rejeição não tratada em promise: ${reason}`);
});

client.login(config.token);
process
  .on("uncaughtException", (err) => console.log(err))
  .on("unhandledRejection", (err) => console.log(err));
