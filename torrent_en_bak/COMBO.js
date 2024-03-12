const fastsTorrent = require('./fastsTorrent');
const scrap1337x = require('./1337x');
const scrapYts = require('./yts');
const glodls = require('./gloTorrents');
const magnet_dl = require('./magnet_dl');

async function combo(query, page) {
    let comboTorrent = [], timeout = 10000
    await Promise.allSettled([
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(fastsTorrent(query)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(scrap1337x.torrent1337x(query, page)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(scrapYts.yts('query', 1)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(magnet_dl(query, page)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(glodls(query, page)))
        ])])
        .then((comboResult) => {
            comboTorrent = (comboResult.filter((element) =>
                element.status === 'fulfilled' && element.value && element.value.length > 0)).map((element) => {
                return element.value
            })
        })
        .catch(err => console.log(err))
    return comboTorrent;
}

module.exports = combo;