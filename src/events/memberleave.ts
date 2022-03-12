import { GuildMember } from "discord.js"
import { userModal } from "../model/user"
import { EventFunction } from "../types/commands"

export const run: EventFunction = async (client, member: GuildMember)=>{
    
    
    
  try {
        const User = await userModal.findOne({
        _id: member.id,
        serverid: member.guild.id,
       })

       if(User){
          await User.delete()
       }
    } catch (error) {
        console.log(error)
    }
    
}


export const name =  "guildMemberRemove"