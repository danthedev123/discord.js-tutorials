const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");

bot.on('ready', () => {
    console.log("Bot online!");
});

bot.login(config.token);