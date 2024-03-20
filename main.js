const express = require('express')
const cheerio = require('cheerio')
const axios   = require('axios')
const iconv   = require('iconv-lite')

// Configuration
const port = 8443

// Kinozal
async function kinozal(query,year,page) {
    // Если параметр не был передан, присваиваем им значения
    if (page === undefined) {
        page = 0
    }
    if (year === undefined) {
        year = 0
    }
    // Формируем url для запроса с переданными параметрами
    const url = `https://kinozal.tv/browse.php?s=${query}&d=${year}&page=${page}`
    // Создаем массив для хранения списка торрентов и html страницы
    const torrents = []
    let html
    try {
        // Выполняем GET-запрос
        const response = await axios.get(url, { responseType: 'arraybuffer' })
        // Декодируем HTML-страницу в кодировку win1251
        html = iconv.decode(response.data, 'win1251')
    } catch (error) {
        console.error("Error:", error)
        return null
    }
    // Загружаем HTML страницу с помощью cheerio
    const data = cheerio.load(html)
    // Поиск таблицы с классом t_peer и его дочерних элементов tr внутри tbody
    data('.t_peer tbody tr').each((_, element) => {
        // Проверяем, что элемент с названием не пустой (первый элемент наименование столбцов)
        const checkData = data(element).find('.nam a')
        if (checkData.length > 0) {
            // Забираем все вложенные элементы с наименованием 's'
            const s = data(element).find('.s')
            const torrent = {
                // Извлекаем из HTML страницы найденный элемент и ищем элемент с классом 'nam' и его вложенным элементом 'a'
                'Name': data(element).find('.nam a').text().trim(),
                // Извлекаем id из части url
                'Id': data(element).find('.nam a').attr('href').replace(/.+id=/,''),
                // Формируем url
                'Url': "https://kinozal.tv"+data(element).find('.nam a').attr('href'),
                // Формируем url для загрузки
                'Torrent': "https://dl.kinozal.tv" + data(element).find('.nam a').attr('href').replace(/details/, 'download'),
                // Извлекаем только первый элемент из набора трех элементов 's'
                'Size': s.eq(1).text().trim(),
                // Сиды, пиры, дата заливки и количество комментариев
                'Seeds': data(element).find('.sl_s').text().trim(),
                'Peers': data(element).find('.sl_p').text().trim(),
                'Date': s.eq(2).text().trim(),
                'Comments': s.eq(0).text().trim(),
            }
            // Добавляем в массив
            torrents.push(torrent)
        }
    })
    return torrents
}

// Fasts-Torrent
async function fastsTorrent(query) {
    const torrents = [];
    const url = `http://fasts-torrent.net/engine/ajax/search_torrent.php?title=${query}`;
    let html;
    try {
        html = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
    const $ = cheerio.load(html.data);
    $('.restable tbody tr').each((_, element) => {
        let torrent = {
            'Name': $(element).find('.torrent-title b').text().trim(),
            'Size': $(element).find('.torrent-sp').eq(0).text().trim(),
            'Torrent': "http://fasts-torrent.net" + $(element).find('.torrent-d-btn a').attr('href')
        };
        torrents.push(torrent);
    });
    return torrents;
}

//
// kinozal('the+rookie').then(result => console.log(result)).catch(error => console.error(error))
// fastsTorrent('castle').then(result => console.log(result)).catch(error => console.error(error))
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