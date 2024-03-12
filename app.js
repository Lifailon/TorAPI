const express = require('express');
const fastsTorrent = require('./torrent/fastsTorrent');
const combo = require('./torrent/COMBO');
const app = express();

app.use('/api/:website/:query/:page?', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let website = (req.params.website).toLowerCase();
    let query = req.params.query;
    let page = req.params.page;
    console.log({Provider: website, Title: query});

    if (website === 'fastsTorrent') {
        fastsTorrent(query)
            .then((data) => {
                if (data === null) {
                    return res.json({
                        error: 'Provider is unavailable'
                    })
                } else if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for title:' + query + ''
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
                    error: 'No search result available for title:' + query + ''
                });
            }
        })
    } else if (website !== 'faststorrent' && website !== 'all') {
        return res.json({
            error: 'Select: FastsTorrent or all providers'
        })
    }

});

const port = process.env.port || 8484;
console.log('Listening on port:', port);
app.listen(port);