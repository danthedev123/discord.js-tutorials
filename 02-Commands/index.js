const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");

bot.on('ready', () => {
    console.log("Bot online!");
});

bot.on("message", message => {
    if (!message.content.startsWith(config.prefix) || message.channel.type === "dm" || message.author.bot) return;

    let args = message.content.slice(config.prefix.length).trim().split(/ +/);
    let cmd = args.shift().toLowerCase();

    if (cmd === "hello") {
        message.reply("Hello!");
    } else if (cmd === "youtube") {
        message.channel.send("Subscribe to Daniel's Coding Hub!");
    }
});

bot.login(config.token);