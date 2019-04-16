const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.first() || message.guild.member.get(args[0]));
    if (!rUser)
    {
        return message.channel.send("cant");
        let rreason = args.join(" ".slice(22));
        let reportEmbed = new Discord.RichEmbed()
            .addField("lol", "sex");

        let reportschannel = message.guild.channels.find(`name`, "reports");

        if (!reportschannel)
        {
            return message.channel.send("ass nigga")
        }
        message.delete().catch(O_o => {});
        reportschannel.send("")
    }
}

module.exports.help = {
    name: "report"
}