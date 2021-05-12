module.exports = {
    name: "kick",
    description: "Kicks a member",
    run(bot, message, args) {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have kick member permissions.");
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I do not have kick members permission.");

        let target = message.mentions.members.first();
        if (!target) return message.channel.send("You did not ping a member to kick!");
        let reason = args.slice(1).join(" ");
        if (!reason) return message.channel.send("You did not specify a reason!");

        target.kick({
            reason: reason
        });
        message.channel.send(`Kicked ${target.user.tag} for ${reason}`);
    }
}