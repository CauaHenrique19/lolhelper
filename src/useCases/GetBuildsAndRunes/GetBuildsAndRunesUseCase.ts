import axios from 'axios'
import cheerio from 'cheerio'

import { Lanes } from '../../Enums/LanesEnum'

export class GetBuilsAndRunesUseCase {

    spellsArray : String[] = []

    constructor(){
        this.spellsArray = [
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
    }

    async execute(champion: String, lane: String) : Promise<string> {
        const resNew = await axios.get(`https://www.leagueofgraphs.com/pt/champions/builds/${champion}/${lane ? `${Lanes[`${lane}`]}` : ''}`)
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
            .filter(spell => this.spellsArray.includes(spell))

        const title = `Runa, Build e Spells de **${champion.replace(champion.charAt(0), champion.charAt(0).toUpperCase())}**\n`
        const runeString = runes.map(rune => `🗡️ ${rune}\n`).join('')
        const itemsString = items.map(item => `📦 ${item}\n`).join('')
        const spellString = spells.map(spell => `🔮 ${spell}\n`).join('')

        const finalString = `${title}\n${runeString}\n${itemsString}\n${spellString}`
        return finalString
    }
}