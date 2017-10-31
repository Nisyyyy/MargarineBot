exports.run = async (client, message, [xa, ya, za]) => {
  var x = client.funcs.constantMath(client, message, xa);
  var y = client.funcs.constantMath(client, message, ya);

  if (!za) { 
    var z = 1; 
  } else { 
    var z = client.funcs.constantMath(client, message, za); 
  }

  if ((x === null) || (y === null) || (z === null)) { 
    return message.reply("You are trying to multiply things that aren't numbers or imaginary, baka!"); 
  }

  message.channel.send(`Total: ${x * y * z}`);
};
  
exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};
  
exports.help = {
  name: "multiply",
  description: "Multiply up to three numbers together.",
  usage: "[xa:str] [ya:str] [za:str]",
  usageDelim: " ",
};