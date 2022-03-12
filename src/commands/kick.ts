import { Collection, GuildMember, Message, MessageEmbed } from "discord.js";
import { ErrorEmbed } from "../client";
import { Args, commandType } from "../types/commands";



export = {
    name: 'kick',
    userPermissions: ["KICK_MEMBERS"],
    aliases: [],
    descriptions: '',
    execute: async function (message: Message, args: Args) {


        try {

            if (args.length == 1) {
                const embed = ErrorEmbed('> missing args: `!kick <@user> <reason> `')
                embed.title = '**missing args**'
                embed.addField("mention user", "`required`", true)
                embed.addField('reason', '`optional`', true)
                message.channel.send({ embeds: [embed] });

                return;
            }

            const member = message.mentions.members?.first() as GuildMember

            if (member == undefined) return;

            if (member.id == message.author.id) {
                await message.delete()
                return message.channel.send("> You can't ban yourself");
            }

            if (!member.kickable) {
                const embed = new MessageEmbed({
                    title: 'fail To Kick',
                    description: "I don't have enough permission to kick this user",
                    color: "RANDOM",
                })
                return message.channel.send({ embeds: [embed] })
            }
            const reason: string = args.slice(2).join(' ') || 'none'

            const resEmbed = new MessageEmbed({
                title: "**kick alert**",
                description: `${member.user.username} was kick by ${message.author.username}`,
                color: "RANDOM",
            })
            resEmbed.addField('reason', reason, true)
            message.channel.send({ embeds: [resEmbed] })

            await member.kick(reason)
        } catch (error) {

        }
    }
}