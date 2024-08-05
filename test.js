const axios         = require('axios')
const cheerio       = require('cheerio')
const puppeteer     = require('puppeteer')
const iconv         = require('iconv-lite')
const xml2js        = require('xml2js')

const axiosProxy = axios.create()

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

const url = "https://rutor.info"
const torrents = []

const response = await axiosProxy.get(url, {
    responseType: 'arraybuffer',
    headers: headers
})

html = iconv.decode(response.data, 'utf8')

const data = cheerio.load(html)

console.clear()

// data('#ws #index tbody tr').length
// data('#ws #index tbody tr').not('.backgr').length

// data('#ws #index tbody tr').not('.backgr').eq(0).html()
// data('#ws #index tbody tr').not('.backgr').eq(0).toString()
// data('#ws #index tbody tr').not('.backgr').eq(0).text()

// data('#ws #index tbody tr').not('.backgr').eq(0).find('td').eq(0).text()
// data('#ws #index tbody tr').not('.backgr').eq(0).find('td').eq(1).text().replace('\n','')
// data('#ws #index tbody tr').not('.backgr').eq(0).find('td a').text()
// Метод html() всегда возвращает только первый элемент, по этому или смотрим родительский элемент целиком или прогоняем через массив
// data('#ws #index tbody tr').not('.backgr').eq(0).find('td').map((index, element) => data(element).html()).get()

data('#ws #index tbody tr').not('.backgr').each((index, element) => {
    const row = data(element)
    const torrent = {
        'Date': row.find('td').eq(0).text().trim(),
        'Name': row.find('td').eq(1).find('a').last().text().trim(),
        'Magnet': row.find('td').eq(1).find('a[href^="magnet:"]').attr('href'),
        'DownloadLink': 'https://d.rutor.info' + row.find('td').eq(1).find('a.downgif').attr('href'),
        'Size': row.find('td').eq(2).text().trim(),
        'Seeders': parseInt(row.find('td').eq(3).find('span.green').text().match(/\d+/)[0] || '0', 10),
        'Leechers': parseInt(row.find('td').eq(3).find('span.red').text().match(/\d+/)[0] || '0', 10)
    }
    torrents.push(torrent)
})

console.log(JSON.stringify(torrents, null, 2))