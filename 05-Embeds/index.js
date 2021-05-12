const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');

bot.on('ready', () => {
    console.log("Bot online!")
})

bot.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.channel.type === "dm" || message.author.bot) return;

    let args = message.content.slice(config.prefix.length).trim().split(/ +/);
    let cmd = args.shift().toLowerCase();

    if (cmd === 'hello') {
        message.reply("Hello!");
    } else if (cmd === 'youtube') {
        message.channel.send("Subscribe to Daniel's Coding Hub!")
    } else if (cmd === "ban") {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have ban member permissions.");
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have ban members permission.");

        let target = message.mentions.members.first();
        if (!target) return message.channel.send("You did not ping a member to ban!");
        let reason = args[1];
        if (!reason) return message.channel.send("You did not specify a reason!");

        target.ban({
            reason: reason
        });
        message.channel.send(`Banned ${target.user.tag} for ${reason}`);
    } else if (cmd === "kick") {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have kick member permissions.");
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I do not have kick members permission.");

        let target = message.mentions.members.first();
        if (!target) return message.channel.send("You did not ping a member to kick!");
        let reason = args[1];
        if (!reason) return message.channel.send("You did not specify a reason!");

        target.kick({
            reason: reason
        });
        message.channel.send(`Kicked ${target.user.tag} for ${reason}`);
    } else if (cmd === "unban") {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have ban members permissions.");
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have ban members permissions.");

        let target = args[0];
        message.guild.members.unban(target);

        message.channel.send(`${target} has been unbanned!`);
    } else if (cmd === "embed") {
        const embed = new Discord.MessageEmbed()
            .setTitle("Hello world!")
            .setColor("BLUE")
            .setDescription("This is my description!")
            .addFields(
                { name: "This is some field", value: "Some text" },
                { name: "This is another field", value: "More text!" }
            )
            .setFooter("This is a footer.")
            .setTimestamp()

            message.channel.send(embed);
    }
})
bot.login(config.token);