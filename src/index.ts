import { client } from "./client";
import mongoose from 'mongoose'
import config from './config.json'

import { converter } from "discordjs-variables"


mongoose.connect(config.uri).then(data => {
    console.log('connected to database')
}).catch(err => {
    console.log(err)
})


console.clear()
const bot = new client()


bot.start()

