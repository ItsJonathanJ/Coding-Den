import { ApplicationCommandType, EmbedBuilder } from 'discord.js';

export default {
        name: 'av',
        description: 'Send a Player\'s Avatart Image',
        type: ApplicationCommandType.ChatInput,
        cooldown: 100,

        options: [
                {name: 'user', description: "Specify User", type: 6, required: true}
        ],

	run: async (interaction) => {
                const target = interaction.options.getUser('user')
                
                const embed = new EmbedBuilder()
                    .setDescription(`[Image Link](${target.avatarURL()})`)
                    .setImage(`${target.avatarURL()}`)
                interaction.reply({embeds: [embed]})
	}
};