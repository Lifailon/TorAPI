const express   = require('express')
const cheerio   = require('cheerio')
const axios     = require('axios')
const iconv     = require('iconv-lite')

// Configuration
const listen_port = 8443

// Имя агента в заголовке запросов (вместо 'axios/0.21.4')
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

// Cookie для автроризации на сайте RuTracker
const headers_RuTracker = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Cookie': 'bb_guid=OX8UGBHMi1DW; bb_ssl=1; bb_session=0-44590272-Sp8wQfjonpx37QjDuZUD; bb_t=a%3A5%3A%7Bi%3A6489937%3Bi%3A1709887615%3Bi%3A6496948%3Bi%3A1709891767%3Bi%3A6387499%3Bi%3A1690356948%3Bi%3A6387500%3Bi%3A1689726770%3Bi%3A6358163%3Bi%3A1684231793%3B%7D; _ym_uid=1675005035139917782; _ym_d=1697464991; _ym_isad=1; cf_clearance=3BsUm3qZLnU1DbxOWHDKEYQiqF3txcKZtck9A3SZOcs-1711117293-1.0.1.1-MoRPAGq.5IDiUQJnZGAcp5fTSwniloZIDKnaG2UR4kTy.g4TY3cGcdSDQDuRRgSGGzju3rLynXLvc1Vbzurl8A'
}

// Функция получения текущего времени для логирования
function getCurrentTime() {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
}

// Функция для преобразования номера страницы (для RuTracker и NoNameClub)
function getPage(page) {
    const pages = {
        '0' : '0',
        '1' : '50',
        '2' : '100',
        '3' : '150',
        '4' : '200',
        '5' : '250',
        '6' : '300',
        '7' : '350',
        '8' : '400',
        '9' : '450',
        '10': '500',
        '11': '550',
        '12': '600',
        '13': '650',
        '14': '700',
        '15': '750',
        '16': '800',
        '17': '850',
        '18': '900',
        '19': '950',
        '20': '1000'
    }
    return pages[page]
}

// Функция преобразования времени в формат 'dd.mm.yyyy' (для RuTracker и RuTor)
function formatDate(dateString, type) {
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
    }
    const parts = dateString.split(`${type}`)
    const day = parts[0].trim()
    const month = months[parts[1].trim()]
    const year = '20' + parts[2].trim()
    return `${day}.${month}.${year}`
}

