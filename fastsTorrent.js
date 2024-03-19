// Подключение необходимых модулей: cheerio для парсинга HTML и XML, и axios для выполнения HTTP-запросов.
const cheerio = require('cheerio');
const axios = require('axios');

// Асинхронная функция fastsTorrent, принимающая один аргумент query.
async function fastsTorrent(query) {
    // Создание пустого массива для хранения данных о торрентах.
    var torrents = [];
    // Формирование URL-адреса для выполнения запроса с помощью указанного запроса.
    const url = `http://fasts-torrent.net/engine/ajax/search_torrent.php?title=${query}`;
    let html;
    try {
        // Выполнение GET-запроса по указанному URL с использованием axios.
        html = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
            }
        });
    } catch (error) {
        // Обработка ошибок (возвращает значения null)
        console.error("Error fetching data:", error);
        return null;
    }
    // Загрузка полученного HTML-кода с помощью cheerio
    const $ = cheerio.load(html.data);
    // Поиск всех строк таблицы с классом restable в теле tbody и элементами tr
    $('.restable tbody tr').each((_, element) => {
        // Для каждой найденной строки создается объект torrent
        let torrent = {
            // Извлечение названия торрента из элемента с классом 'torrent-title'.
            'Name': $(element).find('.torrent-title b').text().trim(),
            // Извлечение текста с размером внутри торрент файла из первого элемента с классом 'torrent-sp'.
            'Size': $(element).find('.torrent-sp').eq(0).text().trim(),
            // Формирование ссылки на торрент из элемента с классом 'torrent-d-btn' и его атрибута href
            'Torrent': "http://fasts-torrent.net" + $(element).find('.torrent-d-btn a').attr('href')
        };
        // Добавление объекта torrent в массив torrents
        torrents.push(torrent);
    });
    // Возвращение массива torrents с данными о торрентах.
    return torrents;
}

// module.exports = fastsTorrent;
fastsTorrent('castle').then(result => console.log(result)).catch(error => console.error(error));