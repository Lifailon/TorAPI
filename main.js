const express = require('express')
const cheerio = require('cheerio')
const axios   = require('axios')
const iconv   = require('iconv-lite')

// Configuration
const listen_port = 8443

// Функция получения текущего времени для логирования
function getCurrentTime() {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
}

// Функция преобразования времени из unix timestamp
function unixTimestamp(timestamp) {
    const date = new Date(timestamp * 1000)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${day}.${month}.${year} ${hours}:${minutes}`
}

// Функция преобразования времени в формат dd.mm.yyyy
function formatDate(dateString) {
    const months = {
        'Янв': '01',
        'Фев': '02',
        'Мар': '03',
        'Апр': '04',
        'Май': '05',
        'Июн': '06',
        'Июл': '07',
        'Авг': '08',
        'Сен': '09',
        'Окт': '10',
        'Ноя': '11',
        'Дек': '12'
    };
    const parts = dateString.split(' ');
    const day = parts[0].trim();
    const month = months[parts[1].trim()];
    const year = '20' + parts[2].trim();
    return `${day}.${month}.${year}`;
}

// Изменяем имя агента в заголовке запросов (вместо 'axios/0.21.4')
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

// Kinozal
async function Kinozal(query,page,year) {
    const url = `https://kinozal.tv/browse.php?s=${query}&page=${page}&d=${year}`
    const torrents = []
    let html
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: headers
        })
        // Декодируем HTML-страницу в кодировку win-1251
        html = iconv.decode(response.data, 'win1251')
    } catch (error) {
        // Логируем вывод ошибок (например, если url недоступен)
        // console.error(error)
        console.error(`${getCurrentTime()}: [ERROR] ${error.hostname} (Code: ${error.code})`)
        return {'Result': `The ${error.hostname} server is not available`}
    }
    // Загружаем HTML-страницу с помощью Cheerio
    const data = cheerio.load(html)
    // Поиск таблицы с классом (.) t_peer, его дочернего элемента tbody и вложенных tr для перебора строк таблицы и извлечения данных из каждой строки
    data('.t_peer tbody tr').each((_, element) => {
        // Проверяем, что элемент с названием не пустой (пропустить первый элемент наименование столбцов)
        const checkData = data(element).find('.nam a')
        if (checkData.length > 0) {
            // Ищем дочерний элемент с классом 'nam' и его вложенным элементом 'a'
            torrentName = data(element).find('.nam a')
            // Забираем текст заголовка и разбиваем его на массив
            const Title = torrentName.text().trim()
            const arrTitle = Title.split(" / ")
            // Получаем количество элементов в заголовке
            // const count = arrTitle.length
            // +++ Анализ заголовка
            // Забираем все элементы 's'
            const s = data(element).find('.s')
            // Разбиваем дату из 3-его элемента массива 's'
            const date = s.eq(2).text().trim().split(" ")
            // Заполняем новый временный массив
            const torrent = {
                // Заполняем параметры из заголовка
                'Name': arrTitle[0],
                'OriginalName': arrTitle[1],
                'Year': arrTitle[2],
                'Language': arrTitle[3],
                'Format': arrTitle[4],
                'Id': torrentName.attr('href').replace(/.+id=/,''),
                'Url': "https://kinozal.tv"+torrentName.attr('href'),
                'Torrent': "https://dl.kinozal.tv" + data(element).find('.nam a').attr('href').replace(/details/, 'download'),
                'Size': s.eq(1).text().trim(),
                'Seeds': data(element).find('.sl_s').text().trim(), // раздает
                'Peers': data(element).find('.sl_p').text().trim(), // качает
                'Comments': s.eq(0).text().trim(),
                'Date': `${date[0]} ${date[2]}`
            }
            torrents.push(torrent)
        }
    })
    if (torrents.length === 0) {
        return {'Result': 'No matches were found for your title'}
    } else {
        return torrents
    }
}

