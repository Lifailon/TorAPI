# TorAPI

Unofficial API server of Russian torrent providers to get torrent files and other information by movie or series title.

♥️ This project is an idea fork of [Torrents-Api](https://github.com/Ryuk-me/Torrents-Api). All code is completely rewritten. The server is based on [Express.js](https://github.com/expressjs/express) and [Cheerio](https://github.com/cheeriojs/cheerio).

📄 Released under the [MIT license](https://github.com/Lifailon/TorAPI/blob/rsa/LICENSE).

### 🔗 Providers:

- ✅ [Kinozal](https://kinozal.tv)

### 🚀 Start

```shell
git clone https://github.com/Lifailon/TorAPI # Clone the repository
npm install # Install dependencies
npm start # Start the server
```

The server will start on the default port `8443`.

### 🚩 Request format:

```
/api/<provider/all>/<title>/<yead>/<page>
```

### 📢 Examples:

- Windows client:

`Invoke-RestMethod http://localhost:8443/api/kinozal/the+rookie/2018/0 | ConvertTo-Json`

```json
[
  {
    "Name": "Новичок (Новобранец) (1-6 сезоны: 1-101 серии из 120) / The Rookie / 2018-2024 / ПМ (LostFilm) / WEB-DLRip (1080p)",
    "Id": "1656552",
    "Url": "https://kinozal.tv/details.php?id=1656552",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1656552",
    "Size": "233.22 ГБ",
    "Seeds": "11",
    "Peers": "21",
    "Date": "08.03.2024 в 09:08",
    "Comments": "130"
  },
  {
    "Name": "Новичок (Новобранец) (1-5 сезоны: 1-98 серии из 98) / The Rookie / 2018-2023 / ПМ (LostFilm) / WEB-DLRip",
    "Id": "1953041",
    "Url": "https://kinozal.tv/details.php?id=1953041",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1953041",
    "Size": "52.27 ГБ",
    "Seeds": "35",
    "Peers": "24",
    "Date": "05.05.2023 в 16:58",
    "Comments": "2"
  },
  {
    "Name": "Новичок (Новобранец) (1-3 сезоны: 1-54 серии из 54) / The Rookie / 2018-2021 / ПМ (LostFilm) / WEB-DLRip",
    "Id": "1655778",
    "Url": "https://kinozal.tv/details.php?id=1655778",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1655778",
    "Size": "29.6 ГБ",
    "Seeds": "2",
    "Peers": "2",
    "Date": "19.05.2021 в 13:43",
    "Comments": "91"
  },
  {
    "Name": "Новичок (Новобранец) (1-2 сезоны: 1-40 серии из 40) / The Rookie / 2018-2020 / ПМ (Lostfilm) / HEVC / WEB-DL (1080p)",
    "Id": "1784491",
    "Url": "https://kinozal.tv/details.php?id=1784491",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1784491",
    "Size": "16.87 ГБ",
    "Seeds": "1",
    "Peers": "0",
    "Date": "29.07.2020 в 14:23",
    "Comments": "13"
  },
  {
    "Name": "Новичок (Новобранец) (1 сезон: 1-20 серии из 20) / The Rookie / 2018 / ПМ (Lostfilm, Jaskier, NewStudio, SonyTurbo), СТ / WEB-DL (1080p)",
    "Id": "1656567",
    "Url": "https://kinozal.tv/details.php?id=1656567",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1656567",
    "Size": "58.18 ГБ",
    "Seeds": "2",
    "Peers": "1",
    "Date": "02.06.2019 в 13:57",
    "Comments": "14"
  },
  {
    "Name": "Новичок (Новобранец) (1 сезон: 1-20 серии из 20) / The Rookie / 2018 / ПМ (TVShows) / WEB-DL (1080p)",
    "Id": "1658321",
    "Url": "https://kinozal.tv/details.php?id=1658321",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1658321",
    "Size": "51.16 ГБ",
    "Seeds": "0",
    "Peers": "0",
    "Date": "22.04.2019 в 11:26",
    "Comments": "2"
  },
  {
    "Name": "Новичок (Новобранец) (1 сезон: 1-20 серии из 20) / The Rookie / 2018-2019 / ПМ (Lostfilm, Jaskier), СТ / WEB-DL (720p)",
    "Id": "1656566",
    "Url": "https://kinozal.tv/details.php?id=1656566",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1656566",
    "Size": "24.78 ГБ",
    "Seeds": "2",
    "Peers": "1",
    "Date": "20.04.2019 в 02:07",
    "Comments": "22"
  },
  {
    "Name": "Новичок (Новобранец) (1 сезон: 1-20 серии из 20) / The Rookie / 2018 / ПМ (Lostfilm), СТ / WEB-DL (1080p)",
    "Id": "1676954",
    "Url": "https://kinozal.tv/details.php?id=1676954",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1676954",
    "Size": "52.69 ГБ",
    "Seeds": "4",
    "Peers": "1",
    "Date": "19.04.2019 в 09:32",
    "Comments": "2"
  }
]
```

- Linux client:

`curl -s http://192.168.3.100:8443/api/kinozal/the+rookie/2018/0 | jq .[0]`

```json
{
  "Name": "Новичок (Новобранец) (1-6 сезоны: 1-101 серии из 120) / The Rookie / 2018-2024 / ПМ (LostFilm) / WEB-DLRip (1080p)",
  "Id": "1656552",
  "Url": "https://kinozal.tv/details.php?id=1656552",
  "Torrent": "https://dl.kinozal.tv/download.php?id=1656552",
  "Size": "233.22 ГБ",
  "Seeds": "12",
  "Peers": "22",
  "Date": "08.03.2024 в 09:08",
  "Comments": "130"
}
```