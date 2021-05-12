module.exports = {
    name: "test",
    description: "A test command",
    run(bot, message, args) {
        message.channel.send("Hello!");
    }
}