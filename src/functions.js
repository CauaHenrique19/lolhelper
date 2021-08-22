const axios = require('axios')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

const spellsData = {
    'https://fastcdn.mobalytics.gg/assets/lol/images/dd/summoner-spells/SummonerFlash.png': 'Flash',
    'https://fastcdn.mobalytics.gg/assets/lol/images/dd/summoner-spells/SummonerSmite.png': 'Smite',
    'https://fastcdn.mobalytics.gg/assets/lol/images/dd/summoner-spells/SummonerHeal.png': 'Curar',
    'https://fastcdn.mobalytics.gg/assets/lol/images/dd/summoner-spells/SummonerExhaust.png': 'Exaust',
    'https://fastcdn.mobalytics.gg/assets/lol/images/dd/summoner-spells/SummonerTeleport.png': 'Teleporte',
    'https://fastcdn.mobalytics.gg/assets/lol/images/dd/summoner-spells/SummonerDot.png': 'Ignite'
}

const functions = {
    getBuildsAndRunes: async (msg, champion) => {
        try{

            const { data } = await axios.get(`https://app.mobalytics.gg/pt_br/lol/champions/${champion}/build`)
            const $ = cheerio.load(data)

            const error = $('h2.m-14g0a0e').text()

            if(error === 'Parece que você está perdido...'){
                return msg.reply('Campeão não encontrado!')
            }
    
            const runes = $('div.m-1izw5ay')
                .toArray()
                .map(item => $(item).text())

            const primaryRune = $('img.m-u9bqoh').attr().alt

            const secondaryRune = $('img.m-oa6z1e')
                .toArray()
                .map(item => $(item).attr().alt)
    
            const primaryRuneString = 
                `1️⃣ ${runes[0]}\n\t➡️ ${primaryRune}\n\t`
            const primaryRunes = 
                `${secondaryRune.map((rune, index) => index <= 2 ? (index !== 2 ? `\t➡️ ${rune}\n\t` : `\t➡️ ${rune}\n`) : null).join('')}`
            
            const secondaryRuneString = `2️⃣${runes[1]}\n`
            const secondaryRunes = 
                `${secondaryRune.map((rune, index) => index > 2 ? (index !== 4 ? `\t➡️ ${rune}\n` : `\t➡️ ${rune}\n`) : null).join('')}`
    
            const finalStringRune = `${primaryRuneString}${primaryRunes}${secondaryRuneString}${secondaryRunes}`

            const itens = $('img', 'div.m-14bp6ot')
                .toArray()
                .reverse()
                .map((item, index) => index <= 5 ? `${$(item).attr().alt}\n` : null)
                .reverse()
                .join('')

            const spells = $('img.m-14dguf1')
                .toArray()
                .map(spell => `${spellsData[$(spell).attr().src]}\n`)
                .join('')
    
            msg.reply(`${finalStringRune}\n${itens}\n${spells}`)
        }
        catch(error){
            msg.reply(`Erro: ${error.message}`)
        }
    },
    help: (msg) => {
        msg.reply('Ajudinha de cria!')
    }
}

module.exports = functions