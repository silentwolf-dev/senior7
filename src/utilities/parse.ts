import { GuildMember, Message } from "discord.js"


export function parserOnjoin(sentence: string, member: GuildMember ): string {
    const msg = sentence
            .replace(new RegExp("{username}", "gm"),  member.user.username)
            .replace(new RegExp("{GuildName}", "gm"), member.guild.name)
            .replace(new RegExp("{Member.Mention}", "gm",), `<@!${member.id}>` )
            .replace(new RegExp("{Member.discriminator}", "gm",), member.user.discriminator )
            .replace(new RegExp("{GuildIcon}", "gm",), member.guild.icon || "https://i.ibb.co/qjL4Vvj/download.jpg" )
            .replace(new RegExp("{avatar}", "gm",),  member.displayAvatarURL())
            .replace(new RegExp("{MemberID}", "gm"), member.id)
            .replace(new RegExp("{Member}", 'gm'), `${member.user.username}#${member.user.discriminator}`)

    return msg
}



    

