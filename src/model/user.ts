import mongoose, { Schema } from "mongoose";


export interface user {
   _id: string,
   serverid: string,
   bal: number,
   bank: number,
   warnings: number,
}


const userSchema: Schema<user> = new Schema({
    _id: {
        type: Schema.Types.String,
        required: true,
   },

   serverid: {
       type: Schema.Types.String,
       required: true,
   },
   
   warnings: {
      type: Schema.Types.Number,
      default: 0,
   },

   bal: {
      type: Schema.Types.Number,
      default: 1000,
   },


   bank: {
      type: Schema.Types.Number,
      default: 0,
   }

    
}, {timestamps: true})


export const userModal = mongoose.model<user>("Users", userSchema)


