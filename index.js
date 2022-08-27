import { Client, GatewayIntentBits, Collection, Collector, Partials } from "discord.js";
import fs from 'fs';
import dotenv from 'dotenv'
import './events/interactionCreate.js'
import { readdir } from 'fs';
import { promisify} from 'util';
const promiseBasedReaddir = promisify(readdir);
dotenv.config()


export const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent],
    partials: [Partials.GuildMember, Partials.Channel, Partials.ThreadMember, Partials.GuildScheduledEvent, Partials.Message, Partials.User]
});

// ['slashCommand', 'events'].forEach(async file => {
// 	await import(`./handlers/${file}`)
// })




    const eventDir = './events/';
    let files;
    try {
        files = await promiseBasedReaddir(`${eventDir}`);
    }
    catch (err) {
        console.error(`Error loading event: ${err}`);
    }
    const events = files.filter(file=>file.endsWith('.js'));
    console.log(events)
    for(const file of events){
        console.log(`event file name is ${file}`);
            const eventName = file.split('.')[0];
            console.log(eventName)
            const event = (await import(`./events/${file}`)).default;
            client.on(eventName, event.bind(null,client));
            console.log(`Loaded event ${eventName}`);
        }


    


client.once('ready', () => {
    console.log('Forestbot up and running')
})


client.login(process.env.TOKEN)
//interactionCreate(client)




