require('dotenv').config()

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const functions = require('./functions')

client.login(process.env.TOKEN)
client.on('ready', () => console.log('Rodando...'))

client.on('messageCreate', msg => {
    if(msg.content.includes('!build')){

        const message = msg.content
        const champion = msg.content.substr(message.indexOf(' ')).trim()
    
        functions.getBuildsAndRunes(msg, champion)
    }

    if(msg.content === '!lolhelp'){
        functions.help(msg)
    }
})