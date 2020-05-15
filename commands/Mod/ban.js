const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "ban",
            enabled: true,
            runIn: ["text"],
            aliases: ["b"],
            permissionLevel: 6,
            description: "Ban someone.",
            usage: "<user:usersearch> <reason:str>", usageDelim: ","
        });
    

  execute: (client, message, args) => {
    var bannedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
  if (!bannedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
  if (!bannedmember.kickable) return message.reply("I cannot ban this member!") // if the member is unkickable
  var banreasondelete = 10 + bannedmember.user.id.length //sets the length of the kickreasondelete
  var banreason = message.content.substring(banreasondelete).split(" "); // deletes the first letters until it reaches the reason
  var banreason = banreason.join(" "); // joins the list kickreason into one line
  if (!banreason) return message.reply("Please indicate a reason for the kick!") // if no reason
  bannedmember.ban(banreason) //if reason, kick
      .catch(error => message.reply(`Sorry @${message.author} I couldn't ban because of : ${error}`)); //if error, display error
  message.channel.send(`${bannedmember.user.username} :hammer:  has been banned by ${message.author.username} :hammer:  because: ${banreason}`);
  }
    }
};
