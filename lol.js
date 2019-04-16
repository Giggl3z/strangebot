const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");



function randint(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min));
  }

let levelUp = 0;
let totalPoints = 0;
let prefix = ".s ";

bot.on("ready", () => {
    console.log("Ready");
    bot.user.setActivity("eleven in the ass");
});


// Welcomer
bot.on('guildMemberAdd', member => {
    if (member.guild.id == 566017621372436490)
    {
        let newMember = member.guild.channels.get('566387384925814785');
        const welcomeEmbed = new Discord.RichEmbed()
            .setColor(0xff0000)
            .setFooter(`${member.user.username}#${member.user.discriminator}`, member.user.avatarURL)
            .setThumbnail(member.user.avatarURL)
            .setTimestamp()
            .setImage('https://data.whicdn.com/images/306312379/large.png')
            .addField("StrangeBot", `Welcome,  <@${member.user.id}> to **${member.guild.name}**. Enjoy your stay.`)
    
        let sendmessage = member.guild.channels.get('566387384925814785');
        const embd = new Discord.RichEmbed()
            .setColor(0x00FF00)
            .setFooter(`${member.user.username}#${member.user.discriminator}`, member.user.avatarURL)
            .setTimestamp()
            .addField("Member Joined", `✅ Welcome,  <@${member.user.id}> to **${member.guild.name}**. Enjoy your stay.`)
    
        member.send(welcomeEmbed);
        sendmessage.send(embd);
    }
});

// Leave notif
bot.on('guildMemberRemove', member => {
    if (member.guild.id == 566017621372436490)
    {
        let newMember = member.guild.channels.get('567142423231201311');
        const welcomeEmbed = new Discord.RichEmbed()
            .setColor(0xff0000)
            .setAuthor("StrangeBot")
            .setFooter(`${member.user.username}#${member.user.discriminator}`, member.user.avatarURL)
            .setThumbnail("https://iconsplace.com/wp-content/uploads/_icons/ff0000/256/png/logout-icon-14-256.png")
            .setTimestamp()
            .addField("Member Left/Kicked", `Goodbye,  <@${member.user.id}>. Sad to see you leave.`)
    
        newMember.send(welcomeEmbed)
    }
});

bot.on("message", message => {

    if (message.author.id != bot.user.id)
    {
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);

        //console.log(levelUp);
        let strangePoint = randint(7, 13);
        levelUp += 1;

        if (levelUp == 20)
        {
            levelUp = 0;
            message.reply("you've been given " + strangePoint + " points, good work!");
            totalPoints += strangePoint;
        }

        if (message.content.startsWith(prefix + "purge"))
        {
            if (message.member.hasPermission("MANAGE_MESSAGES"))
            {
                try
                {
                    message.channel.bulkDelete(args[1]);
                    message.react(`***Deleted ${args[1]} messages.***`)
                }
                catch
                {
                    message.react("❌")
                }
            }
            else
            {
                message.react("❌")
            }
        }

        if (message.content.includes("eleven"))
        {
            message.channel.send("ELEVEN? where is she, please someone tell me where she is!");
        }

        if (message.content.includes("lol"))
        {
            message.channel.send("What's so funny, I don't find it funny ¯\\_(ツ)_/¯")
        }

        else if (message.content.includes("osint") || message.content.includes("osintsec") || message.content.includes("Osint") || message.content.includes("Osintsec"))
        {
            message.channel.send(`<@564474717747150858> ${message.author.username} is talking about you`);
        }

        else if (message.content.includes("thanks"))
        {
            message.channel.send("no problem ;)");
        }

        if (message.content == prefix + "ping")
        {
            message.channel.send("Pong! " + Math.round(bot.ping) + "ms");
            message.react("✅");
          }

        if (message.content.startsWith(prefix + "kick"))
        {
            if (message.member.hasPermission(["KICK_MEMBERS"]))
            {

                try
                {
                    var member = message.mentions.members.first();
                    member.kick().then((member) => {
                        message.react("✅");
                        // message.channel.send(`✅ ***${member.user.username}#${member.user.discriminator} has been kicked.***`);
                    }).catch(() => {
                        message.react("❌");
                        // message.channel.send("***ℹ️ Not enough permissions, maybe try giving me a higher role than the user you want to kick.***");
                    });
                }
                catch
                {
                    message.react("❓");
                }
                
            }
            else
            {
                message.react("❌");
                //message.channel.send("***❌ You do not have enough permissions to do that.***")
            }
        }


        if (message.content.startsWith(prefix + "ban"))
        {
            if (message.member.hasPermission(["BAN_MEMBERS"]))
            {
       
                try
                {
                    var member = message.mentions.members.first();
                    member.ban().then((member) => {
                        message.react("✅");
                        //message.channel.send(`✅ ***${member.user.username}#${member.user.discriminator} has been banned.***`);
                    }).catch(() => {
                        message.react("❌");
                        // message.channel.send("***ℹ️ Not enough permissions, maybe try giving me a higher role than the user you want to ban.***");
                    });
                }
                catch
                {
                    message.react("❓");
                }
                
            }
            else
            {
                message.react("❌");
                //message.channel.send("***❌ You do not have enough permissions to do that.***")
            }
        }

        if (message.content.includes(`<@${bot.user.id}>`))
        {
            message.channel.send(`<@${message.author.id}>`)
        }

        if (message == prefix + "points")
        {
            message.delete();
            //message.channel.send(`**Total Strange Points** for <@${message.author.id}> is \`${totalPoints}\``);
            const embed = new Discord.RichEmbed()
                .setColor(0xff0000)
                .setThumbnail("https://cdn.discordapp.com/attachments/564605033367339027/566516577176911882/unknown.png")
                .setTitle(`StrangeBot`)
                .addField("Strangepoints", totalPoints)
                .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL);
            message.channel.send(embed);
        }
    }
});

bot.login(process.env.BOT_TOKEN);