import { Args, ExecuteFunction } from "../types/commands";
import { MessageEmbed, Message, WelcomeChannel } from "discord.js";
import { HydratedDocument } from "mongoose";
import { welcomer } from "../utilities/welcomer";

const Welcomer = new welcomer()


export = {
    name: 'setwelcome',
    guildOnly: true,
    aliases: ['sw'],
    userPermissions: ["MANAGE_CHANNELS"],
    descrptions: "",
    execute: async function (message: Message<boolean>, args: Args) {
        const ArgEmbed = new MessageEmbed({
            title: "missing args",
            description: "Missing args: `!setwelcome <channel> <#channel>`",
        })

        if (args.length < 3) {

            return message.channel.send({
                embeds: [ArgEmbed]
            });
        }

        switch (args[1].toLowerCase()) {
            case "channel":
                Welcomer.setChannelId(message, args)
                break;
            case "message":
                Welcomer.setMessage(message, args)
                break;
            case "image":
                Welcomer.setImage(message, args)
                break;
            case "color":
                Welcomer.setColor(message, args)
                break;
        }
    }
}

