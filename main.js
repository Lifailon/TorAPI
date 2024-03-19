const cheerio = require('cheerio')
const axios   = require('axios')
const iconv   = require('iconv-lite')

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
        const $notNull = data(element).find('.nam a')
        if ($notNull.length > 0) {
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
                'Size': data(element).find('.s').eq(1).text().trim(),
                // Сиды, пиры, дата заливки и количество комментариев
                'Seeds': data(element).find('.sl_s').text().trim(),
                'Peers': data(element).find('.sl_p').text().trim(),
                'Date': data(element).find('.s').eq(2).text().trim(),
                'Comments': data(element).find('.s').eq(0).text().trim(),
            }
            // Добавляем в массив
            torrents.push(torrent)
        }
    })
    return torrents
}

kinozal('the+rookie').then(result => console.log(result)).catch(error => console.error(error))
