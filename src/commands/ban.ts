import { Message, MessageEmbed } from "discord.js"
import { Command } from '../utilities/command'
import { Args } from "../types/commands"



export = {
    name: 'ban',
    userPermissions: ["BAN_MEMBERS"],
    aliases: ['b'],
    description: '',
    execute: async function (message: Message<boolean>, args: Args) {

        if (args.length == 1) {
            const Embed = new MessageEmbed()
                .setTitle('**Missing args**')
                .setDescription("> Missing args: `!ban <@user> <reason>`")
                .addField('Mention user', "`required`", true)
                .addField('reason', "`Optional`", true)
                .setColor('RANDOM')
            message.channel.send({ embeds: [Embed] })
            return;
        }

        const member = message.mentions.members?.first()

        if (member == undefined) {
            const Embed = new MessageEmbed()
                .setTitle("fail to ban user")
                .setColor('RANDOM')
                .setDescription("User doesn't exist")
            await message.channel.send({ embeds: [Embed] })
            return
        }


        if (member.id == message.author.id) {
            const Embed = new MessageEmbed()
                .setTitle("You can't ban yourself")
                .setColor("RED")
                .setDescription("Are you crazy you can't ban yourself")


            await message.channel.send({
                embeds: [Embed]
            }).catch(err => {
                console.log(err)
            })
            return;
        }


        if (!member.bannable) {
            const Embed = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`I don't have permission to ban ${member.user.username}, sorry!.`)

            await message.channel.send({
                embeds: [Embed]
            }).catch(err => {
                console.log(err)
            })

            return;
        }

        const reason = args.slice(2).join(" ") || "none"

        await member.ban({ reason: reason, days: 7 }).then(async (user) => {
            const Embed = new MessageEmbed()
                .setTitle("**Ban alert**")
                .setDescription(`${user.user.username} was ban by <@!${message.author.id}>`)
                .addField('reason', reason, true)
                .setColor('RANDOM')

            await message.channel.send({
                embeds: [Embed]
            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log(err)
        })
    }
}


