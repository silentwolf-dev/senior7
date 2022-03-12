import { Message } from "discord.js";
import { Args } from "../types/commands";
import axios from "axios";
import { ErrorEmbed } from "../client";
import { MessageEmbed } from "discord.js";



const uri = 'https://meme-api.herokuapp.com/gimme/dankmemes/2'




export = {
  name: 'meme',
  aliases: [],
  userPermissions: [],
  description: 'meme command',
  execute: async function (message: Message, args: Args) {
    try {
      const res = await axios.get(uri)
      const Embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("meme")
        .setImage(res.data.memes[1].preview[3])
        .setFooter({ text: `by ${res.data.memes[1].author}` })

      await message.channel.send({ embeds: [Embed] })
    } catch (error: any) {
      console.log(error)

      const Error = ErrorEmbed('Something when wrong when fetching the image')

      message.channel.send({ embeds: [Error] })
    }
  }

}
