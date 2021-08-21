require('dotenv').config()

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.login(process.env.TOKEN)
client.on('ready', () => console.log('Rodando...'))

client.on('messageCreate', msg => {
    if(msg.content.includes('!build')){
        const message = msg.content
        const contentSearch = msg.content.substr(message.indexOf(' ')).trim()
    
        console.log(contentSearch)
        msg.reply('Me chamou gatinho?')
    }

    if(msg.content === '!lolhelp'){
        msg.reply('Ajudinha de cria?')
    }
})