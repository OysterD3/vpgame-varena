const Sentry = require("@sentry/node");
const Discord = require("discord.js");
const { prefix, secret } = require("./config");

const client = new Discord.Client();
Sentry.init({
  dsn: "https://8e6edbc0786740d89edb7ab0b5be7e6b@sentry.io/1416869"
});

// client.on("ready", () => {
//   console.log("I am ready!");
// });

client.on("message", msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command === "foo") {
    msg.channel.send("bar!");
  } else if (command === "report") {
    msg.channel.send(`Dear ${msg.author.username}, thanks for reporting`);
    msg.delete().then(() => {
      msg.channel.send("Your message has been deleted");
    });
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(secret);
