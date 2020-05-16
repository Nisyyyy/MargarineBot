const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "mute",
            enabled: true,
            runIn: ["text"],
            aliases: ["m"],
            permissionLevel: 5,
            description: "Mute someone.",
            extendedHelp: "Requires a server moderator to identify the mute role in the guild configurations first.",
            usage: "<user:usersearch> [reason:str]", usageDelim: ","
        });
    }

    	if (message.member.hasPermission("MANAGE_MESSAGES")) {
		let member = message.mentions.members.first();
		if(!member) {
			var msgA = [];
			msgA.push(`Correct Usage : **nmute [user] [time] [reason]** \n = **Muted Members:** =\n`)

			message.guild.members.forEach(async (m) => {
				if(m.roles.find("name", "Muted")) {
					msgA.push(`${m.user.username} <${m.user.id}>`)
				}
			});
			console.log(msgA)
			if(msgA == `= **Muted Members** =\n`){
					msgA.push(`== **Nobody is muted at the moment**==`)
			}
			message.channel.send(msgA).then(m => m.delete(25000));
			return;
		}
		let arg = message.content.split(" ").slice(1);
		let time = arg[1];
		let rarg = message.content.split(" ").slice(3);
		let reason = rarg.join(" ");
		let id = member.user.id;
		let musername = member.user.username;
		if(!reason){reason = "No reason given."}
		if(!time) {time = 0}
		let muteRole = message.guild.roles.find("name", "Muted");
		if(!muteRole){
			message.channel.send("I couldn't find any role called `Muted`, I will create one! ")
			muteRole = message.guild.createRole({"name": "Muted", "hoist": false, "position":0, "permissions": 0})
			message.guild.channels.forEach(async (channel, i) => {
				channel.overwritePermissions(muteRole.id, {SEND_MESSAGES: false, TALK: false}, "Had to make this for the mute role!")
			});
		}

		if(member.roles.find("name", "Muted")) return message.channel.send(`:x: ${member.user.username}, is already muted!`).then(m => m.delete(2500))
		 if(time == 0) {
			 member.addRole(muteRole.id);
			 let mutedrich = new Discord.RichEmbed()
			 .setDescription(`✔️ **${member.user.username}**, is now muted.`)
			 .setColor("RANDOM")
	 		message.channel.send(mutedrich).then(m => m.delete(10000))
	 		let muteds = new Discord.RichEmbed()
	         .setColor(`#FF0000`)
	         .setAuthor(`Hi, ${member.user.username}!`)
	 				 .setDescription(`:mute: You are now muted in ${message.guild.name}.`)
	         .addField(`Muted by:`, `${message.author.username}#${message.author.discriminator}`)
	         .setFooter(`MUTED`)
	         .setTimestamp()
	 	 member.user.send({embed: muteds});
		 return;
		 }
		member.addRole(muteRole.id);
		let mutedrichc = new Discord.RichEmbed()
		.setDescription(`**${member.user}**, is now muted for ${reason},  ${ms(ms(time), {long: true})}`)
		.setColor("RANDOM")
		message.channel.send(mutedrichc).then(m => m.delete(10000))
		let muteds = new Discord.RichEmbed()
        .setColor(`#FF0000`)
        .setAuthor(`Hi, ${member.user.username}!`)
				.setDescription(`:mute: You are now muted in ${message.guild.name}.`)
      	.addField(`Time:`, `${ms(ms(time), {long: true})}`)
        .addField(`Muted by:`, `${message.author.username}#${message.author.discriminator}`)
        .addField(`Reason:`, `${reason}`)
        .setFooter(`MUTED`)
        .setTimestamp()
	 member.user.send({embed: muteds}).then(m => m.delete(ms(time)))
		setTimeout(function() {

			let mutede = new Discord.RichEmbed()
	        .setColor(`#00FF00`)
	        .setAuthor(`Hi, ${member.user.username}!`)
					.setDescription(`:speaker: You are now unmuted in ${message.guild.name}.`)
	      	.addField(`Time:`, `${ms(ms(time), {long: true})}`)
	        .addField(`Reason:`, `${reason}`)
	        .setFooter(`UNMUTED`)
	        .setTimestamp()
		  member.user.send({embed: mutede});
			member.removeRole(muteRole.id);
			message.channel.send(`${member.user.username}, is now unmuted from the last ${ms(ms(time), {long: true})}`).then(m => m.delete(2500))
		}, ms(time))
 } else {
 	message.channel.send("Sorry, but you don't have the required permissions.")
 }

};
