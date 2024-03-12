const express = require('express');
const fastsTorrent = require('./torrent/fastsTorrent');
const scrap1337x = require('./torrent/1337x');
const scrapYts = require('./torrent/yts');
const glodls = require('./torrent/gloTorrents');
const magnet_dl = require('./torrent/magnet_dl');
const combo = require('./torrent/COMBO');
const app = express();

app.use('/api/:website/:query/:page?', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let website = (req.params.website).toLowerCase();
    let query = req.params.query;
    let page = req.params.page;
    console.log({ website: website, query: query, page: page });

    if (website === 'fastsTorrent') {
        fastsTorrent(query)
            .then((data) => {
                if (data === null) {
                    return res.json({
                        error: 'Website is blocked change IP'
                    })
                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }
            })
    }

    if (website === '1337x') {
        if (page > 50) {
            return res.json({
                error: 'Please enter page  value less than 51 to get the result :)'
            })
        } else {
            scrap1337x.torrent1337x(query, page)
                .then((data) => {
                    if (data === null) {
                        return res.json({
                            error: 'Website is blocked change IP'
                        })
                    } else if (data.length === 0) {
                        return res.json({
                            error: 'No search result available for query (' + query + ')'
                        })
                    } else {
                        return res.send(data);
                    }

                })
        }
    }

    if (website === 'yts') {
        scrapYts.yts(query, page)
            .then((data) => {
                if (data === null) {
                    return res.json({
                        error: 'Website is blocked change IP'
                    })
                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }
            })
    }

    if (website === 'glodls') {
        glodls(query, page)
            .then((data) => {
                if (data === null) {
                    return res.json({
                        error: 'Website is blocked change IP'
                    })
                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }
            })
    }

    if (website === 'magnetdl') {
        magnet_dl(query, page)
            .then((data) => {
                if (data === null) {
                    return res.json({
                        error: 'Website is blocked change IP'
                    })
                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }
            })
    }

    if (website === "all") {
        combo(query, page).then((data) => {
            if (data !== null && data.length > 0) {
                return res.send(data);
            } else {
                return res.json({
                    error: 'No search result available for query (' + query + ')'
                });
            }
        })
    } else if (website !== 'faststorrent' && website !== '1337x' && website !== 'yts' && website !== 'glodls' && website !== 'magnetdl' && website !== 'all') {
        return res.json({
            error: 'please select faststorrent | 1337x | yts | glodls | magnetdl | all (to scrap from every site)'
        })
    }

});

app.use('/', (req, res) => {
    res.send(
        '<h1>Unofficial API for torrent providers: FastsTorrent, 1337x, YTS, Glodls, MagnetDL.</h1>'
    );
});

const port = process.env.port || 8484;
console.log('Listening on port:', port);
app.listen(port);