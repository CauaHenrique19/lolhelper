import { Message } from 'discord.js'
import { errors } from '../../Errors/Errors';
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
            const errorMessage = errors[`${error.message}`] || `Erro ao tentar encontar campeão: ${error.message}`
            message.reply(errorMessage)
        }
    }
}