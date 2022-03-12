import { Message } from "discord.js";
import { client } from "src/client";


export type Args = string[];


export interface ExecuteFunction {
  (message: Message<boolean>, args: Args): Promise<void> | any
}

export interface commandType {
  name: string,
  syntax?: string,
  aliases?: string[],
  guildOnly?: boolean,
  userPermissions: string[],
  description: string,
  execute: ExecuteFunction;
}
export interface EventFunction {
  (client: client, ...args: any[])
}

export interface EventType {
  name: string,
  run: EventFunction,
}



