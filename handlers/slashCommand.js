import fs from 'fs';
import chalk from 'chalk';
import { client } from '../index.js';

import { PermissionsBitField } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';

import AsciiTable from 'ascii-table';
import { dir } from 'console';
const table = new AsciiTable().setHeading('Slash Commands', 'Stats').setBorder('|', '=', "0", "0")

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;


export const interactionEvent = async (client) => {

	const slashCommands = []; 
	const directory = fs.readdirSync(`./commands/slash/`)

	for(const dir of directory ) {
		const commandFiles = fs.readdirSync(`./commands/slash/${dir}/`).filter(file => file.endsWith('.js'))
		for(const file of commandFiles) {
				const slashCommand = (await import(`../commands/slash/${dir}/${file}`)).default;
				
				console.log(slashCommand);
				slashCommands.push({
					name: slashCommand.name,
					description: slashCommand.description,
					type: slashCommand.type,
					options: slashCommand.options ? slashCommand.options : null,
					default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
					default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
				});
				
				if(slashCommand.name) {
						table.addRow(file.split('.js')[0], '✅')
				} else {
						table.addRow(file.split('.js')[0], '⛔')
				}
				
		}
		
	}


	console.log(chalk.red(table.toString()));
	
	const rest = new REST({ version: '10' }).setToken(`${process.env.TOKEN}`);	

	(async () => {
			try {
				console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(`${process.env.CLIENT_ID}`, `${process.env.GUILD_ID}`),
			{ body: slashCommands },
		);
				console.log(chalk.yellow('Slash Commands • Registered'))
			} catch (error) {
				console.log(error);
			}
	})();
};