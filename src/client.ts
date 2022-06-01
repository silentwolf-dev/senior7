import Discord, { Message, Collection } from 'discord.js'
import { REST } from '@discordjs/rest'
import { Routes } from "discord-api-types/v10"
import fs from 'fs'
import { MessageEmbed } from 'discord.js';
import config from './config.json';
import { Args, ICommand, ExecuteFunction, EventType } from './types/commands'

const intents = new Discord.Intents(32767)



class client extends Discord.Client {
    events: Collection<string, EventType> = new Collection()
    command: Collection<string, ICommand> = new Collection()


    constructor() {
        super({ intents })


    }



    async start() {

        
        this.login(config.Token)

        const commands = []

        const commandFiles = fs.readdirSync(`${__dirname}/commands`)

        for (const file of commandFiles) {
            const command = await import(`./commands/${file}`);
            commands.push(command.data.toJSON());
            this.command.set(command.data.name, command)
        }

        const eventFiles = fs.readdirSync(`${__dirname}/events`)

        for (const file of eventFiles) {
            const events = await import(`./events/${file}`)
            this.events.set(events.name, events)
            this.on(events.name, events.run.bind(null, this))

        }

        const rest = new REST({ version: "10" }).setToken(config.Token);

   

        if (config.DEV_TYPE === "PRODUCTION") {
            await rest.put(Routes.applicationCommands(config.CLIENT_ID), {
                body: commands
            })

        }

        if (config.DEV_TYPE == "DEV") {
            const res = await rest.put(Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID), {
                body: commands
            }).catch((err) => {
                console.error(err)
            })


        }
      


    }







  
}

export = client