// FastsTorrent
async function FastsTorrent(query) {
    const url = `http://fasts-torrent.net/engine/ajax/search_torrent.php?title=${query}`
    const torrents = []
    let html
    try {
        html = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: headers
        })
    } catch (error) {
        console.error(`${getCurrentTime()}: [ERROR] ${error.hostname} (Code: ${error.code})`)
        return {'Result': `The ${error.hostname} server is not available`}
    }
    const data = cheerio.load(html.data)
    data('.restable tbody tr').each((_, element) => {
        const torrent = {
            'Name': data(element).find('.torrent-title b').text().trim(),
            'Size': data(element).find('.torrent-sp').eq(0).text().trim(),
            'Torrent': "http://fasts-torrent.net" + data(element).find('.torrent-d-btn a').attr('href')
        }
        torrents.push(torrent)
    })
    if (torrents.length === 0) {
        return {'Result': 'No matches were found for your title'}
    } else {
        return torrents
    }
}

// NoNameClub
async function NoNameClub(query) {
    const url = `https://nnmclub.to/forum/tracker.php?nm=${query}` // &start=50
    const torrents = []
    let html
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: headers
        })
        // Декодируем HTML-страницу в кодировку win-1251
        html = iconv.decode(response.data, 'win1251')
    } catch (error) {
        console.error(`${getCurrentTime()}: [ERROR] ${error.hostname} (Code: ${error.code})`)
        return {'Result': `The ${error.hostname} server is not available`}
    }
    const data = cheerio.load(html)
    data('.forumline:eq(1) tbody tr').each((_, element) => {
        // Получаем количество элементов с классом 'gensmall'
        const count = data(element).find('.gensmall').length
        // Определяем индекс для выбора размера
        const sizeIndex = count === 4 ? 1 : count === 5 ? 2 : 1
        // Исключаем первый элемент байт из массива (slice(1))
        const size = data(element).find(`.gensmall:eq(${sizeIndex})`).text().trim().split(' ', 3).slice(1).join(' ')
        const torrent = {
            'Name': data(element).find('.genmed a b').text().trim(),
            'Id': data(element).find('.genmed a').attr('href').replace(/.+t=/,''),
            'Url': "https://nnmclub.to/forum/"+data(element).find('a:eq(1)').attr('href'),
            'Torrent': "https://nnmclub.to/forum/"+data(element).find('a:eq(3)').attr('href'),
            'Size': size,
            'Seed': data(element).find('.seedmed').text().trim(),
            'Peer': data(element).find('.leechmed').text().trim(),
            'Comments': data(element).find(`.gensmall:eq(${sizeIndex + 1})`).text().trim(),
            'Genre': data(element).find('.gen').text().trim(),
            'Genre_Link': "https://nnmclub.to/forum/"+data(element).find('.gen').attr('href'),
            // Забираем и преобразуем timestamp
            'Date': unixTimestamp(
                data(element).find(`.gensmall:eq(${sizeIndex + 2})`).text().trim().split(' ')[0]
            )
        }
        torrents.push(torrent)
    })
    if (torrents.length === 0) {
        return {'Result': 'No matches were found for your title'}
    } else {
        return torrents
    }
}

// RuTor
async function RuTor(query) {
    const url = `https://rutor.info/search/0/0/300/0/${query}` // /search/1/0/300/0/castle
    const torrents = []
    let html
    try {
        response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: headers
        })
        // Декодируем HTML-страницу в кодировку UTF-8
        html = iconv.decode(response.data, 'utf8')
    } catch (error) {
        console.error(`${getCurrentTime()}: [ERROR] ${error.hostname} (Code: ${error.code})`)
        return {'Result': `The ${error.hostname} server is not available`}
    }
    const data = cheerio.load(html)
    data('table:eq(2) tbody tr').each((_, element) => {
        const checkData = data(element).find('a:eq(2)')
        if (checkData.length > 0) {
            // Проверяем количетсов элементов 'td'
            const count = data(element).find('td').length
            // Если 5 элементов, то 3-й индекс содержит размер, если 4, то 2-й индекс
            const sizeIndex = count === 5 ? 3 : count === 4 ? 2 : 1
            // Если 5 элементов, то есть комментарии и забираем их количество из 2 индекса
            const comments = count === 5 ? data(element).find('td:eq(2)').text().trim() : count === 5 ? 0 : "0"
            const torrent = {
                'Name': data(element).find('a:eq(2)').text().trim(),
                'Id': data(element).find('a:eq(2)').attr('href').replace(/\/torrent\//g, "").replace(/\/.+/g, ""),
                'Url': "https://rutor.info" + data(element).find('a:eq(2)').attr('href'),
                'Torrent': "https:" + data(element).find('a:eq(0)').attr('href'),
                'Magnet': data(element).find('a:eq(1)').attr('href'),
                'Size': data(element).find(`td:eq(${sizeIndex})`).text().trim(),
                'Comments': comments,
                'Seed': data(element).find('.green').text().trim(),
                'Peer': data(element).find('.red').text().trim(),
                // 'Date': data(element).find('td:eq(0)').text().trim(),
                // Заменяем все символы пробела на обычные пробелы и форматируем дату
                'Date': formatDate(data(element).find('td:eq(0)').text().trim().replace(/\s+/g, ' ')),
            }
            torrents.push(torrent)
        }
    })
    if (torrents.length === 0) {
        return {'Result': 'No matches were found for your title'}
    } else {
        return torrents
    }
}

