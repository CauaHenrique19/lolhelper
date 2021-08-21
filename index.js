const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const token = 'ODc4NzI0ODI4NjY2OTUzNzI4.YSFWRQ.T1RXNi6lv_l9AQ9Nd63e-KFLQQ4'
client.login(token)

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