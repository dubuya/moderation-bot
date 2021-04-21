
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();
const fs = require("fs")
const prefix = 'prefix';
/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');


});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});


client.on('message', message => {
  // If the message is "how to embed"
  if (message.content === `${prefix}avatar`) {
    // We can create embeds using the MessageEmbed constructor
    // Read more about all that you can do with the constructor
    // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
    const embed = new Discord.MessageEmbed()
      // Set the title of the field
      .setTitle('Your avatar')
      // Set the color of the embed
      .setColor(3092789)
      // Set the main content of the embed
      .setDescription(' ')
      .setImage(message.author.displayAvatarURL());
    // Send the embed to the same channel as the message
    message.channel.send(embed);
  }
});
client.on('message', message => {
  if (message.content === `${prefix}invite`) {
    const embed = new Discord.MessageEmbed()

    .setTitle('My Invite Link !')
    .setColor(3092789)
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription( '**https://discord.com/api/oauth2/authorize?client_id=834308430986346506&permissions=8&scope=bot**');

    message.channel.send(embed);
  }
})

client.on('message', message => {
  if (message.content === `${prefix}pp`) {
    let user = message.mentions.users.first() || message.author;
    const embed = new Discord.MessageEmbed()

    .setTitle('Avatar')
    .setColor(3092789)
    .setImage(user.displayAvatarURL());

    message.channel.send(embed);
  }
})

client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;
  if(message.member.hasPermission("KICK_MEMBERS")) 


  // If the message content starts with "!kick"
  if (message.content.startsWith(`${prefix}kick`)) {
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      const reason = message.content.split(" ").slice(2).join(' ');
      if (member) {

        member
          .kick(`${reason}`)
          .then(() => {
            // We let the message author know we were able to kick the person
            const embed = new Discord.MessageEmbed()

            .setTitle(`Succes kicked __${member.user.tag}__ !`)
            .setThumbnail(message.author.displayAvatarURL())
            .addField(`Kicked by : __${message.author.tag}__\nReason : ${reason}`, `Member can join again`)
            .setColor(11463635);

            message.channel.send(embed);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I dont have permission to kick member !');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        const embed = new Discord.MessageEmbed()

        .setTitle("That user is not from this server !")
        .setColor(16747660);
        message.reply(embed);
      }
      // Otherwise, if no user was mentioned
    } else {
        const embed = new Discord.MessageEmbed()
        .setTitle('Please mention a user')
        .setColor(16747660)
        message.reply(embed);
    }
  }
});
client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;
  if(message.member.hasPermission("BAN_MEMBERS"))

  // if the message content starts with "!ban"
  if (message.content.startsWith(`${prefix}ban`)) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      const reason = message.content.split(" ").slice(2).join(' ');
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member
          .ban({
            reason: `${reason}`,
          })
          .then(() => {
            // We let the message author know we were able to ban the person
            message.reply(`Successfully banned **__${user.tag}__** for **__${reason}__**`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to ban the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
    } else {
      // Otherwise, if no user was mentioned
      message.reply("You didn't mention the user to ban!");
    }
  }
});



// Log our bot in using the token from https://discord.com/developers/applications
client.login('TOKEN');
