import { DiscordErrorData } from "@discordjs/rest";
import { Interaction } from "discord.js"
import  client  from "../client"


export const name = 'interactionCreate'



export const run = (client: client, interaction: Interaction) => {
   if (!interaction.isCommand()) return;
   
   
 
   const command = client.command.get(interaction.commandName)
    
   
   try {
      command?.execute(interaction)
   } catch (error) {
      interaction.reply({
         content: "fail to Execute",
         ephemeral: true,
      })
   }
}