import { client } from '../client'
import { Message } from 'discord.js'
interface fn {
    (client: client, message: Message<boolean>, args: string[]): any
}
export class Command {
    name: string;
    aliases?: string[];
    cooldown?: number;
    guildOnly?: boolean;
    description?: string;
    userPermissions?: string[];
    execute: fn

    constructor(command: Command) {
        this.name = command.name;
        this.aliases = command.aliases;
        this.guildOnly = command.guildOnly;
        this.cooldown = command.cooldown;
        this.description = command.description;
        this.userPermissions = command.userPermissions;
        this.execute = command.execute;
        return this;
    }
}