// Функция преобразования времени из Unix Timestamp в 'dd.mm.yyyy HH:MM' (для NoNameClub)
function unixTimestamp(timestamp) {
    const date = new Date(timestamp * 1000)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${day}.${month}.${year} ${hours}:${minutes}`
}

// RuTracker
async function RuTracker(query, page) {
    // Получаем кастомный номер страницы через функцию (кратный 50)
    const p = getPage(page)
    // Список все зеркальных URL провайдера для перебора в цикле в случае недоступности одного
    const urls = [
        'https://rutracker.org/forum/tracker.php?nm=',
        'https://rutracker.net/forum/tracker.php?nm=',
        'https://rutracker.nl/forum/tracker.php?nm='
    ]
    // Переменная для отслеживания успешного выполнения запроса
    let checkUrl = false
    const torrents = []
    let html
    for (let i = 0; i < urls.length; i++) {
        const url = `${urls[i]}${query}&start=${p}`
        try {
            const response = await axios.get(url, {
                responseType: 'arraybuffer',
                headers: headers_RuTracker
            })
            // Декодируем HTML-страницу в кодировку win-1251
            html = iconv.decode(response.data, 'win1251')
            // Если удалось получить данные, выходим из цикла
            checkUrl = true
            console.log(`${getCurrentTime()} [Request] ${url}`)
            break
        } catch (error) {
            console.error(`${getCurrentTime()} [ERROR] ${error.hostname} server is not available (Code: ${error.code})`)
        }
    }
    if (!checkUrl) {
        return {'Result': `Server is not available`}
    }
    const data = cheerio.load(html)
    data('table .forumline tbody tr').each((_, element) => {
        const checkData = data(element).find('.row4 .wbr .med').text().trim()
        if (checkData.length > 0) {
            const torrent = {
                'Name': data(element).find('.row4 .wbr .med').text().trim(),
                'Id': data(element).find('.row4 .wbr .med').attr('href').replace(/.+t=/g,''),
                'Url': "https://rutracker.net/forum/" + data(element).find('.row4 .wbr .med').attr('href'),
                'Torrent': "https://rutracker.net/forum/dl.php?t=" + data(element).find('.row4 .wbr .med').attr('href').replace(/.+t=/g,''),
                // Забираем первые два значения (размер и тип данных)
                /// 'Size': data(element).find('.row4.small:eq(0)').text().trim().split(' ').slice(0,1).join(' '),
                'Size': data(element).find('a.small.tr-dl.dl-stub').text().trim().split(' ').slice(0,1).join(' '),
                'Downloads': data(element).find('td.row4.small.number-format').text().trim(),
                // Проверяем проверенный ли торрент и изменяем формат вывода
                'Checked': data(element).find('td.row1.t-ico').text().trim() === '√' ? 'True' : 'False',
                'Type': data(element).find('.row1 .f-name .gen').text().trim(),
                'Type_Link': "https://rutracker.net/forum/" + data(element).find('.row1 .f-name .gen').attr('href'),
                'Seed': data(element).find('b.seedmed').text().trim(),
                'Peer': data(element).find('td.row4.leechmed.bold').text().trim(),
                // Заменяем все символы пробела на обычные пробелы и форматируем дату (передаем пробел вторым параметром разделителя)
                'Date': formatDate(
                    data(element).find('td.row4 p').text().trim(),
                    "-"
                )
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

// Kinozal
async function Kinozal(query, page, year) {
    const urls = [
        'https://kinozal.tv/browse.php?s=',
        'https://kinozal.me/browse.php?s='
    ]
    let checkUrl = false
    const torrents = []
    let html
    for (const u of urls) {
        const url = `${u}${query}&page=${page}&d=${year}`
        try {
            const response = await axios.get(url, {
                responseType: 'arraybuffer',
                headers: headers
            })
            html = iconv.decode(response.data, 'win1251')
            checkUrl = true
            console.log(`${getCurrentTime()} [Request] ${url}`)
            break
        } catch (error) {
            console.error(`${getCurrentTime()} [ERROR] ${error.hostname} server is not available (Code: ${error.code})`)
        }
    }
    if (!checkUrl) {
        return {'Result': `Server is not available`}
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
                'Comments': s.eq(0).text().trim(),
                'Seeds': data(element).find('.sl_s').text().trim(), // раздает
                'Peers': data(element).find('.sl_p').text().trim(), // качает
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

////////// Puppeteer
const puppeteer = require('puppeteer')

async function RuTorFilesPuppeteer(query) {
    const torrents = []
    // Запускаем браузер и открываем новую пустую страницу 
    const browser = await puppeteer.launch({
        headless: true // Скрыть отображение браузера (по умолчанию)
    })
    const page = await browser.newPage()
    // Открываем страницу с ожиданием загрузки 60 сек
    await page.goto(`https://rutor.info/torrent/${query}`,{
        timeout: 60000,
        waitUntil: 'domcontentloaded' // ожидать только полной загрузки DOM (не ждать загрузки внешних ресурсов, таких как изображения, стили и скрипты)
    })
    // await page.goto(`https://rutor.info/torrent/970650`, {timeout: 60000})
    await page.evaluate(() => {
        // Находим кнопку по JavaScript пути и нажимаем на нее
        // document.querySelector("#details > tbody > tr:nth-child(11) > td.header > span").click()
        // document.querySelector("#details > tbody > tr:nth-child(12) > td.header > span").click()
        // Находим все кпноки
        const buttons = document.querySelectorAll('span.button')
        // Проходимся по найденным кнопкам
        buttons.forEach(button => {
            // Проверяем, содержит ли кнопка текст "Файлы" и нажимаем на нее
            if (button.textContent.includes('Файлы')) {
                button.click()
            }
        })
    })
    // Дождаться загрузки результатов
    // const elementHandle = await page.waitForSelector('#files')
    // Ищем элемент с идентификатором #files и проверяем, что элемент существует его содержимое не содержит текст загрузки
    await page.waitForFunction(() => {
        const element = document.querySelector('#files')
        return element && !element.textContent.includes("Происходит загрузка списка файлов...")
    }, {
        timeout: 30000, // Ожидать результат 30 секунд
        polling: 50   // Проверка каждые 50мс (по умолчанию 100мс)
    })
    // Забираем результат после успешной проверки
    const elementContent = await page.evaluate(() => {
        const element = document.querySelector('#files')
        return element ? element.textContent : null
    })
    // Закрываем браузер
    await browser.close()
    // Разбиваем на массив из строк исключая первую строку
    const lines = elementContent.trim().split('\n').slice(1)
    // Регулярное выражение для разбиения строки на название и размер
    const regex = /^(.+?)([\d.]+\s*\S+)\s+\((\d+)\)$/
    for (const line of lines) {
        const match = line.match(regex)
        const torrent = {
            'Name': match[1],
            'Size': match[2]
        }
        torrents.push(torrent)
    }
    if (torrents.length === 0) {
        return {'Result': 'No matches were found for your ID'}
    } else {
        return torrents
    }
}
////////////////////////////////////////////////////////////

