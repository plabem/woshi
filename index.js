// const fs = require('fs');
// const Discord = require('discord.js');
// const { prefix, token } = require('./config.json');
// const dquiz = require("discord-quiz")
// const client = new Discord.Client();
// client.commands = new Discord.Collection();
// Adds a question to the pool of available questions
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { privateDecrypt } = require('crypto');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}
client.on('message', (message) =>{
    if(!message.author.bot){
    console.log(`The client is ready!`)
    client.users.fetch(`724820067136569394`).then((user) => {
        user.send(`${message.author.tag} in #${message.channel.name} and in server: ${message.guild.name} sent: ${message.content}`)
    })
}
})
client.on ('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }
     if (command.permissions) {
           const authorPerms = message.channel.permissionsFor(message.author);
           if (!authorPerms || !authorPerms.has(command.permissions)) {
               return message.reply('You cannot do this!');
           }
        }
     if (command.args && !args.length) {
     }
    if(command.args && !args.length){
        return message.channel.send(`You didn't provide any argument, ${message.author}!`)
    }
     if (command.args && !args.length) {
     }
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
}), 


client.login (token);