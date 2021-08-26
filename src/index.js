require('dotenv').config()

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const functions = require('./functions')

client.login(process.env.TOKEN)
client.on('ready', () => console.log('Rodando...'))

client.on('messageCreate', msg => {

    if(msg.content.startsWith('!build')){
        const arrayMessage = msg.content.split(' ')
        const champion = arrayMessage[1]
        const lane = arrayMessage[2] ? arrayMessage[2] : null
        functions.getBuildsAndRunes(msg, champion, lane)
    }

    if(msg.content.startsWith("!counters")){
        const arrayMessage = msg.content.split(' ')
        const champion = arrayMessage[1]
        functions.counters(msg, champion)
    }

    if(msg.content.startsWith('!lolhelp')){
        functions.help(msg)
    }
})