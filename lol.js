const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");
var Request = require("request");
const math = require('mathjs')
const ms = require("ms");
let points = require("./points.json")



function randint(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min));
  }

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
        .addField("StrangeBot", `Welcome, <@${member.user.id}> to **${member.guild.name}**. Enjoy your stay.`)
    member.send(welcomeEmbed);

    if (member.guild.id == 609880407718232064)
    {
        let sendmessage = member.guild.channels.get('609880407718232067');
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

        if (!points[message.author.id])
        {
            points[message.author.id] = {
                points: 0
            };
        }

        let pointAmt = Math.floor(Math.random() * 15) + 1;
        let baseAmt = Math.floor(Math.random() * 33) + 1;

        if (pointAmt === baseAmt)
        {
            points[message.author.id] = {
                points: points[message.author.id].points + pointAmt
            };
        fs.writeFile("./points.json", JSON.stringify(points), (err) => {
            if (err)
            {
                console.log(err);
            }
        });

        message.channel.send(`Hey <@${message.author.id}>, you just earned ${pointAmt} strangepoints. Keep it up!`);
    
        }

        if (message.content.startsWith(prefix + "points"))
        {
            if (!points[message.author.id])
            {
                points[message.author.id] = {
                    points: 0
                };
            }

            let uPoints = points[message.author.id].points;

            let coinEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor("#00FF00")
            .setTimestamp()
            .setThumbnail("https://www.fourpointsfcu.org/wp-content/uploads/2017/04/FourPoints-Icons-Savings-White.png")
            .addField("Total Strangepoints", `You have ${uPoints} strangepoints in total.`);

            message.channel.send(coinEmbed)
        }

        if (message.content.startsWith(prefix + "give"))
        {
            if (message.author.id == 603405113477955625)
            {
                let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

                if (!pUser)
                {
                    message.channel.send("❌ ***Specify an user***");
                }
                else if (!args[1])
                {
                    if (!points[pUser.id])
                    {
                        points[pUser.id] = {
                            points: 0
                        };
                    }

                    let pPoints = points[pUser.id].points;

                    points[pUser.id] = {
                        points: pPoints + 5
                    };
    
                    message.channel.send(`✅ ***${pUser} has been given 5 strangepoints.***`);
    
                    fs.writeFile("./points.json", JSON.stringify(points), (err) => {
                        if (err)
                        {
                            console.log(err);
                        }
                    });
                }
                else
                {
                    if (!points[pUser.id])
                    {
                        points[pUser.id] = {
                            points: 0
                        };
                    }

                    let pPoints = points[pUser.id].points;

                    points[pUser.id] = {
                        points: pPoints + parseInt(args[1])
                    };
    
                    message.channel.send(`✅ ***${pUser} has been given ${args[1]} strangepoints.***`);
    
                    fs.writeFile("./points.json", JSON.stringify(points), (err) => {
                        if (err)
                        {
                            console.log(err);
                        }
                    });
                }
            }
        }

        const clean = text => {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }
        if (message.content.startsWith(prefix + "eval"))
        {
            if(message.author.id == 603405113477955625)
            {
                try
                {
                    const code = args.join(" ");
                    let evaled = eval(code);
             
                    if (typeof evaled !== "string")
                    {
                        evaled = require("util").inspect(evaled);
                    }
             
                    message.channel.send(clean(evaled), {code:"xl"});
                }
                catch (err)
                {
                    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
                }
            }
        }

        if (message.content.startsWith(prefix + "mute"))
        {
            if (message.member.hasPermission("MANAGE_MESSAGES") || message.member.id == 564474717747150858)
            {
                let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

                if (!tomute)
                {
                    return message.react("❓")
                }
    
                if (tomute.hasPermission("MANAGE_MESSAGES"))
                {
                    message.channel.send("❌ ***User is mod/admin.***");
                }
    
                else
                {
                    let muterole = message.guild.roles.find(`name`, "Muted");
                    if(!muterole)
                    {
                        try
                        {
                            muterole = message.guild.createRole({
                                name: "Muted",
                                color: "#000000",
                                permissions: []
                            });
                            message.guild.channels.forEach(async (channel, id) => {
                                await channel.overwritePermissions(muterole, {
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS: false
                                });
                            });

                            tomute.addRole(muterole.id);
                        }
                        catch
                        {
                            message.channel.send("`Muted` role does not exist.");
                        }
                    }
                    
                    try
                    {
                        let mutetime = args[1];
        
                        if (!mutetime)
                        {
                            message.channel.send("Please speficy a time.");
                        }
                        
                        else
                        {
                            try
                            {
                                tomute.send(`You were muted in **${tomute.guild.name}** by **${message.author.username}#${message.author.discriminator}** for **${ms(ms(mutetime))}**`);
                            }
                            catch
                            {
                                return;
                            }
                            tomute.addRole(muterole.id);
                            message.channel.send(`✅ <@${tomute.id}> ***has been muted for ${ms(ms(mutetime))}.***`);
                
                            setTimeout(function(){
                                try
                                {
                                    tomute.send(`You've been unmuted from **${tomute.guild.name}**`);
                                }
                                catch
                                {
                                    return;
                                }
                                tomute.removeRole(muterole.id);
                                message.channel.send(`✅ <@${tomute.id}> ***has been unmuted.***`);
                            }, ms(mutetime));
                        }
                    }
                    catch
                    {
                        message.channel.send("Please speficy a time.");
                    }
                }
            }
            else
            {
                message.react("❌");
            }
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
            if (message.member.hasPermission("MANAGE_MESSAGES") || message.member.id == 564474717747150858)
            {
                try
                {
                    if (args[0] < 100)
                    {
                        message.delete();
                        message.channel.bulkDelete(args[0]);
                        message.channel.send(`***✅ Deleted ${args[0]} messages.***`).then(msg => {
                            msg.delete(3000);
                        });
                    }
                    else if (args[0] >= 100)
                    {
                        message.channel.bulkDelete(100);
                        message.channel.send(`***✅ Deleted 100 messages.***`).then(msg => {
                            msg.delete(3000);
                        });
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

            
                message.channel.send(memes);
            });
        }

        if (message.content.startsWith(prefix + "reddit") || message.content.startsWith(prefix + "r"))
        {
            let blacklist = ["wince", "porn", "sex", "nsfw", "nsfw2"];

            message.channel.send(`Searching: **r/${args[0]}**`);

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

                if (blacklist.includes(args[0]))
                {
                    message.channel.send("❌ This subreddit is blacklisted. It contains NSFW content and it may not be appropiate for certain audiences.");
                }

                else if(!result.title)
                {
                    message.channel.send("❌ Subreddit not found");
                }
                
                else
                {
                    message.channel.send(memes);
                }
            });
        }

        if(message.content.startsWith(prefix + "info"))
        {
            let invite = args[0];
            Request.get(`https://discordapp.com/api/v6/invite/${invite}`, (error, response, body) => {
                if(error)
                {
                    return message.channel.send(error);
                }
                let result = JSON.parse(body);
                if(result.code == 10006)
                {
                    message.channel.send("Unknown Invite")
                }
                else
                {
                    const infoEmbed = new Discord.RichEmbed()
                        .setTitle(result.guild.name)
                    message.channel.send(infoEmbed);
                }
            });
        }

        if (message.content.startsWith(prefix + "calc"))
        {
            if (!args[0])
            {
                return message.channel.send("Please input a calculation");
            }
            let resp;

            try
            {
                resp = math.eval(args.join(' '));
            } catch (e) {
                return message.channel.send("Sorry, please input a valid calculation. Example: \`.calc 2+4 \`");
            }

            const mathEmbed = new Discord.RichEmbed()
                .setTitle("Calculator")
                .setThumbnail("https://images-na.ssl-images-amazon.com/images/I/21v2IL7O%2BVL.png")
                .addField("Input", `\`\`\`js\n${args.join('')}\`\`\``)
                .addField("Output", `\`\`\`js\n${resp}\`\`\``)
            
            message.channel.send(mathEmbed);
        }

        //responses

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

        if (message.content.includes("thanks"))
        {
            message.channel.send("no problem ;)");
        }

        if (message.content == prefix + "ping")
        {
            message.channel.send("Pong! " + Math.round(bot.ping) + "ms");
        }

        if (message.content.startsWith(prefix + "say"))
        {
            message.delete();
            msg = args.join(" ");
            message.channel.send(msg);
        }


        if (message.content.startsWith(prefix + "kick"))
        {
            if (message.member.hasPermission(["KICK_MEMBERS"]) || message.member.id == 564474717747150858)
            {

                try
                {
                    var member = message.mentions.members.first();

                    if (member.hasPermission("MANAGE_MESSAGES"))
                    {
                        message.channel.send("❌ ***User is mod/admin.***");
                    }
                    else
                    {
                        member.kick().then((member) => {
                            message.react("✅");
                        }).catch(() => {
                            message.react("❌");
                        });
                    }
                }
                catch
                {
                    message.react("❓");
                }
                
            }
            else
            {
                message.react("❌");
                
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
            if (message.member.hasPermission(["KICK_MEMBERS"]) || message.member.id == 564474717747150858)
            {

                try
                {
                    var member = message.mentions.members.first();

                    if (member.hasPermission("MANAGE_MESSAGES"))
                    {
                        message.channel.send("❌ ***User is mod/admin.***");
                    }
                    else
                    {
                        member.ban().then((member) => {
                            message.react("✅");
                        }).catch(() => {
                            message.react("❌");
                        });
                    }
                }
                catch
                {
                    message.react("❓");
                }
                
            }
            else
            {
                message.react("❌");
                
            }
        }

        if (message.content.includes(`<@${bot.user.id}>`))
        {
            message.channel.send(`<@${message.author.id}>`)
        }
    }
});

bot.login(process.env.BOT_TOKEN);
