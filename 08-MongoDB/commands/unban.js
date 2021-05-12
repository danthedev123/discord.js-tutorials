module.exports = {
    name: "unban",
    description: "Unbans a member",
    run(bot, message, args) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have ban members permissions.");
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have ban members permissions.");

        let target = args[0];
        message.guild.members.unban(target);

        message.channel.send(`${target} has been unbanned!`);
    }
}