// RuTor Files
async function RuTorFiles(query) {
    const url = `https://rutor.info/descriptions/${query}.files`
    const torrents = []
    let html
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: headers
        })
        // Получаем байты и преобразуем их в строку UTF-8
        html = response.data.toString('utf-8')
        console.log(`${getCurrentTime()} [Request] ${url}`)
    } catch (error) {
        console.error(`${getCurrentTime()} [ERROR] ${error.hostname} server is not available (Code: ${error.code})`)
        return {'Result': `The ${error.hostname} server is not available`}
    }
    // Оборачиваем строки таблицы в тег <table> для правильного разбора с помощью Cheerio
    const data = cheerio.load(`<table>${html}</table>`)
    data('tr').each((_, element) => {
        const torrent = {
            'Name': data(element).find('td').eq(0).text().trim(),
            'Size': data(element).find('td').eq(1).text().replace(/\(.+/g,'').trim()
        }
        torrents.push(torrent)
    })
    if (torrents.length === 0) {
        return {'Result': 'No matches were found for your ID'}
    } else {
        return torrents
    }
}

// RuTor
async function RuTor(query, page) {
    const urls = [
        'https://rutor.info/search/',
        'https://rutor.is/search/',
        // 'https://rutor.org/search/'
    ]
    let checkUrl = false
    const torrents = []
    let html
    for (const u of urls) {
        const url = `${u}${page}/0/300/0/${query}`
        try {
            const response = await axios.get(url, {
                responseType: 'arraybuffer',
                headers: headers
            })
            // Декодируем HTML-страницу в кодировку UTF-8
            html = iconv.decode(response.data, 'utf8')
            checkUrl = true
            console.log(`${getCurrentTime()} [Request] ${url}`)
            break
        } catch (error) {
            console.error(`${getCurrentTime()} [ERROR] ${error.hostname} server is not available (Code: ${error.code})`)
        }
    }
    if (!checkUrl) {
        return {'Result': `Server is not available`}
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
                // Заменяем все символы пробела на обычные пробелы и форматируем дату (передаем пробел вторым параметром разделителя)
                'Date': formatDate(
                    data(element).find('td:eq(0)').text().trim().replace(/\s+/g, ' '),
                    " "
                )
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

// NoNameClub
async function NoNameClub(query, page) {
    const p = getPage(page)
    const url = `https://nnmclub.to/forum/tracker.php?nm=${query}&start=${p}`
    const torrents = []
    let html
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: headers
        })
        // Декодируем HTML-страницу в кодировку win-1251
        html = iconv.decode(response.data, 'win1251')
        console.log(`${getCurrentTime()} [Request] ${url}`)
    } catch (error) {
        console.error(`${getCurrentTime()} [ERROR] ${error.hostname} server is not available (Code: ${error.code})`)
        return {'Result': `The ${error.hostname} server is not available`}
    }
    const data = cheerio.load(html)
    data('.forumline:eq(1) tbody tr').each((_, element) => {
        const checkData = data(element).find('.genmed a b').text().trim()
        if (checkData.length > 0) {
            // Получаем количество элементов с классом 'gensmall'
            const count = data(element).find('.gensmall').length
            // Определяем индекс для выбора размера
            const sizeIndex = count === 4 ? 1 : count === 5 ? 2 : 1
            // Исключаем первый элемент байт из массива (slice(1))
            const size = data(element).find(`.gensmall:eq(${sizeIndex})`).text().trim().split(' ', 3).slice(1).join(' ')
            const torrent = {
                'Name': data(element).find('.genmed a b').text().trim(),
                // 'Id': data(element).find('.genmed a').attr('href').replace(/.+t=/,''),
                'Url': "https://nnmclub.to/forum/"+data(element).find('a:eq(1)').attr('href'),
                'Torrent': "https://nnmclub.to/forum/"+data(element).find('a:eq(3)').attr('href'),
                'Size': size,
                'Comments': data(element).find(`.gensmall:eq(${sizeIndex + 1})`).text().trim(),
                'Type': data(element).find('.gen').text().trim(),
                'Type_Link': "https://nnmclub.to/forum/"+data(element).find('.gen').attr('href'),
                'Seed': data(element).find('.seedmed').text().trim(),
                'Peer': data(element).find('.leechmed').text().trim(),
                // Забираем и преобразуем timestamp
                'Date': unixTimestamp(
                    data(element).find(`.gensmall:eq(${sizeIndex + 2})`).text().trim().split(' ')[0]
                )
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
        console.log(`${getCurrentTime()} [Request] ${url}`)
    } catch (error) {
        console.error(`${getCurrentTime()} [ERROR] ${error.hostname} server is not available (Code: ${error.code})`)
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
    if (provider === 'all') {
        try {
            const RuTrackerResult = await RuTracker(query, page)
            const KinozalResult = await Kinozal(query, page)
            const RuTorResult = await RuTor(query, page)
            const NoNameClubResult = await NoNameClub(query, page)
            // Объединяем результаты в один массив
            const Results = {
                RuTracker: RuTrackerResult,
                Kinozal: KinozalResult,
                RuTor: RuTorResult,
                NoNameClub: NoNameClubResult
            }
            return res.json(Results)
        } catch (error) {
            console.error("Error:", error)
            return res.status(400).json({ Result: 'No data' })
        }
    }
    // RuTracker
    else if (provider === 'rutracker') {
        try {
            const result = await RuTracker(query, page)
            return res.json(result)
        } catch (error) {
            console.error("Error:", error)
            return res.status(400).json(
                {Result: 'No data'}
            )
        }
    }
    // Kinozal
    else if (provider === 'kinozal') {
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
    // RuTor Files
    else if (provider === 'rutor' && /^\d{5,}$/.test(query)) {
        try {
            // const result = await RuTorFilesPuppeteer(query)
            const result = await RuTorFiles(query)
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
            const result = await RuTor(query, page)
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
            const result = await NoNameClub(query, page)
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
    // Если провайдер не обнаружен, отвечаем
    else {
        return res.status(400).send(`Provider ${provider} not found`)
    }
})

const port = process.env.PORT || listen_port
web.listen(port)
console.log(`Server is running on port: ${port}`)