import {
    Message, MessageEmbed,
} from "discord.js";
import { HydratedDocument } from "mongoose";
import { welcomeModal, Welcome } from "../model/welcome";
import { validateHTMLColorHex } from "validate-color"




export class welcomer {
    constructor() {

    }

    public async setChannelId(message: Message<boolean>, args: string[]) {
        try {

            const channel = message.mentions.channels.first()

            if (channel == undefined) return;

            const welcomeChannel = await welcomeModal.findOne({ _id: message.guild?.id })

            if (welcomeChannel) {

                const successEmbed = new MessageEmbed({
                    title: "Updated",
                    description: "successfully updated channel id",
                    color: "RANDOM",
                })

                welcomeChannel.channelId = channel.id;

                await welcomeChannel.save()

                await message.channel.send({ embeds: [successEmbed] })
                return;
            }
            const successembed = new MessageEmbed({
                title: "welcomer created",
                description: `New welcomer created, ${channel.id} saved`,
                color: "RANDOM"
            })

            await welcomeModal.create({
                _id: message.guild?.id,
                channelId: channel.id,
            })

            message.channel.send({ embeds: [successembed] })


        } catch (error) {
            console.log(error)
        }
    }


    public async setTitle(message: Message<boolean>, args: string[]) {
        try {

            const title = args.slice(2).join(" ")

            const dbTitle = await welcomeModal.findOne({
                _id: message.guild?.id,
            })

            if (dbTitle) {

                dbTitle.title = title;

                await dbTitle.save()

                const successEmbed = new MessageEmbed({
                    title: "welcomer title Updated",
                    description: "title has been set to" + "`" + title + "`",
                    color: "RANDOM",
                })

                await message.channel.send({ embeds: [successEmbed] })

            } else {
                const failEmbed = new MessageEmbed({
                    title: "Error",
                    description: "Please set the channelid before setting the title.",
                    color: "RANDOM",
                })

                await message.channel.send({ embeds: [failEmbed] })
            }


        } catch (error) {
            console.log(error)
        }
    }

    public async setMessage(message: Message<boolean>, args: string[]) {
        try {
            const msg = args.slice(2).join(" ")

            const dbmessage = await welcomeModal.findOne({
                _id: message.guildId
            })

            if (dbmessage) {
                dbmessage.welcome_message = msg;

                const successEmbed = new MessageEmbed({
                    title: "welcomer title Updated",
                    description: "Welcome message has been updated",
                    color: "RANDOM",
                }).addField("welcome message", msg, true)

                await dbmessage.save()

                await message.channel.send({ embeds: [successEmbed] })
            } else {
                const failEmbed = new MessageEmbed({
                    title: "Error",
                    description: "Please set the channelid before setting the welcome message.",
                    color: "RANDOM",
                })

                await message.channel.send({ embeds: [failEmbed] })
            }

        } catch (error) {
            console.log(error)
        }
    }

    public async setImage(message: Message<boolean>, args: string[]) {
        try {
            const url = args[3]

            const dburl = await welcomeModal.findOne({
                _id: message.guildId,
            })

            if (dburl) {
                dburl.image = url;

                const successEmbed = new MessageEmbed({
                    title: "welcomer image Updated",
                    description: "Welcome image has been updated",
                    color: "RANDOM",
                })

                await dburl.save()
                await message.channel.send({ embeds: [successEmbed] })
            } else {
                const failEmbed = new MessageEmbed({
                    title: "Error",
                    description: "Please set the channelid before setting welcome image.",
                    color: "RANDOM",
                })
                await message.channel.send({ embeds: [failEmbed] })
            }
        } catch (error) {
            console.log(error)
        }
    }

    public async setColor(message: Message<boolean>, args: string[]) {
        const color = args[3]

        if (!validateHTMLColorHex(color)) {
            message.channel.send("> hex color is not vaild")
            return;
        }
        const db = await welcomeModal.findOne({
            _id: message.guildId,
        })

        if (db) {
            db.color = color;

            const successEmbed = new MessageEmbed({
                title: "welcomer color Updated",
                description: "Welcome image has been updated",
                color: "RANDOM",
            })

            await db.save()
        } else {
            const failEmbed = new MessageEmbed({
                title: "Error",
                description: "Please set the channelid before setting welcome color",
                color: "RANDOM",
            })

            await message.channel.send({ embeds: [failEmbed] })
        }
    }

}


