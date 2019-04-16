const Discord = require('discord.js');
const bot = new Discord.Client();

function randint(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min));
  }

let levelUp = 0;
let totalPoints = 0;
let prefix = ".s "

bot.on("ready", () => {
    console.log("Ready");
    bot.user.setActivity(prefix + "help");
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
    
        let sendmsg = member.guild.channels.get('566387384925814785');
        const embd = new Discord.RichEmbed()
            .setColor(0x00FF00)
            .setFooter(`${member.user.username}#${member.user.discriminator}`, member.user.avatarURL)
            .setTimestamp()
            .addField("Member Joined", `✅ Welcome,  <@${member.user.id}> to **${member.guild.name}**. Enjoy your stay.`)
    
        member.send(welcomeEmbed);
        sendmsg.send(embd);
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

bot.on("message", msg => {

    if (msg.author.id != bot.user.id)
    {
        //console.log(levelUp);
        let strangePoint = randint(7, 13);
        levelUp += 1;

        if (levelUp == 20)
        {
            levelUp = 0;
            msg.reply("you've been given " + strangePoint + " points, good work!");
            totalPoints += strangePoint;
        }

        if (msg.content.includes("eleven"))
        {
            msg.channel.send("ELEVEN? where is she, please someone tell me where she is!");
        }

        if (msg.content.includes("lol"))
        {
            msg.channel.send("What's so funny, I don't find it funny ¯\\_(ツ)_/¯")
        }
        else if (msg.content.includes("osint") || msg.content.includes("osintsec") || msg.content.includes("Osint") || msg.content.includes("Osintsec"))
        {
            msg.channel.send(`<@564474717747150858> ${msg.author.username} is talking about you`);
        }
        else if (msg.content.includes("thanks"))
        {
            msg.channel.send("no problem ;)");
        }

        if (msg.content == prefix + "ping")
        {
            msg.channel.send("Pong! " + Math.round(bot.ping) + "ms");
            msg.react("✅");
          }

        if (msg.content.startsWith(prefix + "kick"))
        {
            if (msg.member.hasPermission(["KICK_MEMBERS"]))
            {

                try
                {
                    var member = msg.mentions.members.first();
                    member.kick().then((member) => {
                        msg.react("✅");
                        // msg.channel.send(`✅ ***${member.user.username}#${member.user.discriminator} has been kicked.***`);
                    }).catch(() => {
                        msg.react("❌");
                        // msg.channel.send("***ℹ️ Not enough permissions, maybe try giving me a higher role than the user you want to kick.***");
                    });
                }
                catch
                {
                    msg.react("❓");
                }
                

            }
            else
            {
                msg.react("❌");
                //msg.channel.send("***❌ You do not have enough permissions to do that.***")
            }
        }

        if (msg.content == prefix + "purge")
        {
            module.exports.run = async (bot, message, args, messages) => {

                const deleteCount = parseInt(args[0], 10);
                if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No no no.");
                  if (!args[0] || args[0 == "help"]) return message.reply(`Please Usage: rens!prefix <new prefix here>"`);
                  
                  if(!deleteCount || deleteCount < 2 || deleteCount > 100)
                    return message.reply("Please provide a number between 2 and 100 for the number of messages to delete.");
                 
                  const fetched = await message.channel.fetchMessages({limit: deleteCount});
                  message.channel.bulkDelete(fetched)
                    .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
                
                let purgeEmbed = new Discord.RichEmbed()
                  .setAuthor("♻️ Action | Purge")
                  .setColor("RANDOM")
                  .addField("Executor", `<@${message.author.id}>`)
                  .addField("Purge", `${args[0]}`)
                  .addField("Deleted", `${args[0]}`)
                  .setFooter("Bot Version 1.0.0", bot.user.displayAvatarURL);
              
                  let purgeChannel = message.guild.channels.find(`name`, "mod-logs");
                  if(!purgeChannel) return message.channel.send("Can't find mod-logs channel.");
              
                  purgeChannel.send(purgeEmbed);
              
                }
        }

        if (msg.content.startsWith(prefix + "ban"))
        {
            if (msg.member.hasPermission(["BAN_MEMBERS"]))
            {
                
                
                try
                {
                    var member = msg.mentions.members.first();
                    member.ban().then((member) => {
                        msg.react("✅");
                        //msg.channel.send(`✅ ***${member.user.username}#${member.user.discriminator} has been banned.***`);
                    }).catch(() => {
                        msg.react("❌");
                        // msg.channel.send("***ℹ️ Not enough permissions, maybe try giving me a higher role than the user you want to ban.***");
                    });
                }
                catch
                {
                    msg.react("❓");
                }
                

            }
            else
            {
                msg.react("❌");
                //msg.channel.send("***❌ You do not have enough permissions to do that.***")
            }
        }

        if (msg.content.includes(`<@${bot.user.id}>`))
        {
            msg.channel.send(`<@${msg.author.id}>`)
        }

        if (msg == prefix + "points")
        {
            msg.delete();
            //msg.channel.send(`**Total Strange Points** for <@${msg.author.id}> is \`${totalPoints}\``);
            const embed = new Discord.RichEmbed()
                .setColor(0xff0000)
                .setThumbnail("https://cdn.discordapp.com/attachments/564605033367339027/566516577176911882/unknown.png")
                .setTitle(`StrangeBot`)
                .addField("Strangepoints", totalPoints)
                .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
            msg.channel.send(embed);
        }
    }
});

bot.login(process.env.BOT_TOKEN);