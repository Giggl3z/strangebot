const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");
var Request = require("request");



function randint(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min));
  }

let levelUp = 0;
let totalPoints = 0;
let prefix = ".";

bot.on("ready", () => {
    console.log("Ready");
    bot.user.setActivity(`prefix: ${prefix}`);
});


// Welcomer
bot.on('guildMemberAdd', member => {
    
        
    const welcomeEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setFooter(`${member.user.username}#${member.user.discriminator}`, member.user.avatarURL)
        .setThumbnail(member.user.avatarURL)
        .setTimestamp()
        .setImage('https://data.whicdn.com/images/306312379/large.png')
        .addField("StrangeBot", `Welcome,  <@${member.user.id}> to **${member.guild.name}**. Enjoy your stay.`)
    member.send(welcomeEmbed);

    if (member.guild.id == 566017621372436490)
    {
        let sendmessage = member.guild.channels.get('566387384925814785');
        const embd = new Discord.RichEmbed()
            .setColor(0x00FF00)
            .setFooter(`${member.user.username}#${member.user.discriminator}`, member.user.avatarURL)
            .setTimestamp()
            .addField("Member Joined", `✅ Welcome,  <@${member.user.id}> to **${member.guild.name}**. Enjoy your stay.`)
    
        
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

    if (message.author.id != bot.user.id && !message.author.bot)
    {
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);

        //console.log(levelUp);
        let strangePoint = randint(7, 13);
        levelUp += 1;

        if (levelUp == 4) // messages until until it rewards strangepoints
        {
            levelUp = 0;
            message.reply("you've been given " + strangePoint + " points, good work!");
            totalPoints += strangePoint;
        }

        if (message.content.includes("https://discord.gg/") || message.content.includes("http://discord.gg/") || message.content.includes("discord.gg/"))
        {
            if (!message.member.hasPermission("MANAGE_MESSAGES"))
            {
                message.delete();
                message.reply("you aren't allowed to post invites.")
            }
        }

        if (message.content.startsWith(prefix + "purge"))
        {
            if (message.member.hasPermission("MANAGE_MESSAGES"))
            {
                try
                {
                    if (args[0] < 100)
                    {
                        message.delete();
                        message.channel.bulkDelete(args[0]);
                        message.channel.send(`***✅ Deleted ${args[0]} messages.***`)
                    }
                    else if (args[0] >= 100)
                    {
                        message.channel.bulkDelete(100);
                        message.channel.send(`***✅ Deleted 100 messages.***`)
                    }
                    else
                    {
                        message.react("❓")
                    }
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

        if (message.content.startsWith(prefix + "meme"))
        {
            Request.get("https://meme-api.herokuapp.com/gimme", (error, response, body) => {
                if(error) {
                    return message.channel.send(error);
                }
                let result = JSON.parse(body);
                const memes = new Discord.RichEmbed()
                    .setTitle(result.title)
                    .setURL(result.postLink)
                    .setImage(result.url)
                    .setTimestamp()
                    .setFooter(`r/${result.subreddit}`)

            
                message.channel.send(memes).then(function (message) {
                    message.react("🔄")
                });
            });
        }

        if (message.content.startsWith(prefix + "reddit") || message.content.startsWith(prefix + "r"))
        {
            message.channel.send("Searching...");

            Request.get(`https://meme-api.herokuapp.com/gimme/${args[0]}`, (error, response, body) => {
                if(error) {
                    return message.channel.send(error);
                }
                let result = JSON.parse(body);
                const memes = new Discord.RichEmbed()
                    .setTitle(result.title)
                    .setURL(result.postLink)
                    .setImage(result.url)
                    .setTimestamp()
                    .setFooter(`r/${result.subreddit}`)
                if (!result.title)
                {
                    message.channel.send("❌ Subreddit not found")
                }
                
                else
                {
                    message.channel.send(memes).then(function (message) {
                        message.react("🔄")
                    });
                }
            });
        }

        if (message.content.includes("stfu"))
        {
            message.channel.send("no u");
        }

        if (message.content.includes("eleven"))
        {
            message.channel.send("ELEVEN? where is she, please someone tell me where she is!");
        }

        if (message.content.includes("sorry"))
        {
            message.channel.send("it's ok")
        }

        if (message.content.includes("lol"))
        {
            message.react("😂")
        }

        if (message.content.includes("thanks"))
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

        if (message.content.startsWith(prefix + "link"))
        {
            message.delete();
                try
                {
                    const linkEmbed = new Discord.RichEmbed()
                        .setTitle(args[0])
                        .setURL(args[1])
                    

                    if (!args[1])
                    {
                        message.channel.send("**Usage:** .link <text> <link>");
                    }
                    else
                    {
                        message.channel.send(linkEmbed).catch(error => {
                            message.channel.send("**Usage:** .link <text> <link>");
                        });
                    }
                }
                catch
                {
                    message.channel.send("**Usage:** .link <text> <link>")
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