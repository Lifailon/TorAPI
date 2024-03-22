
<h2 align='center'>🎞️ TorAPI 🎞️</h2>
<p align="center">
<a href="https://github.com/Lifailon"><img title="Author" src="https://img.shields.io/badge/Author-Lifailon-blue.svg?style=for-the-badge&logo=github"></a>
</p>

<p align="center">
<a href="https://github.com/nodejs/node"><img title="Node" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"></a>
<a href="https://github.com/expressjs/express"><img title="Express" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"></a>
</p>

An unofficial API server for Russian-speaking torrent providers to receive torrent files and other information by movie title, TV series or ID.

> Search by ID will be implemented in future releases.

This project is an idea fork of [Torrents-Api](https://github.com/Ryuk-me/Torrents-Api) ✨ (all code is completely rewritten). The server is based on [Express.js](https://github.com/expressjs/express).

📄 Released under the [MIT license](https://github.com/Lifailon/TorAPI/blob/rsa/LICENSE).

---

### 🔗 Providers list:

- ✅ [Kinozal](https://kinozal.tv)
- ❌ [RuTracker](https://rutracker.org)
- ✅ [RuTor](https://rutor.info) \*
- ✅ [NoNameClub](https://nnmclub.to) \*
- ✅ [FastsTorrent](http://fasts-torrent.net) \**

\*  To download torrent files via a direct link (the `Torrent` parameter), authorization is not required. \
\** No authorization and VPN required.

---

## ▶️ Start

Clone the repository, install dependencies and start the server:

```shell
git clone https://github.com/Lifailon/TorAPI
cd TorAPI
npm install
npm start
```

The server will start on the port `8443` (default).

---

## 📚 Doc

#### Endpoint format:

```js
/api/<PROVIDER>/<TITLE>/<PAGE>/<YEAR>
```

Only `GET` method is supported

#### Parameters:

| Name       | Mandatory | Description                                                                                    |
|-           |-          |-                                                                                               |
| *PROVIDER* | True      | Provider name (corresponds to the [list of providers](#-providers-list))                       | 
| *TITLE*    | True      | Name of the movie or TV series (the `+` symbol is used instead of a space)                     |
| *PAGE*     | False     | Page number from which the response will be received (`0 to 100`)                              |
| *YEAR*     | False     | Year of release of the film or series for filtering (supported only by the provider *Kinozal*) |


#### Requests and responses:

- [Kinozal](#kinozal)
- [RuTor](#rutor)
- [NoNameClub](#nonameclub)

#### Kinozal

`curl -s http://192.168.3.100:8443/api/kinozal/the+rookie/0/2018 | jq .`

```json
[
  {
    "Name": "Новичок (Новобранец) (1-6 сезоны: 1-101 серии из 120)",
    "OriginalName": "The Rookie",
    "Year": "2018-2024",
    "Language": "ПМ (LostFilm)",
    "Format": "WEB-DLRip (1080p)",
    "Id": "1656552",
    "Url": "https://kinozal.tv/details.php?id=1656552",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1656552",
    "Size": "233.22 ГБ",
    "Seeds": "12",
    "Peers": "27",
    "Comments": "130",
    "Date": "08.03.2024 09:08"
  },
  {
    "Name": "Новичок (Новобранец) (1-5 сезоны: 1-98 серии из 98)",
    "OriginalName": "The Rookie",
    "Year": "2018-2023",
    "Language": "ПМ (LostFilm)",
    "Format": "WEB-DLRip",
    "Id": "1953041",
    "Url": "https://kinozal.tv/details.php?id=1953041",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1953041",
    "Size": "52.27 ГБ",
    "Seeds": "42",
    "Peers": "33",
    "Comments": "2",
    "Date": "05.05.2023 16:58"
  },
  {
    "Name": "Новичок (Новобранец) (1-3 сезоны: 1-54 серии из 54)",
    "OriginalName": "The Rookie",
    "Year": "2018-2021",
    "Language": "ПМ (LostFilm)",
    "Format": "WEB-DLRip",
    "Id": "1655778",
    "Url": "https://kinozal.tv/details.php?id=1655778",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1655778",
    "Size": "29.6 ГБ",
    "Seeds": "3",
    "Peers": "7",
    "Comments": "91",
    "Date": "19.05.2021 13:43"
  },
  {
    "Name": "Новичок (Новобранец) (1-2 сезоны: 1-40 серии из 40)",
    "OriginalName": "The Rookie",
    "Year": "2018-2020",
    "Language": "ПМ (Lostfilm)",
    "Format": "HEVC",
    "Id": "1784491",
    "Url": "https://kinozal.tv/details.php?id=1784491",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1784491",
    "Size": "16.87 ГБ",
    "Seeds": "0",
    "Peers": "1",
    "Comments": "13",
    "Date": "29.07.2020 14:23"
  },
  {
    "Name": "Новичок (Новобранец) (1 сезон: 1-20 серии из 20)",
    "OriginalName": "The Rookie",
    "Year": "2018",
    "Language": "ПМ (Lostfilm, Jaskier, NewStudio, SonyTurbo), СТ",
    "Format": "WEB-DL (1080p)",
    "Id": "1656567",
    "Url": "https://kinozal.tv/details.php?id=1656567",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1656567",
    "Size": "58.18 ГБ",
    "Seeds": "2",
    "Peers": "2",
    "Comments": "14",
    "Date": "02.06.2019 13:57"
  },
  {
    "Name": "Новичок (Новобранец) (1 сезон: 1-20 серии из 20)",
    "OriginalName": "The Rookie",
    "Year": "2018",
    "Language": "ПМ (TVShows)",
    "Format": "WEB-DL (1080p)",
    "Id": "1658321",
    "Url": "https://kinozal.tv/details.php?id=1658321",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1658321",
    "Size": "51.16 ГБ",
    "Seeds": "0",
    "Peers": "0",
    "Comments": "2",
    "Date": "22.04.2019 11:26"
  },
  {
    "Name": "Новичок (Новобранец) (1 сезон: 1-20 серии из 20)",
    "OriginalName": "The Rookie",
    "Year": "2018-2019",
    "Language": "ПМ (Lostfilm, Jaskier), СТ",
    "Format": "WEB-DL (720p)",
    "Id": "1656566",
    "Url": "https://kinozal.tv/details.php?id=1656566",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1656566",
    "Size": "24.78 ГБ",
    "Seeds": "4",
    "Peers": "1",
    "Comments": "22",
    "Date": "20.04.2019 02:07"
  },
  {
    "Name": "Новичок (Новобранец) (1 сезон: 1-20 серии из 20)",
    "OriginalName": "The Rookie",
    "Year": "2018",
    "Language": "ПМ (Lostfilm), СТ",
    "Format": "WEB-DL (1080p)",
    "Id": "1676954",
    "Url": "https://kinozal.tv/details.php?id=1676954",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1676954",
    "Size": "52.69 ГБ",
    "Seeds": "7",
    "Peers": "2",
    "Comments": "2",
    "Date": "19.04.2019 09:32"
  }
]
```

#### RuTor

`curl -s http://192.168.3.100:8443/api/rutor/the+rookie+2018 | jq .`

```json
[
  {
    "Name": "Новичок / Новобранец / The Rookie [S01] (2018) WEBRip 720p | Gears Media",
    "Id": "678894",
    "Url": "https://rutor.info/torrent/678894/novichok_novobranec_the-rookie-s01-2018-webrip-720p-gears-media",
    "Torrent": "https://d.rutor.info/download/678894",
    "Magnet": "magnet:?xt=urn:btih:bc6bc000ba9f4b608693770da3657b9e28af6c33&dn=rutor.info&tr=udp://opentor.net:6969&tr=http://retracker.local/announce",
    "Size": "22.88 GB",
    "Comments": "0",
    "Seed": "0",
    "Peer": "1",
    "Date": "26.04.2019"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie [S01] (2018) WEB-DLRip | LostFilm",
    "Id": "660719",
    "Url": "https://rutor.info/torrent/660719/novichok_novobranec_the-rookie-s01-2018-web-dlrip-lostfilm",
    "Torrent": "https://d.rutor.info/download/660719",
    "Magnet": "magnet:?xt=urn:btih:339f1b0bb4e85fec0df8ac96d367c16ab7de6efa&dn=rutor.info&tr=udp://opentor.net:6969&tr=http://retracker.local/announce",
    "Size": "10.55 GB",
    "Comments": "15",
    "Seed": "5",
    "Peer": "0",
    "Date": "19.04.2019"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie [S01] (2018) WEB-DL 1080p | Lostfilm",
    "Id": "694558",
    "Url": "https://rutor.info/torrent/694558/novichok_novobranec_the-rookie-s01-2018-web-dl-1080p-lostfilm",
    "Torrent": "https://d.rutor.info/download/694558",
    "Magnet": "magnet:?xt=urn:btih:85d075c90e0c64403824bd116eb98645082e3fcc&dn=rutor.info&tr=udp://opentor.net:6969&tr=http://retracker.local/announce",
    "Size": "52.69 GB",
    "Comments": "2",
    "Seed": "5",
    "Peer": "2",
    "Date": "19.04.2019"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie [S01] (2018) WEBRip 1080p | Profix Media",
    "Id": "660369",
    "Url": "https://rutor.info/torrent/660369/novichok_novobranec_the-rookie-s01-2018-webrip-1080p-profix-media",
    "Torrent": "https://d.rutor.info/download/660369",
    "Magnet": "magnet:?xt=urn:btih:df1efa415b3449ae89f066ce5abbb37b9faa880f&dn=rutor.info&tr=udp://opentor.net:6969&tr=http://retracker.local/announce",
    "Size": "37.80 GB",
    "Comments": "0",
    "Seed": "0",
    "Peer": "1",
    "Date": "18.04.2019"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie [S01] (2018) WEBRip 720p | Profix Media",
    "Id": "660368",
    "Url": "https://rutor.info/torrent/660368/novichok_novobranec_the-rookie-s01-2018-webrip-720p-profix-media",
    "Torrent": "https://d.rutor.info/download/660368",
    "Magnet": "magnet:?xt=urn:btih:74abd7bbfce689bce5578566ca485f643bd1ab0f&dn=rutor.info&tr=udp://opentor.net:6969&tr=http://retracker.local/announce",
    "Size": "24.55 GB",
    "Comments": "0",
    "Seed": "0",
    "Peer": "1",
    "Date": "18.04.2019"
  }
]
```

#### NoNameClub

`curl -s http://192.168.3.100:8443/api/nonameclub/the+rookie+2018 | jq .`

```json
[
  {
    "Name": "Новичок / The Rookie (2018) WEB-DL [H.264/1080p-LQ] (сезон 1, серии 1-20 из 20) TVShows",
    "Id": "1259608",
    "Url": "https://nnmclub.to/forum/viewtopic.php?t=1259608",
    "Torrent": "https://nnmclub.to/forum/download.php?id=1018672",
    "Size": "51.2 GB",
    "Seed": "2",
    "Peer": "1",
    "Comments": "6",
    "Genre": "Зарубежные сериалы",
    "Genre_Link": "https://nnmclub.to/forum/tracker.php?f=768&nm=the rookie 2018",
    "Date": "22.04.2019 12:09"
  },
  {
    "Name": "Новичок / The Rookie (2018) WEB-DL [H.264/1080p-LQ] (сезон 1, серии 1-20 из 20) LostFilm",
    "Id": "1278446",
    "Url": "https://nnmclub.to/forum/viewtopic.php?t=1278446",
    "Torrent": "https://nnmclub.to/forum/download.php?id=1030902",
    "Size": "52.7 GB",
    "Seed": "6",
    "Peer": "0",
    "Comments": "6",
    "Genre": "Зарубежные сериалы",
    "Genre_Link": "https://nnmclub.to/forum/tracker.php?f=768&nm=the rookie 2018",
    "Date": "20.04.2019 03:30"
  },
  {
    "Name": "Новичок / The Rookie (2018) WEB-DLRip (сезон 1, серии 1-20 из 20) LostFilm",
    "Id": "1256703",
    "Url": "https://nnmclub.to/forum/viewtopic.php?t=1256703",
    "Torrent": "https://nnmclub.to/forum/download.php?id=1016767",
    "Size": "10.5 GB",
    "Seed": "11",
    "Peer": "0",
    "Comments": "31",
    "Genre": "Зарубежные сериалы",
    "Genre_Link": "https://nnmclub.to/forum/tracker.php?f=768&nm=the rookie 2018",
    "Date": "19.04.2019 01:55"
  },
  {
    "Name": "Новобранец / The Rookie (2018) WEB-DLRip [H.264/720p] (сезон 1, серия 1-8 из 20) LostFilm (обновляемая)",
    "Id": "1265982",
    "Url": "https://nnmclub.to/forum/viewtopic.php?t=1265982",
    "Torrent": "https://nnmclub.to/forum/download.php?id=1022722",
    "Size": "10.2 GB",
    "Seed": "0",
    "Peer": "0",
    "Comments": "6",
    "Genre": "Архив Сериалов и Архив Старого многосерийного кино до 90-х",
    "Genre_Link": "https://nnmclub.to/forum/tracker.php?f=802&nm=the rookie 2018",
    "Date": "22.12.2018 07:00"
  }
]
```