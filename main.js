const express   = require('express')
const cheerio   = require('cheerio')
const axios     = require('axios')
const iconv     = require('iconv-lite')
const puppeteer = require('puppeteer')

// Configuration
const listen_port = 8443

// Использовать Puppeteer для получения списка файлов
// Требуется стабильное VPN подключение (не работает в режиме split tunneling через Hotspot Shield)
const RuTrackerFiles = true

// Имя агента в заголовке запросов (вместо 'axios/0.21.4')
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

// Cookie для автроризации на сайте RuTracker
const headers_RuTracker = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Cookie': 'bb_guid=OX8UGBHMi1DW; bb_ssl=1; bb_session=0-44590272-Sp8wQfjonpx37QjDuZUD; bb_t=a%3A5%3A%7Bi%3A6489937%3Bi%3A1709887615%3Bi%3A6496948%3Bi%3A1709891767%3Bi%3A6387499%3Bi%3A1690356948%3Bi%3A6387500%3Bi%3A1689726770%3Bi%3A6358163%3Bi%3A1684231793%3B%7D; _ym_uid=1675005035139917782; _ym_d=1697464991; _ym_isad=1; cf_clearance=3BsUm3qZLnU1DbxOWHDKEYQiqF3txcKZtck9A3SZOcs-1711117293-1.0.1.1-MoRPAGq.5IDiUQJnZGAcp5fTSwniloZIDKnaG2UR4kTy.g4TY3cGcdSDQDuRRgSGGzju3rLynXLvc1Vbzurl8A'
}

// Cookie для автроризации на сайте Kinozal
const headers_Kinozal = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Cookie': 'uid=20631917; pass=KOJ4DJf1VS; chash=4GPagC3lyL; _ma=bd5e8639-b468-45ee-b985-a37d236b69d9; _ym_uid=1676045081150190531; adrcid=AyOHe7Bo41EA-dljunU4d4g; adtech_uid=e2dc7224-a3e7-4668-bb1a-e66540433903%3Akinozal.tv; top100_id=t1.7627570.1643663093.1685299403536; last_visit=1685288911412%3A%3A1685299711412; t3_sid_7627570=s1.1160736113.1685299403538.1685299712381.1.18; _ac_oid=e8d96ae4a3e0ddf7f1dc00adeb090382%3A1685329226280; _buzz_fpc=JTdCJTIycGF0aCUyMiUzQSUyMiUyRiUyMiUyQyUyMmRvbWFpbiUyMiUzQSUyMi5raW5vemFsLnR2JTIyJTJDJTIyZXhwaXJlcyUyMiUzQSUyMlRodSUyQyUyMDEyJTIwU2VwJTIwMjAyNCUyMDIwJTNBMzAlM0ExMiUyMEdNVCUyMiUyQyUyMlNhbWVTaXRlJTIyJTNBJTIyTGF4JTIyJTJDJTIydmFsdWUlMjIlM0ElMjIlN0IlNUMlMjJ1ZnAlNUMlMjIlM0ElNUMlMjJmNTFiNzlkYzk1MDgxMGM0NTMwMzhmNWNmMWU5ZDQwYiU1QyUyMiUyQyU1QyUyMmJyb3dzZXJWZXJzaW9uJTVDJTIyJTNBJTVDJTIyMTE2LjAlNUMlMjIlN0QlMjIlN0Q=; _ym_d=1701461342; la_page_depth=%7B%22last%22%3A%22https%3A%2F%2Fkinozal.tv%2Fbrowse.php%3Fs%3Dcastle%26g%3D0%26c%3D0%26v%3D0%26d%3D2020%26w%3D0%26t%3D0%26f%3D0%22%2C%22depth%22%3A400%7D; page_load_uuid=c29f5be0-f58b-49c2-bb75-90ba88038c6d'
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

