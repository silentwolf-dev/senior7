import  client  from "../client"
import { HydratedDocument } from "mongoose"
import { serverModel, ServerInterface } from "../model/serverSchama"
import Discord, { GuildAuditLogs } from 'discord.js'
import { ICommand } from "../types/commands"

export const name = "guildCreate"

export async function run(client: client, guild: Discord.Guild) {


   try {

      /*  const ServerInfo = await serverModel.find({ _id: guild.id })
      console.log(ServerInfo)
      
      if (!ServerInfo) {
         const guildinfo: HydratedDocument<ServerInterface> = new serverModel({
            _id: guild.id,
         })
         await guildinfo.save()
      
      }*/

   } catch (error) {
      console.log(error)
   }

}