// Express
const web = express()

web.all('/:api?/:provider?/:query?/:page?/:year?', async (req, res) => {
    // Проверяем методы (пропускаем только GET)
    if (req.method !== 'GET') {
        console.log(`${getCurrentTime()} [${req.method}] ${req.ip.replace('::ffff:','')} (${req.headers['user-agent']}) [405] Method not available. Endpoint: ${req.path}`)
        return res.status(405).send(`Method not available`)
    }
    // Обрабатываем параметры
    let endpoint = req.params.api
    // Проверяем конечную точку
    if (endpoint === undefined) {
        console.log(`${getCurrentTime()} [${req.method}] ${req.ip.replace('::ffff:','')} (${req.headers['user-agent']}) [404] Endpoint not available. Endpoint: ${req.path}`)
        return res.status(404).send(`Endpoint not available`)
    }
    if (endpoint !== 'api') {
        console.log(`${getCurrentTime()} [${req.method}] ${req.ip.replace('::ffff:','')} (${req.headers['user-agent']}) [404] Endpoint not found. Endpoint: ${req.path}`)
        return res.status(404).send(`Endpoint not found`)
    }
    // Проверяем обязательные параметры
    let provider = req.params.provider
    if (provider === undefined) {
        console.log(`${getCurrentTime()} [${req.method}] ${req.ip.replace('::ffff:','')} (${req.headers['user-agent']}) [400] Provider not specified. Endpoint: ${req.path}`)
        return res.status(400).send('Provider not specified')
    }
    // Опускаем регистр
    provider = provider.toLowerCase()
    // Проверяем, что запрос не пустой
    let query = req.params.query
    if (query === undefined) {
        console.log(`${getCurrentTime()} [${req.method}] ${req.ip.replace('::ffff:','')} (${req.headers['user-agent']}) [400] Search request not specified. Endpoint: ${req.path}`)
        return res.status(400).send('Search request not specified')
    }
    // Обрабатываем остальные параметры
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
    console.log(`${getCurrentTime()} [${req.method}] ${req.ip.replace('::ffff:','')} (${req.headers['user-agent']}) [200] Endpoint: ${req.path}`)
    // Проверяем конечные точки провайдеров
    // Kinozal
    if (provider === 'kinozal') {
        try {
            const result = await Kinozal(query, page, year)
            return res.json(result)
        } catch (error) {
            console.error("Error:", error)
            return res.status(400).json(
                {Result: 'No data'}
            )
        }
    }
    // FastsTorrent
    else if (provider === 'faststorrent') {
        try {
            const result = await FastsTorrent(query)
            return res.json(result)
        } catch (error) {
            console.error("Error:", error)
            return res.status(400).json(
                {Result: 'No data'}
            )
        }
    }
    // NoNameClub
    else if (provider === 'nonameclub') {
        try {
            const result = await NoNameClub(query)
            return res.json(result)
        } catch (error) {
            console.error("Error:", error)
            return res.status(400).json(
                {Result: 'No data'}
            )
        }
    }
    // RuTor
    else if (provider === 'rutor') {
        try {
            const result = await RuTor(query)
            return res.json(result)
        } catch (error) {
            console.error("Error:", error)
            return res.status(400).json(
                {Result: 'No data'}
            )
        }
    }
    // Если провайдер не обнаружен, отвечаем
    else {
        return res.status(400).send(`Provider ${provider} not found`)
    }
})

const port = process.env.PORT || listen_port
web.listen(port)
console.log(`Server is running on port: ${port}`)