const axios = require('axios')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

const functions = {
    getBuildsAndRunes: async (msg, champion) => {

        const { data } = await axios.get(`https://app.mobalytics.gg/pt_br/lol/champions/${champion}/build`)
        
        const $ = cheerio.load(data)

        const runes = $('div.m-1izw5ay').toArray().map(item => $(item).text())
        const primaryRune = $('img.m-u9bqoh').attr().alt
        const secondaryRune = $('img.m-oa6z1e').toArray().map(item => $(item).attr().alt)

        const runesString = 
            `1️⃣ ${runes[0]}\n\t➡️ ${primaryRune}\n\t${secondaryRune.map((rune, index) => index <= 2 ? (index !== 2 ? `\t➡️ ${rune}\n\t` : `\t➡️ ${rune}\n`) : null).join('')}2️⃣ ${runes[1]}`

        console.log(secondaryRune)
        console.log(runesString)

        msg.reply(runesString)
    },
    help: (msg) => {
        msg.reply('Ajudinha de cria!')
    }
}

module.exports = functions