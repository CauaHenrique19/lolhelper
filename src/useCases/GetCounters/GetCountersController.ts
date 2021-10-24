import { Message } from 'discord.js'
import { GetCountersUseCase } from './GetCountersUseCase';

export class GetCountersController{
    constructor(private getCountersUseCase : GetCountersUseCase){}

    async handle(message: Message){
        try{
            const arrayMessage = message.content.split(' ')
            const champion = arrayMessage[1]

            const finalString = await this.getCountersUseCase.execute(champion)
            message.reply(finalString)
        }
        catch(error){
            message.reply(error.message)
        }
    }
}