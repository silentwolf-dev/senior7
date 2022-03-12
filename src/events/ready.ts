import { EventFunction } from "../types/commands"


export const name = 'ready'

export const run: EventFunction = function (client) {
    console.log('bot is online')

    client.user.setActivity('with the code', { type: 'WATCHING' })
}



