const { Client, RichEmbed } = require("discord.js");
const { prefix, varenaSecret } = require("./config");

const client = new Client();

const isDigitOnly = val => {
  return /^\d+$/.test(val);
};

const correctGameID = val => {
  return /^\d+$/.test(val) && val.length === 10;
};

client.on("message", msg => {
  // if (
  //   (msg.content.toLowerCase().includes("ban") ||
  //     msg.content.toLowerCase().includes("dodge") ||
  //     msg.content.toLowerCase().includes("dodger") ||
  //     msg.content.toLowerCase().includes("fuck") ||
  //     msg.content.toLowerCase().includes("fucking") ||
  //     msg.content.toLowerCase().includes("take action") ||
  //     msg.content.toLowerCase().includes("take actions") ||
  //     msg.mentions.users.array().some(i => i.id === "359542633238102017") ||
  //     msg.mentions.users.array().some(i => i.id === "456343396743774218") ||
  //     msg.mentions.users.array().some(i => i.id === "553086998760521769") ||
  //     msg.mentions.users.array().some(i => i.id === "359891075688693761") ||
  //     msg.mentions.users.array().some(i => i.id === "382710538884481036") ||
  //     msg.mentions.users.array().some(i => i.id === "556021383620984832")) &&
  //   !msg.author.bot
  // ) {
  //   msg.reply(
  //     `do you want to report someone or something? Type **${prefix}help** for more info!`
  //   );
  // }
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const attachments = msg.attachments.array();
  const attachmentNotExist = attachments.length < 1;
  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  const [type, steamID, gameID, ...description] = args;
  if (command === "foo") {
    msg.channel.send("bar!");
  } else if (command === "report") {
    if (type === "player" || type === "gameplay") {
      if (
        isDigitOnly(steamID) &&
        correctGameID(gameID) &&
        !attachmentNotExist
      ) {
        const attachmentArr = [];
        attachments.forEach(i => {
          attachmentArr.push(i.url);
        });
        const embedMsg = new RichEmbed()
          .setTitle(type.charAt(0).toUpperCase() + type.slice(1))
          .setColor(type === "player" ? 0xff0000 : 0x00ff00)
          .setAuthor(msg.author.username, msg.author.avatarURL)
          .addField("SteamID", `https://steamidfinder.com/lookup/${steamID}/`)
          .addField("DotaBuff", `https://dotabuff.com/matches/${gameID}`)
          .addField("Description", description.join(" "))
          .attachFiles(attachmentArr)
          .setTimestamp();
        client.channels.get("556416956346138624").send(embedMsg);
        msg.reply(
          "your report has been recorded. On duty admin will take necessary action ASAP"
        );
        msg.delete();
      } else if (!isDigitOnly(steamID) || !correctGameID(gameID)) {
        msg.reply(
          `Please check your format. Type **${prefix}help** for more info.`
        );
        msg.channel.send(
          `${prefix}report <player|gameplay|dodge|dodger> <DotA2 ID> <10-digits Match ID (Put "1" for dodger report)> <Description> & Upload your **proof** with the command`
        );
      } else if (attachmentNotExist) {
        msg.reply(
          `Please upload proof with your report. Type **${prefix}help** for more info.`
        );
      }
    } else if (type === "dodge" || type === "dodger") {
      if (isDigitOnly(steamID) && !attachmentNotExist) {
        const attachmentArr = [];
        attachments.forEach(i => {
          attachmentArr.push(i.url);
        });
        const embedMsg = new RichEmbed()
          .setTitle(type.charAt(0).toUpperCase() + type.slice(1))
          .setColor(0xffff00)
          .setAuthor(msg.author.username, msg.author.avatarURL)
          .addField("SteamID", `https://steamidfinder.com/lookup/${steamID}/`)
          .addField("Description", description.join(" "))
          .attachFiles(attachmentArr)
          .setTimestamp();
        client.channels.get("556645604986585102").send(embedMsg);
        msg.reply(
          "your report has been recorded. On duty admin will take necessary action ASAP"
        );
        msg.delete();
      } else if (!isDigitOnly(steamID) || !correctGameID(gameID)) {
        msg.reply(
          `Please check your format. Type **${prefix}help** for more info.`
        );
        msg.channel.send(
          `${prefix}report <player|gameplay|dodge|dodger> <DotA2 ID> <10-digits Match ID (Put "1" for dodger report)> <Description> & Upload your **proof** with the command`
        );
      } else if (attachmentNotExist) {
        msg.reply(
          `Please upload proof with your report. Type **${prefix}help** for more info.`
        );
      }
    } else {
      msg.channel.send(
        `Invalid report type. Please type **${prefix}help** for more info.`
      );
    }
  } else if (command === "help") {
    const embedMsg = new RichEmbed()
      .setTitle("VARENA Discord Bot Commands")
      .addField(
        `${prefix}report [type] [SteamID | Dota2ID] [10-digits Match ID (Put "1" for dodger report)] [description]`,
        "This command must come with attachment(s)"
      )
      .addBlankField()
      .addField(
        "Example 1",
        `${prefix}report player 86750253 4459706310 This fucking dummy, blocked my way to top1`
      )
      .addField(
        "Example 2",
        `${prefix}report dodge 86750253 1 This fucking dodger make me can't get top1`
      )
      .addBlankField()
      .addField("Supported type", "player | gameplay | dodge | dodger");
    msg.channel.send(embedMsg);
  } else if (command === "test") {

  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(varenaSecret);

module.exports = client;
