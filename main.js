const express = require('express')
const cheerio = require('cheerio')
const axios   = require('axios')
const iconv   = require('iconv-lite')

// Configuration
const port = 8443

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

// Kinozal
async function kinozal(query,year,page) {
    // Если параметр не был передан, присваиваем им значения
    if (page === undefined) {
        page = 0
    }
    if (year === undefined) {
        year = 0
    }
    const url = `https://kinozal.tv/browse.php?s=${query}&d=${year}&page=${page}`
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

//
// kinozal('the+rookie').then(result => console.log(result)).catch(error => console.error(error))
// fastsTorrent('test').then(result => console.log(result)).catch(error => console.error(error))
//

const app = express()

app.get('/api/kinozal/:query/:year/:page', async (req, res) => {
    const { query, year, page } = req.params
    try {
        const result = await kinozal(query, year, page)
        res.json(result)
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

const PORT = process.env.PORT || port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})