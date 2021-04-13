const Discord = require("discord.js");
const dquiz = require('discord-quiz')
module.exports = {
	name: 'jinny',
	description: 'JFat!',
	execute(message, args) {
		message.channel.send("Use Command !JAuthenticity. To determine whether your Jinny or Not Jinny. Ur fat.")
	},
};