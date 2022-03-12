import Discord, { Message, Collection} from 'discord.js'
import fs from 'fs'
import { MessageEmbed } from 'discord.js';
import config from './config.json';
import {Args, commandType, ExecuteFunction, EventType} from './types/commands'

const intents = new Discord.Intents(32767)


export function ErrorEmbed(message: string){
    return new MessageEmbed()
     .setColor('RED')
     .setTitle('oops an error occured')
     .setDescription(message)
}


class client extends Discord.Client {
    commands: Collection<string, commandType> = new Collection()
    events: Collection<string, EventType> = new Collection
    
    constructor(){
        super({intents})
    }

  

    start(){
        this.login(config.Token)

        fs.readdirSync(`${__dirname}/commands`, 'utf8').forEach(async(file)=>{
          const command: commandType = await import(`./commands/${file}`)
          this.commands.set(command.name, command)
        })


        fs.readdirSync(`${__dirname}/events`, 'utf8').forEach(async (file)=>{
            const event = await import(`./events/${file}`)
            this.events.set(event.name, event)
            this.on(event.name, event.run.bind(null, this))
        })
      
       
    }

}



export {client}




