const fastsTorrent = require('./fastsTorrent');

async function combo(query, page) {
    let comboTorrent = [], timeout = 10000
    await Promise.allSettled([
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(fastsTorrent(query)))
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