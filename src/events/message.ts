import { Message, MessageEmbed } from "discord.js"
import { HydratedDocument } from "mongoose";
import { user, userModal } from "../model/user";
import { PermissionResolvable } from "discord.js";
import { Args, EventFunction } from "../types/commands"
import config from '../config.json'

const prefix: string = config.defaultPrefix

export const name: string = 'messageCreate'



export const run: EventFunction = async function (client, message: Message) {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args: Args = message.content.substring(prefix.length).split(/ +/)

  const commandName = args[0].toLowerCase();


  const command = client.commands.get(commandName) || client.commands.find((cmd: any) => cmd.aliases?.includes(commandName));

  if (!command) return;



  if (command.userPermissions) {
    const missingPermissions: PermissionResolvable[] = command.userPermissions.filter((perm: PermissionResolvable) => !message.member?.permissions.has(perm));
    if (missingPermissions.length > 0) {

      const PermEmbed = new MessageEmbed({
        title: "missing permissions",
        description: "You are missing permission(s) to use this command, please contact a server admin if you think this is a mistake",
        color: "RED",
      })

      missingPermissions.forEach((perm: PermissionResolvable) => {
        let number = 1;
        const name = `${number++} Missing Permission`;
        PermEmbed.addField(name, "`" + perm + "`")
      })

      return await message.channel.send({ embeds: [PermEmbed] })
    }
  }

  try {
    if (command.guildOnly && message.channel.type === "DM") return message.reply("This command can only be used in a server");

    await command.execute(message, args); // execute the command


    const user = await userModal.findOne({ _id: message.author.id, serverid: message.guildId }) // find the user in the database

    if (!user) {
      const newUser = new userModal({
        _id: message.author.id,
        serverid: message.guildId,
        bal: 0,
        bank: 0,
        warnings: 0,
      })
      await newUser.save() // save the new user
    }

  } catch (error) {
    console.error(error);
  }


}


