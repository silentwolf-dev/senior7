import { ColorResolvable, GuildBasedChannel, GuildMember, Message, MessageEmbed, TextBasedChannel, ThreadMemberFlags } from "discord.js";
import { HydratedDocument } from "mongoose";
import { user, userModal } from "../model/user";
import { connection } from "mongoose";
import { parserOnjoin } from "../utilities/parse";
import { EventFunction } from "../types/commands";
import { welcomeModal, Welcome } from "../model/welcome";
import { converter } from "discordjs-variables";


export const run: EventFunction = async (client, member: GuildMember) => {

    const saveduser: HydratedDocument<user> = new userModal({
        _id: member.id,
        serverid: member.guild.id,
    })
    

    await saveduser.save().then((res) => {

    }).catch(err => {
        console.log(`${err} while saveing data on joined`)
    })

    try {
        const welcomer = await welcomeModal.findOne({ _id: member.guild.id })
        const parser = new converter('', {})

        if (welcomer) {
            const welcomeEmbed = new MessageEmbed({
                title: parser.parseOnJoin(member, welcomer.title),
                description: parser.parseOnJoin(member, welcomer.welcome_message),
                color: "RANDOM",

            })

            welcomeEmbed.setImage(parser.parseOnJoin(member, "{user_avatar}"))

            const channel = member.guild.channels.cache.get(welcomer.channelId) as TextBasedChannel | undefined;

            if (channel == undefined) {
                return;
            }

            await channel.send({ embeds: [welcomeEmbed] })
        }
    } catch (error) {
        console.log(error)
    }


}



export const name = "guildMemberAdd"