// RuTracker ID
async function RuTrackerID(query) {
    const url = `https://rutracker.org/forum/viewtopic.php?t=${query}`
    const torrents = []
    let html
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: headers_RuTracker
        })
        html = iconv.decode(response.data, 'win1251')
        console.log(`${getCurrentTime()} [Request] ${url}`)
    } catch (error) {
        console.error(`${getCurrentTime()} [ERROR] ${error.hostname} server is not available (Code: ${error.code})`)
        return {'Result': `The ${error.hostname} server is not available`}
    }
    const data = cheerio.load(html)
    let Name =  data('a#topic-title').text().trim()
    // Hash
    let Hash = data('a[href*="magnet:?xt=urn:btih:"]').attr('href').replace(/.+btih:|&.+/g,'')
    // Получение ссылки на загрузку торрент файла (по поиску части содержимого атрибута и по классу необходимы Cookie)
    // let Torrent = data('a[href*="dl.php?t="]').attr('href')
    // let Torrent = data('a.dl-stub.dl-link.dl-topic').attr('href')
    let Torrent = `https://rutracker.org/forum/dl.php?t=${query}`
    // IMDb
    let imdb
    data('a[href*="imdb.com"]').each((index, element) => {
        const href = data(element).attr('href')
        if (href.includes('imdb.com')) {
            imdb = href
            return false
        }
    })
    if (!imdb) {
        imdb = ""
    }
    // Kinopoisk
    let kp
    data('a[href*="kinopoisk.ru"]').each((index, element) => {
        const href = data(element).attr('href')
        if (href.includes('kinopoisk.ru')) {
            kp = href
            return false
        }
    })
    if (!kp) {
        kp = ""
    }
    // Год выпуска
    const Year = (() => {
        const element = data('span.post-b:contains("Год")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Страна
    let Release = (() => {
        const element = data('span.post-b:contains("Страна")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Жанр
    const Type = (() => {
        const element = data('span.post-b:contains("Жанр")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Продолжительность
    const Duration = (() => {
        const element = data('span.post-b:contains("Продолжительность")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Перевод
    const Audio = (() => {
        const element = data('span.post-b:contains("Перевод")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Режиссёр
    const Directer = (() => {
        const element = data('span.post-b:contains("Режиссёр")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // В ролях
    const Actors = (() => {
        const element = data('span.post-b:contains("В ролях")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Описание
    const Description = (() => {
        const element = data('span.post-b:contains("Описание")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Качество
    const videoQuality = (() => {
        const element = data('span.post-b:contains("Качество")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Видео
    const Video = (() => {
        const element = data('span.post-b:contains("Видео")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Puppeteer
    if (RuTrackerFiles == true) {
        // Запускаем браузер
        const browser = await puppeteer.launch({
            // Скрыть отображение браузера (по умолчанию)
            headless: true
        })
        // Открываем новую пустую страницу 
        const page = await browser.newPage()
        // Устанавливаем Cookie
        const cookies = [
            { name: '_ym_d', value: '1713608104', domain: '.rutracker.org', path: '/' },
            { name: '_ym_isad', value: '1', domain: '.rutracker.org', path: '/' },
            { name: '_ym_uid', value: '1675005035139917782', domain: '.rutracker.org', path: '/' },
            { name: 'bb_guid', value: 'OX8UGBHMi1DW', domain: '.rutracker.org', path: '/' },
            { name: 'bb_session', value: '0-44590272-Sp8wQfjonpx37QjDuZUD', domain: '.rutracker.org', path: '/' },
            { name: 'bb_ssl', value: '1', domain: '.rutracker.org', path: '/' },
            { name: 'bb_t', value: 'a%3A6%3A%7Bi%3A6487040%3Bi%3A1711832640%3Bi%3A6489937%3Bi%3A1712340699%3Bi%3A6496948%3Bi%3A1709891767%3Bi%3A6387499%3Bi%3A1690356948%3Bi%3A6387500%3Bi%3A1689726770%3Bi%3A6358163%3Bi%3A1684231793%3B%7D', domain: '.rutracker.org', path: '/' },
            { name: 'cf_clearance', value: 'Nru732Vi6LTb.p_fm1orml.24cTnJtFB6eQ2Qn1dw6g-1714060753-1.0.1.1-nWAl13hHBBGeHcJNVjYB5VcI65OaR26C46BKP6Wyrkj6n2k4Eu2SQ.17JdRXKcM.lnsEFGPHGxDaktfSzmFVZw', domain: '.rutracker.org', path: '/' }
        ]
        for (const cookie of cookies) {
            await page.setCookie(cookie)
        }
        // Открываем страницу
        // await page.goto(`https://rutracker.org/forum/viewtopic.php?t=6489937`, {timeout: 60000, waitUntil: 'domcontentloaded'})
        await page.goto(url,{
            // Ожиданием загрузку страницы 60 секунд
            timeout: 60000,
            // Ожидать только полной загрузки DOM (не ждать загрузки внешних ресурсов, таких как изображения, стили и скрипты)
            waitUntil: 'domcontentloaded'
        })
        // Ожидаем загрузку кнопки на странице
        await page.waitForSelector('.lite');
        // Метод выполнения JavaScript в контексте страницы браузера
        await page.evaluate(() => {
            // Находим кнопку по пути JavaScript (по id) и нажимаем на нее
            document.querySelector("#tor-filelist-btn").click()
            // Находим все кпноки (по классу или id)
            // const buttons = document.querySelectorAll('.lite')
            // const buttons = document.querySelectorAll('#tor-filelist-btn')
            // Проходимся по найденным кнопкам
            // buttons.forEach(button => {
            //     // Проверяем, содержит ли кнопка текст "Список файлов" и нажимаем на нее
            //     if (button.textContent.includes('Список файлов')) {
            //         button.click()
            //     }
            // })
        })

        // Дожидаемся загрузки нового элемента
        // const elementHandle = await page.waitForSelector('#tor-filelist')
        // Находим элемент с идентификатором #tor-filelist или по классу .med.ftree-windowed
        await page.waitForFunction(() => {
            // Первый аргумент функция с условием, которая должна вернуть true
            const element = document.querySelector('#tor-filelist')
            // Проверяем, что элемент существует и его содержимое не содержит текст загрузки
            return element && !element.textContent.includes("загружается...")
        }, 
        // Опции
        {
            // Ожидать результат 30 секунд (по умолчанию)
            timeout: 30000,
            // Проверка каждые 50мс (по умолчанию 100мс)
            polling: 50
        })
        // После успешной проверки возвращаем результат, используя метод textContent, innerText (массив) или innerHTML (включая HTML-разметку внутри элемента) или null
        const elementTable = await page.evaluate(() => {
            const element = document.querySelector('#tor-filelist')
            return element ? element.innerHTML : null
        })
        // Закрываем браузер
        await browser.close()
        // Заполняем массив
        const dataFiles = cheerio.load(elementTable)
        dataFiles('li.file').each((index, element) => {
            const fileName = dataFiles(element).find('b').text().trim()
            const fileSize = dataFiles(element).find('s').text().trim()
            torrents.push({
                name: fileName,
                size: fileSize
            })
        })
    }
    return {
        Name: Name,
        Hash: Hash,
        Torrent: Torrent,
        IMDb_link: imdb,
        Kinopoisk_link: kp,
        IMDb_id: imdb.replace(/[^0-9]/g, ''),
        Kinopoisk_id: kp.replace(/[^0-9]/g, ''),
        Year: Year.replace(/:\s/g,''),
        Release: Release.replace(/:\s/g,''),
        Type: Type.replace(/:\s/g,''),
        Duration: Duration.replace(/:\s/g,'').replace(/~ |~/g,''),
        Audio: Audio.replace(/:\s/g,''),
        Directer: Directer.replace(/:\s/g,''),
        Actors: Actors.replace(/:\s/g,''),
        Description: Description.replace(/:\s/g,''),
        Video_Quality: videoQuality.replace(/:\s/g,''),
        Video: Video.replace(/:\s/g,''),
        Files: torrents
    }
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

// Kinozal ID
async function KinozalID(query) {
    const url = `https://kinozal.tv/details.php?id=${query}`
    const torrents = []
    let html
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: headers
        })
        html = iconv.decode(response.data, 'win1251')
        console.log(`${getCurrentTime()} [Request] ${url}`)
    } catch (error) {
        console.error(`${getCurrentTime()} [ERROR] ${error.hostname} server is not available (Code: ${error.code})`)
        return {'Result': `The ${error.hostname} server is not available`}
    }
    const data = cheerio.load(html)
    // Hash and files
    const url_get_srv_details = `https://kinozal.tv/get_srv_details.php?id=${query}&action=2`
    let html2
    try {
        const response = await axios.get(url_get_srv_details, {
            responseType: 'arraybuffer',
            headers: headers_Kinozal
        })
        html2 = iconv.decode(response.data, 'utf8')
        console.log(`${getCurrentTime()} [Request] ${url}`)
    } catch (error) {
        console.error(`${getCurrentTime()} [ERROR] ${error.hostname} server is not available (Code: ${error.code})`)
        return {'Result': `The ${error.hostname} server is not available`}
    }
    data2 = cheerio.load(html2)
    // IMDb
    let imdb
    data('a[href*="imdb.com"]').each((index, element) => {
        const href = data(element).attr('href')
        if (href.includes('imdb.com')) {
            imdb = href
            return false
        }
    })
    if (!imdb) {
        imdb = ""
    }
    // Kinopoisk
    let kp
    data('a[href*="kinopoisk.ru"]').each((index, element) => {
        const href = data(element).attr('href')
        if (href.includes('kinopoisk.ru')) {
            kp = href
            return false
        }
    })
    if (!kp) {
        kp = ""
    }
    const torrent = {
        'Original': (() => {
            // Обращаемся к элементу b по наименованию контейнера
            const element = data('div.mn1_content .bx1 b:contains("Оригинальное название:")')[0]
            // Проверяем наличие контейнера (что оно не является null или undefined)
            if (element) {
                // Свойство DOM, которое возвращает следующий узел после элемента <b>
                const nextNode = element.nextSibling
                // Используем тернарный оператор, проверяем, что nextNode не является null или undefined и тип узла равен текстовому значению DOM
                return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : '' // Возвращаем текстовое содержимое узла или пустое значение
            } else {
                return ''
            }
        })(),
        'Title': (() => {
            const element = data('div.mn1_content .bx1 b:contains("Название:")')[0]
            if (element) {
                const nextNode = element.nextSibling
                return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
            } else {
                return ''
            }
        })(),
        'Hash': data2('li').eq(0).text().replace(/.+:/,'').trim(),
        'IMDb_link': imdb,
        'Kinopoisk_link': kp,
        'IMDB_id': imdb.replace(/[^0-9]/g, ''),
        'Kinopoisk_id': kp.replace(/[^0-9]/g, ''),
        // Находим нужный контейнер который содержит год выпуска и забираем текстовое значение следующего узла
        'Year': data('div.mn1_content .bx1 b:contains("Год выпуска:")')[0].nextSibling.nodeValue.trim(),
        'Type': data('div.mn1_content').find('.lnks_tobrs').eq(0).text().trim(),
        'Release': data('div.mn1_content').find('.lnks_tobrs').eq(1).text().trim(),
        'Directer': data('div.mn1_content').find('.lnks_toprs').eq(0).text().trim(),
        'Actors': data('div.mn1_content').find('.lnks_toprs').eq(1).text().trim(),
        // 'Description': data('div.mn1_content').find('.bx1.justify:eq(2) p b').eq(0)[0].nextSibling.nodeValue.trim(),
        'Description': data('div#main div.content div.mn_wrap div.mn1_content div.bx1.justify p')
        .clone()       // Клонируем элемент, чтобы не модифицировать исходный
        .children('b') // Выбираем все дочерние элементы 'b'
        .remove()      // Удаляем их
        .end()         // Возвращаемся к исходному элементу
        .text().trim(),
        'Quality': data('div.mn1_content').find('.justify.mn2.pad5x5 b').eq(0)[0].nextSibling.nodeValue.trim(),
        'Video': data('div.mn1_content').find('.justify.mn2.pad5x5 b').eq(1)[0].nextSibling.nodeValue.trim(),
        'Audio': data('div.mn1_content').find('.justify.mn2.pad5x5 b').eq(2)[0].nextSibling.nodeValue.trim(),
        'Size': data('div.mn1_content').find('.justify.mn2.pad5x5 b').eq(3)[0].nextSibling.nodeValue.trim(),
        'Duration': data('div.mn1_content').find('.justify.mn2.pad5x5 b').eq(4)[0].nextSibling.nodeValue.trim(),
        'Transcript': data('div.mn1_content').find('.justify.mn2.pad5x5 b').eq(5)[0].nextSibling.nodeValue.trim(),
        'Seeds': data('div.mn1_menu').find('span.floatright').eq(0).text().trim(),
        'Peers': data('div.mn1_menu').find('span.floatright').eq(1).text().trim(),
        'Downloaded': data('div.mn1_menu').find('span.floatright').eq(2).text().trim(),
        'Files': data('div.mn1_menu').find('span.floatright').eq(3).text().trim(),
        'Comments': data('div.mn1_menu').find('span.floatright').eq(4).text().trim(),
        'IMDb': data('div.mn1_menu').find('span.floatright').eq(5).text().trim(),
        'Kinopoisk': data('div.mn1_menu').find('span.floatright').eq(6).text().trim(),
        'Kinozal': data('div.mn1_menu').find('span.floatright').eq(7).text().trim().replace(/\s.+/,''),
        'Votes': data('div.mn1_menu').find('span.floatright').eq(8).text().trim(),
        'Size': data('div.mn1_menu').find('span.floatright.green.n').eq(0).text().replace(/\(.+/,'').trim(),
        'Added': data('div.mn1_menu').find('span.floatright.green.n').eq(1).text().trim(),
        'Update': data('div.mn1_menu').find('span.floatright.green.n').eq(2).text().trim()
    }
    torrents.push(torrent)
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
                'Name': arrTitle[0].trim(),
                'Id': torrentName.attr('href').replace(/.+id=/,''),
                'OriginalName': arrTitle[1].trim(),
                'Year': arrTitle[2].trim(),
                'Language': arrTitle[3].trim(),
                'Format': arrTitle[4],
                'Url': "https://kinozal.tv"+torrentName.attr('href'),
                'Torrent': "https://dl.kinozal.tv" + data(element).find('.nam a').attr('href').replace(/details/, 'download'),
                'Size': s.eq(1).text().trim(),
                'Comments': s.eq(0).text().trim(),
                // Раздает (Seeds)
                'Seeds': data(element).find('.sl_s').text().trim(),
                // Качает (Peers)
                'Peers': data(element).find('.sl_p').text().trim(),
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

// RuTor Puppeteer
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

// RuTor ID
async function RuTorFiles(query) {
    const url_files = `https://rutor.info/descriptions/${query}.files`
    const torrents = []
    let html
    const url = `https://rutor.info/torrent/${query}`
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: headers
        })
        html = response.data.toString('utf-8')
        console.log(`${getCurrentTime()} [Request] ${url}`)
    } catch (error) {
        console.error(`${getCurrentTime()} [ERROR] ${error.hostname} server is not available (Code: ${error.code})`)
        return {'Result': `The ${error.hostname} server is not available`}
    }
    const data = cheerio.load(html)
    let name = data('#all h1').text().trim()
    let torrent_url = 'https:' + data('#download a:eq(1)').attr('href').trim()
    // Hash
    let hash = data('#download a').attr('href').replace(/magnet:\?xt=urn:btih:|\&dn=.+/g,'').trim()
    // IMDb
    let imdb
    // Ищем во всех элементах "a" атрибут "href" который содержит строку "imdb.com"
    data('a[href*="imdb.com"]').each((index, element) => {
        // Извлекаем значение атрибута href из текущего элемента
        const href = data(element).attr('href')
        // Проверяем, содержит ли значение атрибута href строку "imdb.com"
        if (href.includes('imdb.com')) {
            imdb = href
            // Прерываем цикл после нахождения первого элемента
            return false
        }
    })
    // Если элемент содержащий imdb не найден, возвращаем пустой параметр
    if (!imdb) {
        imdb = ""
    }
    // Kinopoisk
    let kp
    data('a[href*="kinopoisk.ru"]').each((index, element) => {
        const href = data(element).attr('href')
        if (href.includes('kinopoisk.ru')) {
            kp = href
            return false
        }
    })
    if (!kp) {
        kp = ""
    }
    // Определяем порядковый номер индекса с содержимым рейтинга и забираем остальные данные по порядку
    let index
    let test = data('#details > tbody > tr:nth-child(2) > td.header').text()
    if (test == 'Оценка') {
        index = 2
        test = false
    } else {
        test = data('#details > tbody > tr:nth-child(3) > td.header').text()
    }
    if (test == 'Оценка' && test != false) {
        index = 3
        test = false
    }
    let rating = data(`#details > tbody > tr:nth-child(${index}) > td:nth-child(2)`).text()
    let category = data(`#details > tbody > tr:nth-child(${index+1}) > td:nth-child(2) > a`).text()
    let seeds = data(`#details > tbody > tr:nth-child(${index+2}) > td:nth-child(2)`).text()
    let peers = data(`#details > tbody > tr:nth-child(${index+3}) > td:nth-child(2)`).text()
    let seed_date = data(`#details > tbody > tr:nth-child(${index+4}) > td:nth-child(2)`).text()
    let add_date = data(`#details > tbody > tr:nth-child(${index+5}) > td:nth-child(2)`).text()
    let size = data(`#details > tbody > tr:nth-child(${index+6}) > td:nth-child(2)`).text().replace(/\s+/g,' ')
    // Получаем список файлов
    try {
        const response = await axios.get(url_files, {
            responseType: 'arraybuffer',
            headers: headers
        })
        // Получаем байты и преобразуем их в строку UTF-8
        html = response.data.toString('utf-8')
        console.log(`${getCurrentTime()} [Request] ${url_files}`)
    } catch (error) {
        console.error(`${getCurrentTime()} [ERROR] ${error.hostname} server is not available (Code: ${error.code})`)
        return {'Result': `The ${error.hostname} server is not available`}
    }
    // Оборачиваем строки таблицы в тег <table> для правильного разбора с помощью Cheerio
    const data_files = cheerio.load(`<table>${html}</table>`)
    data_files('tr').each((_, element) => {
        const torrent = {
            'Name': data_files(element).find('td').eq(0).text().trim(),
            'Size': data_files(element).find('td').eq(1).text().replace(/\(.+/g,'').trim().replace(/'\s| |┬а'/g,'')
        }
        torrents.push(torrent)
    })
    if (torrents.length === 0) {
        return {'Result': 'No matches were found for your ID'}
    } else {
        return {
            Name: name,
            Hash: hash,
            Torrent: torrent_url,
            IMDb_link: imdb,
            Kinopoisk_link: kp,
            IMDb_id: imdb.replace(/[^0-9]/g, ''),
            Kinopoisk_id: kp.replace(/[^0-9]/g, ''),
            Rating: rating,
            Category: category,
            Seeds: seeds,
            Peers: peers,
            Seed_Date: seed_date,
            Add_Date: add_date,
            Size: size,
            Files: torrents
        }
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
                'Hash': data(element).find('a:eq(1)').attr('href').replace(/.+btih:|&.+/g,''),
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

// NoNameClub ID
async function NoNameClubID(query) {
    const url = `https://nnmclub.to/forum/viewtopic.php?t=${query}`
    let html
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: headers
        })
        html = iconv.decode(response.data, 'win1251')
        console.log(`${getCurrentTime()} [Request] ${url}`)
    } catch (error) {
        console.error(`${getCurrentTime()} [ERROR] ${error.hostname} server is not available (Code: ${error.code})`)
        return {'Result': `The ${error.hostname} server is not available`}
    }
    const data = cheerio.load(html)
    let Name = data('body > div.wrap > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td:nth-child(1) > h1 > a').text().trim()
    // Забираем imdb и kp если они существуют на странице
    let imdb
    data('a[href*="imdb.com"]').each((index, element) => {
        const href = data(element).attr('href')
        if (href.includes('imdb.com')) {
            imdb = href
            return false
        }
    })
    if (!imdb) {
        imdb = ""
    }
    let kp
    data('a[href*="kinopoisk.ru"]').each((index, element) => {
        const href = data(element).attr('href')
        if (href.includes('kinopoisk.ru')) {
            kp = href
            return false
        }
    })
    if (!kp) {
        kp = ""
    }
    // Hash
    let Hash = data('tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td.gensmall > a').attr('href').replace(/.+:/,'')
    // let Magnet = data('tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td.gensmall > a').attr('href')
    // Torrent
    let Torrent = data('tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td.gensmall > span > b > a').attr('href')
    Torrent = `https://nnmclub.to/forum/${Torrent}`
    // Собираем данные со страницы с проверкой наличия по наименованию контейнеров
    // Производство
    const Release = (() => {
        const element = data('tbody > tr:nth-child(1) > td > div > span:contains("Производство:")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Жанр
    // Забираем все элементы "a" содержащие массив, разбиваем их с помощью запятой и объеденям в строку удаляя последнюю запятую
    const Type = data('tbody > tr:nth-child(1) > td > div > a').map((index, element) => {
        return data(element).text().trim()
    }).get().join(', ').replace(/, $/,"")
    // Режиссер
    const Directer = (() => {
        const element = data('tbody > tr:nth-child(1) > td > div > span:contains("Режиссер:")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Актеры
    const Actors = (() => {
        const element = data('tbody > tr:nth-child(1) > td > div > span:contains("Актеры:")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Описание
    const Description = (() => {
        const element = data('tbody > tr:nth-child(1) > td > div > span:contains("Описание:")')[0]
        if (element) {
            // Забираем второй элемент (после <br>)
            const nextNode = element.nextSibling.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Продолжительность
    const Duration = (() => {
        const element = data('tbody > tr:nth-child(1) > td > div > span:contains("Продолжительность:")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Качество видео
    const videoQuality = (() => {
        const element = data('tbody > tr:nth-child(1) > td > div > span:contains("Качество видео:")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Перевод
    const Audio = (() => {
        const element = data('tbody > tr:nth-child(1) > td > div > span:contains("Перевод:")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Video
    const Video = (() => {
        const element = data('tbody > tr:nth-child(1) > td > div > span:contains("Видео:")')[0]
        if (element) {
            const nextNode = element.nextSibling
            return nextNode && nextNode.nodeType === 3 ? nextNode.nodeValue.trim() : ''
        } else {
            return ''
        }
    })()
    // Статические данные (регистрация торрента, рейтинг и размер)
    const Registration = data('tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim()
    let Rating = data('tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td:nth-child(2) > span > span:nth-child(4)').text().trim()
    let ratingNum = Rating.replace(/\s.+/g,'')
    let votesCount = Rating.replace(/.+: /g,'')
    const Size = data('tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td:nth-child(2) > span:nth-child(1)').text().trim()
    // Получаем список файлов
    let torrentId = Torrent.replace(/.+id=/,'')
    let urlTorrentFiles = `https://nnmclub.to/forum/filelst.php?attach_id=${torrentId}`
    const torrents = []
    try {
        const response = await axios.get(urlTorrentFiles, {
            responseType: 'arraybuffer',
            headers: headers
        })
        html =  iconv.decode(response.data, 'win1251')
        console.log(`${getCurrentTime()} [Request] ${urlTorrentFiles}`)
    } catch (error) {
        console.error(`${getCurrentTime()} [ERROR] ${error.hostname} server is not available (Code: ${error.code})`)
        return {'Result': `The ${error.hostname} server is not available`}
    }
    const data_files = cheerio.load(html)
    data_files('tr').each((_, element) => {
        let sizeFile = data_files(element).find('td').eq(2).text().replace(/\(.+/g,'').trim()
        // Проверяем, присутствует ли размер в значение столбца
        if (sizeFile === 'Размер') {
            sizeFile = 'Directory'
        }
        const torrent = {
            'Name': data_files(element).find('td').eq(1).text().trim(),
            'Size': sizeFile
        }
        torrents.push(torrent)
    })
    return {
        Name: Name,
        Hash: Hash,
        Torrent: Torrent,
        IMDb_link: imdb,
        Kinopoisk_link: kp,
        IMDb_id: imdb.replace(/[^0-9]/g, ''),
        Kinopoisk_id: kp.replace(/[^0-9]/g, ''),
        Release: Release,
        Type: Type,
        Directer: Directer,
        Actors: Actors,
        Description: Description,
        Duration: Duration.replace(/~/,''),
        Video_Quality: videoQuality,
        Video: Video,
        Audio: Audio,
        Registration: Registration,
        Rating: ratingNum,
        Votes: votesCount,
        Size: Size,
        Files: torrents
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
                'Id': data(element).find('.genmed a').attr('href').replace(/.+t=/,''),
                'Url': "https://nnmclub.to/forum/"+data(element).find('a:eq(1)').attr('href'),
                'Torrent': "https://nnmclub.to/forum/"+data(element).find('a:eq(3)').attr('href'),
                'Size': size,
                'Comments': data(element).find(`.gensmall:eq(${sizeIndex + 1})`).text().trim(),
                'Type': data(element).find('.gen').text().trim(),
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
            'Name': data(element).find('.torrent-title b').text().trim().replace(/\s+/,' '),
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
    // Проверяем методы (пропускаем только GET без учета регистра)
    if (req.method.toLowerCase() !== 'get') {
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
    // Кодируем запрос в формат URL (заменяется последовательностью процентов и двумя шестнадцатеричными числами, представляющими ASCII-код символа в кодировке UTF-8)
    query = encodeURIComponent(query)
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
    // ALL
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
    // RuTracker ID
    else if (provider === 'rutracker' && /^\d{5,}$/.test(query)) {
        try {
            const result = await RuTrackerID(query)
            return res.json(result)
        } catch (error) {
            console.error("Error:", error)
            return res.status(400).json(
                {Result: 'No data'}
            )
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
    // Kinozal ID
    else if (provider === 'kinozal' && /^\d{5,}$/.test(query)) {
        try {
            const result = await KinozalID(query)
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
    // RuTor ID
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
    // NoNameClub ID
    else if (provider === 'nonameclub' && /^\d{5,}$/.test(query)) {
        try {
            const result = await NoNameClubID(query)
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