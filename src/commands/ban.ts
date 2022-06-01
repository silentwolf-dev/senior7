import { SlashCommandBuilder } from "@discordjs/builders"
import { Interaction } from "discord.js"


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('ping command'),

    async execute(interaction: Interaction) {

    }

}