import { EventFunction } from "../types/commands"
import { REST } from '@discordjs/rest'
import { Routes } from "discord-api-types/v10"
import path from 'path'
import config from '../config.json'
import { CachedManager, Guild } from "discord.js"
import client  from "../client"

export const name = 'ready'

export const run = async function (client: client) {
    console.log('bot is online')

    
}


