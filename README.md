# Torrent API

Unofficial API server to get torrent files by movie or series name from Russian torrent providers.

It is a fork of [Torrents-Api](https://github.com/Ryuk-me/Torrents-Api) project for foreign providers, all code is rewritten.

📄 Released under the [MIT license](https://github.com/Lifailon/TorrentAPI/blob/rsa/LICENSE).

Providers:

| Provider       | Url                               |
| -------------- | --------------------------------- |
| FastsTorrent   | http://fasts-torrent.net          |

> ⚠️ The plan is to sort out the coding and add other providers.

## 🚀 Install

```shell
git clone https://github.com/Lifailon/TorrentAPI # Clone the repository

npm install # Install dependencies

npm start # Start the server
```

The server will start on the default port `8484`.

### ▶️ Start

Format endpoint: `/api/<provider/all>/<title>`

`curl -s http://localhost:8484/api/all/castle | jq .`

```json
[
  [
    {
      "Name": "Castle Story (2017) PC | RePack ╨╛╤В R.G. Freedom ╨Ш╨│╤А╤Л",
      "Size": "1.12 Gb",
      "Torrent": "http://fasts-torrent.net/download/233833/torrent/castle-story-2017-pc-repack-rg-freedom-/"
    },
    {
      "Name": "Mastercastle - Wine of Heaven (2017) MP3 ╨Ь╤Г╨╖╤Л╨║╨░",
      "Size": "93.66 Mb",
      "Torrent": "http://fasts-torrent.net/download/224407/torrent/mastercastle-wine-of-heaven-2017-mp3-/"
    },
    {
      "Name": "Shadwen - Escape From the Castle (2016) PC | RePack ╨╛╤В R.G. ╨Ь╨╡╤Е╨░╨╜╨╕╨║╨╕ ╨Ш╨│╤А╤Л",
      "Size": "3.71 Gb",
      "Torrent": "http://fasts-torrent.net/download/216169/torrent/shadwen-escape-from-the-castle-2016-pc-repack-rg-/"
    },
    {
      "Name": "Lost Castle (2016) PC | RePack ╨╛╤В Pioneer ╨Ш╨│╤А╤Л",
      "Size": "187.83 Mb",
      "Torrent": "http://fasts-torrent.net/download/212862/torrent/lost-castle-2016-pc-repack-pioneer-/"
    },
    {
      "Name": "Castlevania: Lords of Shadow 2 (+DLC) (2014) XBOX360 | Freeboot ╨Ш╨│╤А╤Л",
      "Size": "4.82 Gb",
      "Torrent": "http://fasts-torrent.net/download/210620/torrent/castlevania-lords-of-shadow-2-dlc-2014-xbox360-freeboot-/"
    },
    {
      "Name": "Castlevania: Lords of Shadow тАУ Ultimate Edition (2010) XBOX360 | Freeboot ╨Ш╨│╤А╤Л",
      "Size": "13.18 Gb",
      "Torrent": "http://fasts-torrent.net/download/210433/torrent/castlevania-lords-of-shadow-ultimate-edition-2010-xbox360-freeboot-/"
    },
    {
      "Name": "Castlevania: Lords of Shadow тАУ Ultimate Edition  (2013) PC | RePack ╨╛╤В =nemos= ╨Ш╨│╤А╤Л",
      "Size": "13.55 Gb",
      "Torrent": "http://fasts-torrent.net/download/189360/torrent/castlevania-lords-of-shadow-ultimate-edition-2013-pc-repack-nemos-/"
    },
    {
      "Name": "Castlevania: Lords of Shadow 2  (2014) PC | RePack ╨╛╤В =nemos= ╨Ш╨│╤А╤Л",
      "Size": "5.9 Gb",
      "Torrent": "http://fasts-torrent.net/download/189143/torrent/castlevania-lords-of-shadow-2-2014-pc-repack-nemos-/"
    }
  ]
]
```