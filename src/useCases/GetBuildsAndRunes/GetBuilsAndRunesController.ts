import { Message } from 'discord.js'
import { GetBuilsAndRunesUseCase } from "./GetBuildsAndRunesUseCase";

export class GetBuildsAndRunesController{
    constructor(private getBuildsAndRunesUseCase : GetBuilsAndRunesUseCase){}

    async handle(message: Message){
        try{
            const arrayMessage = message.content.split(' ')
            const champion = arrayMessage[1]
            const lane = arrayMessage[2] ? arrayMessage[2] : null
    
            const finalString = await this.getBuildsAndRunesUseCase.execute(champion, lane)
            message.reply(finalString)
        }
        catch(error){
            message.reply(error.message)
        }
    }
}