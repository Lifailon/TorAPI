# TorAPI

---

💁 *In active development stage* ⚠️

---

An unofficial API server for Russian-speaking torrent providers to receive torrent files and other information by movie title, TV series or ID.

💛 This project is an idea fork of [Torrents-Api](https://github.com/Ryuk-me/Torrents-Api). All code is completely rewritten. The server is based on [Express.js](https://github.com/expressjs/express) and [Cheerio](https://github.com/cheeriojs/cheerio).

📄 Released under the [MIT license](https://github.com/Lifailon/TorAPI/blob/rsa/LICENSE).

### 🔗 Providers list:

- ✅✳️ [Kinozal](https://kinozal.tv)
- ❎✳️ [RuTracker](https://rutracker.org)
- ❎ [RuTor](https://rutor.info)
- ❎ [NoName-Club](https://nnmclub.to)

✳️ To download torrent files via direct link, authorization is required (parameter `Torrent`).

## ▶️ Start

```shell
git clone https://github.com/Lifailon/TorAPI # Clone the repository
npm install # Install dependencies
npm start # Start the server
```

The server will start on the default port `8443`.

## 📚 Info

### Endpoint format:

```
/api/<PROVIDER>/<TITLE>/<PAGE>/<YEAR>
```

### Parameters:

* 🔵 PROVIDER - provider name (corresponds to the [list of providers](#-providers-list))
* 🔵 TITLE - name of the movie or TV series (the `+` symbol is used instead of a space)
* ⚪ *PAGE* - page number from which the response will be received (`0 to 100`)
* ⚪ *YEAR* - year of the movie or TV series

🔵 Mandatory parameter

## 🚀 Requests:

- **Kinozal:**

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
    "Peers": "25",
    "Date": "08.03.2024",
    "Time": "09:08",
    "Comments": "130"
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
    "Seeds": "35",
    "Peers": "26",
    "Date": "05.05.2023",
    "Time": "16:58",
    "Comments": "2"
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
    "Peers": "1",
    "Date": "19.05.2021",
    "Time": "13:43",
    "Comments": "91"
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
    "Date": "29.07.2020",
    "Time": "14:23",
    "Comments": "13"
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
    "Peers": "1",
    "Date": "02.06.2019",
    "Time": "13:57",
    "Comments": "14"
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
    "Date": "22.04.2019",
    "Time": "11:26",
    "Comments": "2"
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
    "Seeds": "3",
    "Peers": "1",
    "Date": "20.04.2019",
    "Time": "02:07",
    "Comments": "22"
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
    "Seeds": "4",
    "Peers": "1",
    "Date": "19.04.2019",
    "Time": "09:32",
    "Comments": "2"
  }
]
```