import { Command } from '../utilities/command'
import { Message } from 'discord.js'
import { Args } from "../types/commands"



export = new Command({
    name: "ping",
    aliases: ['p'],
    execute: function (client, message, args) {
        message.channel.send('hi')
    }
})