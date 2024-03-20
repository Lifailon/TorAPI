const express = require('express')
const cheerio = require('cheerio')
const axios   = require('axios')
const iconv   = require('iconv-lite')

// Configuration
const listen_port = 8443

// Kinozal
async function kinozal(query,page,year) {
    const url = `https://kinozal.tv/browse.php?s=${query}&page=${page}&d=${year}`
    const torrents = []
    let html
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' })
        // Декодируем HTML-страницу в кодировку win1251
        html = iconv.decode(response.data, 'win1251')
    } catch (error) {
        console.error("Error:", error)
        return null
    }
    // Загружаем HTML-страницу с помощью Cheerio
    const data = cheerio.load(html)
    // Поиск таблицы с классом t_peer и его дочерних элементов tr внутри tbody
    data('.t_peer tbody tr').each((_, element) => {
        // Проверяем, что элемент с названием не пустой (первый элемент наименование столбцов)
        const checkData = data(element).find('.nam a')
        if (checkData.length > 0) {
            // Ищем дочерний элемент с классом 'nam' и его вложенным элементом 'a'
            torrentName = data(element).find('.nam a')
            // Забираем текст заголовка и разбиваем его на массив
            const Title = torrentName.text().trim()
            const arrTitle = Title.split(" / ")
            // Забираем другие элементы
            const s = data(element).find('.s')
            // Разбиваем дату
            const date = s.eq(2).text().trim().split(" ")
            // Заполняем новый временный массив
            const torrent = {
                // Заполняем параметры из заголовка
                'Name': arrTitle[0],
                'OriginalName': arrTitle[1],
                'Year': arrTitle[2],
                'Language': arrTitle[3],
                'Format': arrTitle[4],
                // Извлекаем id из части url полученным из атрибута href
                'Id': torrentName.attr('href').replace(/.+id=/,''),
                // Формируем url
                'Url': "https://kinozal.tv"+torrentName.attr('href'),
                // Формируем url для загрузки торрент файла
                'Torrent': "https://dl.kinozal.tv" + data(element).find('.nam a').attr('href').replace(/details/, 'download'),
                // Извлекаем только первый элемент из набора трех элементов 's'
                'Size': s.eq(1).text().trim(),
                // Сиды, пиры, дата заливки и количество комментариев
                'Seeds': data(element).find('.sl_s').text().trim(),
                'Peers': data(element).find('.sl_p').text().trim(),
                'Date': date[0],
                'Time': date[2],
                'Comments': s.eq(0).text().trim(),
            }
            // Добавляем дочерний масиив в родительский массив
            torrents.push(torrent)
        }
    })
    return torrents
}

// Fasts-Torrent
async function fastsTorrent(query) {
    const torrents = []
    const url = `http://fasts-torrent.net/engine/ajax/search_torrent.php?title=${query}`
    let html
    try {
        html = await axios.get(url, { responseType: 'arraybuffer' })
    } catch (error) {
        console.error("Error fetching data:", error)
        return null
    }
    const data = cheerio.load(html.data)
    data('.restable tbody tr').each((_, element) => {
        let torrent = {
            'Name': data(element).find('.torrent-title b').text().trim(),
            'Size': data(element).find('.torrent-sp').eq(0).text().trim(),
            'Torrent': "http://fasts-torrent.net" + data(element).find('.torrent-d-btn a').attr('href')
        }
        torrents.push(torrent)
    })
    return torrents
}

//
// kinozal('the+rookie').then(result => console.log(result)).catch(error => console.error(error))
// fastsTorrent('test').then(result => console.log(result)).catch(error => console.error(error))
//

// Функция получения текущего времени для логирования
function getCurrentTime() {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
}

const web = express()

web.get('/api/:provider/:query/:page?/:year?', async (req, res) => {
    // Обрабатываем параметры
    let provider = (req.params.provider).toLowerCase()
    let query = req.params.query
    let page = req.params.page
    let year = req.params.year
    // Если параметр не был передан, присваиваем им значения по умолчанию
    if (page === undefined) {
        page = 0
    }
    if (year === undefined) {
        year = 0
    }
    // Логируем запросы
    console.log(`${getCurrentTime()}: [${req.method}] ${req.ip.replace('::ffff:','')} (Provider: "${provider}", Query: "${query}", Page: "${page}", Year: "${year}")`)

    // Проверяем конечные точки провайдеров
    // Kinozal
    if (provider === 'kinozal') {
        try {
            const result = await kinozal(query, page, year)
            return res.json(result)
        } catch (error) {
            console.error("Error:", error)
            return res.status(500).json({ error: 'No data' })
        }
    }

    // FastsTorrent
    else if (provider === 'faststorrent') {
        try {
            const result = await fastsTorrent(query)
            return res.json(result)
        } catch (error) {
            console.error("Error:", error)
            return res.status(500).json({error: 'No data' })
        }
    }

    // Если провайдер не обнаружен, отвечаем
    else {
        return res.json({error: 'Endpoint format: /api/<PROVIDER>/<TITLE>/<PAGE>/<YEAR>'})
    }
})

const port = process.env.PORT || listen_port
web.listen(port)
console.log(`Server is running on port: ${port}`)