import { SlashCommandBuilder } from "@discordjs/builders"
import { Interaction,  } from "discord.js"
import Discord from 'discord.js'


export = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping command'),

  execute(inter: Interaction){
   
  }

}


