const cheerio = require('cheerio');
const axios = require('axios');

async function fastsTorrent(query) {
    var ALLTORRENT = [];
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
        ALLTORRENT.push(torrent);
    });
    return ALLTORRENT;
}

module.exports = fastsTorrent;