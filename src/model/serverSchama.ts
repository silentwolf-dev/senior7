import mongoose, { Schema } from "mongoose";


export interface ServerInterface {
    _id: string
}



const serverSchema: Schema<ServerInterface> = new Schema({
    _id: {
        type: Schema.Types.String,
        required: true,
    }

}, { timestamps: true })


export const serverModel = mongoose.model<ServerInterface>('serverInfo', serverSchema)



