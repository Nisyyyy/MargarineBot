const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const { serverLink } = require("../../assets/settings.json");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "about",
            runIn: ["text", "dm"],
            aliases: ["stats", "whoami"],
            guarded: true,
            description: "General information"
        });
    }

    async run(msg) {
        var support = (serverLink && serverLink.length > 1) ? `| [Support Server](${serverLink})` : "";

        const embed = new MessageEmbed()
        .setColor('ORANGE')
        .setTitle("About Me")
        .setDescription(`[Github](https://github.com/Nisyyyy)
        \nI am a very helpful and amazing bot! Doing ${msg.guild.settings.prefix}help
        \n**Stats:** I have been online, helping out, for ${this.client.util.timekeeper.elapsedTime(this.client.uptime)} using ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB of memory. ${this.client.users.cache.size} users across ${this.client.guilds.cache.size} guilds with ${this.client.channels.cache.size.toLocaleString()} channels depend on my functions to be as reliable as possible!
        \n**Creation:** I was created on ${this.client.util.timekeeper.dateMaker(this.client.user.createdAt)} by Mario`)
        .setThumbnail(this.client.user.displayAvatarURL())
        .setFooter(`Running on Heroku ${this.client.ownerSetting.get("build").version} | Released on: ${this.client.ownerSetting.get("build").releaseDate}`);

        msg.channel.send({embed});
    }
};
