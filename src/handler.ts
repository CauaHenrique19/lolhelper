import { Message, Client } from "discord.js";

import { getBuildsAndRunesController } from './useCases/GetBuildsAndRunes/index'
import { getCountersController } from "./useCases/GetCounters";

export class ClientHandler{
    constructor(private client : Client){}

    execute(){
        this.client.on('messageCreate', (message : Message) => {
            if(message.content.startsWith('!build')){
                getBuildsAndRunesController.handle(message)
            }
        
            if(message.content.startsWith("!counters")){
                getCountersController.handle(message)
            }
        
            // if(msg.content.startsWith('!lolhelp')){
            //     functions.help(msg)
            // }
        })
    }
}