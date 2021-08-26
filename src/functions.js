const axios = require('axios')
const cheerio = require('cheerio')

/*
const spellsData = {
    'https://fastcdn.mobalytics.gg/assets/lol/images/dd/summoner-spells/SummonerFlash.png': 'Flash',
    'https://fastcdn.mobalytics.gg/assets/lol/images/dd/summoner-spells/SummonerSmite.png': 'Smite',
    'https://fastcdn.mobalytics.gg/assets/lol/images/dd/summoner-spells/SummonerHeal.png': 'Curar',
    'https://fastcdn.mobalytics.gg/assets/lol/images/dd/summoner-spells/SummonerExhaust.png': 'Exhaust',
    'https://fastcdn.mobalytics.gg/assets/lol/images/dd/summoner-spells/SummonerTeleport.png': 'Teleporte',
    'https://fastcdn.mobalytics.gg/assets/lol/images/dd/summoner-spells/SummonerDot.png': 'Ignite',
    'https://fastcdn.mobalytics.gg/assets/lol/images/dd/summoner-spells/SummonerBarrier.png': 'Barreira',
    'https://fastcdn.mobalytics.gg/assets/lol/images/dd/summoner-spells/SummonerHaste.png': 'Ghost'
}
*/

const spellsd = [
    'Flash',
    'Incendiar',
    'Teleporte',
    'Curar',
    'Exaustão',
    'Barreira',
    'Fantasma',
    'Purificar',
    'Golpear'
]

const lanes = {
    'suporte' : 'support',
    'sup': 'support',
    'jg' : 'jungle',
    'mid': 'middle'
}

const functions = {
    getBuildsAndRunes: async (msg, champion, lane) => {
        try{

            //const res = await axios.get(`https://app.mobalytics.gg/pt_br/lol/champions/${champion}/build${lane ? `?role=${lane}` : ''}`)

            const resNew = await axios.get(`https://www.leagueofgraphs.com/pt/champions/builds/${champion}/${lane ? `${lanes[lane]}` : ''}`)
            const a = cheerio.load(resNew.data)

            const runes = a('img', 'div[style=""]')
                .toArray()
                .map(rune => a(rune).attr().alt)
                .splice(0, 6)

            const items = [...new Set(
                a('img[width="48"]', 'div.championSpell')
                    .toArray()
                    .map((item, index) => index > 5 && index < 13 ? a(item).attr().alt : '')
                    .filter(item => !!item)
                )
            ]

            const spells = a('img[width="48"]', 'div.championSpell')
                .toArray()
                .map(spell => a(spell).attr().alt)
                .filter(spell => spellsd.includes(spell))

            const title = `Runa, Build e Spells de **${champion.replace(champion.charAt(0), champion.charAt(0).toUpperCase())}**\n`
            const runeString = runes.map(rune => `🗡️ ${rune}\n`).join('')
            const itemsString = items.map(item => `📦 ${item}\n`).join('')
            const spellString = spells.map(spell => `🔮 ${spell}\n`).join('')

            const finalString = `${title}\n${runeString}\n${itemsString}\n${spellString}`
            msg.reply(finalString)
            
            /*
            const $ = cheerio.load(res.data)
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
                `1️⃣ **${runes[0]}**\n\t➡️ ${primaryRune}\n\t`
            const primaryRunes = 
                `${secondaryRune.map((rune, index) => index <= 2 ? (index !== 2 ? `\t➡️ *${rune}*\n\t` : `\t➡️ *${rune}*\n`) : null).join('')}`
            
            const secondaryRuneString = `**2️⃣ ${runes[1]}**\n`
            const secondaryRunes = 
                `${secondaryRune.map((rune, index) => index > 2 ? (index !== 4 ? `\t➡️ *${rune}*\n` : `\t➡️ *${rune}*\n`) : null).join('')}`
    
            const finalStringRune = `${primaryRuneString}${primaryRunes}${secondaryRuneString}${secondaryRunes}`

            const itens = $('img', 'div.m-14bp6ot')
                .toArray()
                .reverse()
                .map((item, index) => index <= 5 ? `📦 ${$(item).attr().alt}\n` : null)
                .reverse()
                .join('')

            const spells = $('img.m-14dguf1')
                .toArray()
                .map(spell => `🔮 • ${spellsData[$(spell).attr().src]}\n`)
                .join('')
            
            $().end()
            return msg.reply(`${finalStringRune}\n${itens}\n${spells}`)
            */
        }
        catch(error){
            msg.reply(`Erro: ${error.message}`)
        }
    },
    counters: async (msg, champion) => {
        const res = await axios.get(`https://app.mobalytics.gg/pt_br/lol/champions/${champion}/counters`)
        const $ = cheerio.load(res.data)

        const error = $('h2.m-14g0a0e').text()

        if(error === 'Parece que você está perdido...'){
            return msg.reply('Campeão não encontrado!')
        }

        const champions = $('.m-wn7d10')
            .toArray()
            .map((counter, index) => index <= 5 ? $(counter).text() : '')

        const wr = $('span[style="color:#FFFFFF"]')
            .toArray()
            .map((wr, index) => index <= 5 ? $(wr).text() : '')

        const arrayWithChampionsAndWr = champions.map((champion, index) => ({ champion, winrate: wr[index] }))
        arrayWithChampionsAndWr.shift()
        
        arrayWithChampionsAndWr.sort((a, b) => {
            if(a.winrate < b.winrate) return 1
            if(a.winrate > b.winrate) return -1
            return 0
        })

        const titleString = `Campeões counters de **${champion}**:\n\n`

        const stringCounters = arrayWithChampionsAndWr
            .map(counter => counter.champion && `⚔️ ${counter.champion}: **${counter.winrate}** de winrate\n`)
            .join('')

        msg.reply(`${titleString}${stringCounters}`)
    },
    help: (msg) => {
        msg.reply(
            `❓ Atualmente existem 2 comandos para serem utilizados:\n\n **!build NOMEDOCAMPEAO**\n\t*responsável por retornar a runa, build e spells do campeão*\n**!counters NOMEDOCAMPEAO**\n\t*responsável por retornar os 5 primeiros counters do campeão*`
        )
    }
}

module.exports = functions