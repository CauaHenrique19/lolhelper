import axios from 'axios'
import cheerio from 'cheerio'

import { Lanes } from '../../Enums/LanesEnum'

export class GetBuilsAndRunesUseCase {

    spellsArray: String[] = []
    aliasChampions = {}

    constructor() {
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

        this.aliasChampions = {
            'mf': 'missfortune',
            'jarvan': 'jarvaniv',
            'lee': 'leesin',
            'blitz': 'blitzcrank',
            'voli': 'volibear',
            'tk': 'tahmkench',
            'xin': 'xinzhao',
            'fiddle': 'fiddlesticks',
            'gp': 'gangplank',
            'ww': 'warwick',
            'mundo': 'drmundo',
            'heimer': 'heimerdinger',
            'aurelion': 'aurelionsol'
        }
    }

    async execute(champion: String, lane: String): Promise<string> {
        champion = this.aliasChampions[`${champion}`] || champion

        const resNew = await axios.get(`https://www.leagueofgraphs.com/pt/champions/builds/${champion}/${lane ? `${Lanes[`${lane}`]}` : ''}`)
        const a = cheerio.load(resNew.data)

        const nameChampion = a('div.txt h2').text()

        const runes = a('img', 'div[style=""]')
            .toArray()
            .map(rune => a(rune).attr().alt)
            .splice(0, 6)

        const nodeInitialItems = a('div.medium-11')
            .first()

        const initialItems = a('img[tooltip-class="itemTooltip"][width="48"]', 'div.championSpell', nodeInitialItems)
            .toArray()
            .map((item) => a(item).attr().alt)

        const nodeBoot = a('div.medium-11')
            .last()

        const boot = a('img[tooltip-class="itemTooltip"][width="48"]', 'div.championSpell', nodeBoot)
            .toArray()
            .map((item) => a(item).attr().alt)
  
        const items = a('div.medium-13 div.iconsRow div.championSpell img[tooltip-class="itemTooltip"][width="48"]')
            .toArray()
            .map(item => a(item).attr().alt)
            
        const spells = a('img[width="48"]', 'div.championSpell')
            .toArray()
            .map(spell => a(spell).attr().alt)
            .filter(spell => this.spellsArray.includes(spell))

        const title = `Runa, Build e Spells de **${nameChampion}**\n`
        const runeString = runes.map(rune => `🗡️ ${rune}\n`).join('')
        const initialItemsString = initialItems.map(item => `⏰ ${item}\n`).join('')
        const itemsString = items.map(item => `📦 ${item}\n`).join('')
        const bootString = boot.map(boot => `👢 ${boot}\n`).join('')
        const spellString = spells.map(spell => `🔮 ${spell}\n`).join('')

        const finalString = `${title}\n**⬇️ Runa: **\n${runeString}\n**⬇️ Itens iniciais: **\n${initialItemsString}\n**⬇️ Build: **\n${itemsString}${bootString}\n**⬇️ Spells: **\n${spellString}`
        return finalString
    }
}