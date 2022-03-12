import mongoose, { Schema, } from "mongoose"


export interface Welcome {
    _id: string,
    title: string,
    channelId: string,
    welcome_message: string,
    image: string,
    color: string,
}



const welcomeSchema: Schema<Welcome> = new Schema({
    _id: {
        type: Schema.Types.String,
        required: true,
    },

    channelId: {
        type: Schema.Types.String,
        required: true,
    },

    title: {
        type: Schema.Types.String,
        default: "{username} just joined",
    },
    welcome_message: {
        type: Schema.Types.String,
        required: true,
        default: "welcome {user} to **{server_name}**"
    },

    image: {
        type: Schema.Types.String,
        default: "{user_avatar}",
    },

    color: {
        type: Schema.Types.String,
        default: "RANDOM",
    },

}, { timestamps: true })

export const welcomeModal = mongoose.model<Welcome>('welcome', welcomeSchema)
