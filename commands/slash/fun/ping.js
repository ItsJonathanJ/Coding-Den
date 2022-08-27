import { ApplicationCommandType } from 'discord.js'
export default {
	name: "ping",
	description: "Check bot's ping.",
	type: ApplicationCommandType.ChatInput,
	cooldown: 100,
	run: async (interaction) => {
		interaction.reply(`🏓 Latency is **${interaction.createdTimestamp - Date.now()}ms**. API Latency is **${Math.round(client.ws.ping)}ms**`);
	},
};