module.exports = {
    name: "ban",
    description: "Bans a member.",
    run(bot, message, args) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have ban member permissions.");
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have ban members permission.");

        let target = message.mentions.members.first();
        if (!target) return message.channel.send("You did not ping a member to ban!");
        let reason = args.slice(1).join(" ");
        if (!reason) return message.channel.send("You did not specify a reason!");

        target.ban({
            reason: reason
        });
        message.channel.send(`Banned ${target.user.tag} for ${reason}`);
    }
}