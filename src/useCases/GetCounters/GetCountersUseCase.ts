import axios from "axios"
import cheerio from "cheerio"

export class GetCountersUseCase {
    async execute(champion: string) : Promise<string> {
        const res = await axios.get(`https://www.leagueofgraphs.com/pt/champions/counters/${champion}`)
        const $ = cheerio.load(res.data)

        const boxLoseTheRoute = $('.boxContainer')
            .toArray()
            .splice(1, 1)

        const loseTheRoute = $('span', $(boxLoseTheRoute).html())
            .toArray()
            .map(champion => $(champion).text())
            .splice(0, 5)

        const boxLoseMoreAgainst = $('.boxContainer')
            .last()

        const loseMoreAgainstChampion = $('span', $(boxLoseMoreAgainst).html())
            .toArray()
            .map(champion => $(champion).text())
            .splice(0, 5)

        const loseMoreAgainstWinRate = $('progressbar', $(boxLoseMoreAgainst).html())
            .toArray()
            .map(winrate => (parseFloat($(winrate).attr('data-value')) * 100).toFixed(1))
            .splice(0, 5)

        const loseTheRouteTitle = `**${champion.replace(champion.charAt(0), champion.charAt(0).toUpperCase())}** mais perdeu a rota para: \n`
        const loseTheRouteString = loseTheRoute
            .map(champion => `🗡️ ${champion}\n`)
            .join('')

        const loseMoreAgainstChampionTitle = `**${champion.replace(champion.charAt(0), champion.charAt(0).toUpperCase())}** mais perdeu contra: \n`
        const loseMoreAgainstChampionString = loseMoreAgainstChampion
            .map((champion, index) => `⚔️ ${champion}: **${loseMoreAgainstWinRate[index]}%** de winrate\n`)
            .join('')

        const finalString = `${loseTheRouteTitle}\n${loseTheRouteString}\n${loseMoreAgainstChampionTitle}\n${loseMoreAgainstChampionString}`
        return finalString
    }
}