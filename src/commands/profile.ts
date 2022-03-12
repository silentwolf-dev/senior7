import { Message, MessageEmbed } from "discord.js";
import { userModal } from "../model/user";
import { Args } from "../types/commands";



export = {
    name: 'profile',
    guildOnly: true,
    aliases: ['pr'],
    userPermissions: [],
    description: "user Profile",
    execute: async function (message: Message, args: Args) {
        try {
            const User = await userModal.findOne({
                _id: message.author.id,
                serverid: message.guild?.id,
            })

            if (User) {

                const image = message.author.avatarURL() || message.author.defaultAvatarURL

                const Embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`${message.author.username} Profile`)
                    .addField('wallet', `_**$${User.bal}**_`, true)
                    .addField("bank", `_**$${User.bank}**_`, true)
                    .addField("warnings", `_**${User.warnings}**_`, true)
                    .setImage(image)
                await message.channel.send({ embeds: [Embed] })
                return;
            }

            await message.reply('> Sorry could not find you in the database ')

        } catch (error) {
            console.log(error)
        }

    }
}