const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const fs = require("fs");
const mongoose = require("mongoose");

mongoose.connect("your-connection-string", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("Connected to MongoDB"))

bot.commands = new Discord.Collection();

const jsFiles = fs.readdirSync("./commands/").filter(f => f.endsWith(".js"));

for (const file of jsFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on('ready', () => {
    console.log("Bot online!")
})

bot.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.channel.type === "dm" || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if (!bot.commands.has(cmd)) return;
    
    try {
        bot.commands.get(cmd).run(bot, message, args);
    } catch (error) {
        message.channel.send("Something went wrong when running that command.");
        console.error(error);
    }
})
bot.login(config.token);