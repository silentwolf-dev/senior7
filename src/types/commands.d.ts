import { Interaction, Message } from "discord.js";
import { client } from "src/client";
import { SlashCommandBuilder } from "@discordjs/builders";


export type Args = string[];


export interface ExecuteFunction {
  (message: Message<boolean>, args: Args): Promise<void> | any
}



export interface ICommand {
  data: SlashCommandBuilder,
  execute: (interaction: Interaction)=>{}
}


export interface EventFunction {
  (client: client, ...args: any[])
}

export interface EventType {
  name: string,
  run: EventFunction,
}



