<p align="center">
  <img src="logo.png" alt="Image alt">
</p>

---

<p align="center">
<a href="https://github.com/nodejs/node"><img title="Node" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"></a>
<a href="https://github.com/expressjs/express"><img title="Express" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"></a>
</p>

<p align="center">
<a href="https://github.com/Lifailon/TorAPI"><img title="Version"src="https://img.shields.io/github/v/tag/lifailon/TorAPI?logo=Git&color=gold&label=Version"></a>
<a href="https://hub.docker.com/repository/docker/lifailon/torapi/general"><img title="Language"src="https://img.shields.io/docker/image-size/lifailon/torapi?label=Docker%20Image"></a>
<a href="https://github.com/Lifailon/TorAPI/blob/main/LICENSE"><img title="License"src="https://img.shields.io/github/license/lifailon/TorAPI?logo=GitHub&color=white&label=License"></a>
</p>

Unofficial API for RuTracker, Kinozal, RuTor, NoNameClub and other torrent trackers to get torrent files and information by movie title, TV series or id.

This project is inspired by ✨ [Torrents-Api](https://github.com/Ryuk-me/Torrents-Api) for Russian-speaking torrent providers.

Two types of queries are supported:

- **Search by title**, in which we will get all available distributions from the specified torrent tracker (its ID and brief information with a link to download the torrent file).
- **Search by ID** of the specified provider, where we will get additional information: hash for direct download through torrent-client, links to Kinopoisk and IMDb databases, detailed description of the movie or TV series, as well as the content of the torrent-file (list and size of files). 

📄 Released under the [MIT license](https://github.com/Lifailon/TorAPI/blob/rsa/LICENSE).

---

### 🔗 Full list of available providers:

| Provider name                       | Mirrors | Registration | Search by ID |
| -                                   | -       | -            | -            |
| [RuTracker](https://rutracker.org)  | 3       | Yes          | Yes          |
| [Kinozal](https://kinozal.tv)       | 2       | Yes          | Yes          |
| [RuTor](https://rutor.info)         | 2       | No           | Yes          |
| [NoNameClub](https://nnmclub.to)    | 1       | No           | Yes          |

💡 Registration is required only when downloading a torrent file via a direct link.

All distributions when searching by ID contain **hash** (cookies have already been added) and **magnet links** (containing a list of trackers), which allow you to download content and generate a torrent file using any torrent client.

---

## 🚀 Install

Clone the repository, install dependencies and start the server:

```shell
git clone https://github.com/Lifailon/TorAPI
cd TorAPI
npm install
npm start
```

By default, the server will be launched on port `8443`.

You can specify a different port:

```js
npm start -- --port 2024
```

Use a proxy for all requests:

```js
npm start -- --port 2024 --proxyAddress 192.168.3.99 --proxyPort 9090
```

If authorization on a proxy server is required:

```js
npm start -- --port 2024 --proxyAddress 192.168.3.99 --proxyPort 9090 --username TorAPI --password TorAPI
```

## 🐳 Docker

Upload the image and run the container from the [Docker Hub](https://hub.docker.com/repository/docker/lifailon/torapi/general):

```shell
docker run -d --name TorAPI -p 8443:8443 lifailon/torapi:latest
```

You can use project files to build from [dockerfile](dockerfile):

```shell
git clone https://github.com/Lifailon/TorAPI
cd TorAPI
docker build -t torapi .
docker run -d --name TorAPI -p 8443:8443 torapi
```

Or use [docker-compose](docker-compose.yml).

---

## 📚 Doc

- [Endpoint format](#endpoint-format)
- [Methods](#methods)
- [Parameters](#parameters)
- [Requests and responses](#requests-and-responses)
  - [All](#all)
  - [RuTracker](#rutracker)
  - [Kinozal](#kinozal)
  - [RuTor](#rutor)
  - [NoNameClub](#nonameclub)
- [Save torrent file](#-save-torrent-file)


### Endpoint format

```js
/api/<PROVIDER/ALL>/<TITLE/ID>/<PAGE>/<YEAR>
```

### Methods

```js
GET
```

### Parameters

| Name       | Mandatory | Type  | Description                                                                                                                                                                    |
| -          | -         | -     | -                                                                                                                                                                              |
| `PROVIDER` | True      | *str* | Provider name (corresponds to the [list of providers](#-full-list-of-available-providers)) or *ALL*.                                                                           | 
| `TITLE`    | True*     | *str* | *Name* of the movie or TV series. Cyrillic characters are supported. You can use spaces if the query is enclosed in inverted commas, or use an addition character (+) instead. |
| `ID`       | True*     | *str* | Get more information about a film or TV series by the ID of the specified provider.                                                                                            |
| `PAGE`     | False     | *int* | Page number from which the response will be received (`0 to 20`).                                                                                                              |
| `YEAR`     | False     | *int* | Year of release of the film or TV series for filtering (supported only by the provider **Kinozal**).                                                                             |

\* You can use one of two parameters in the endpoint path: `TITLE` or `ID`.

### Requests and responses

#### All

▶️ `curl -s http://192.168.3.100:8443/api/all/Bo+Path+of+the+Teal+Lotus`

```json
{
  "RuTracker": [
    {
      "Name": "[Nintendo Switch] Bo: Path of the Teal Lotus [NSZ][ENG]",
      "Id": "6552174",
      "Url": "https://rutracker.net/forum/viewtopic.php?t=6552174",
      "Torrent": "https://rutracker.net/forum/dl.php?t=6552174",
      "Size": "800.8 MB",
      "Download_Count": "220",
      "Checked": "True",
      "Type": "Switch",
      "Type_Link": "https://rutracker.net/forum/tracker.php?f=1605",
      "Seeds": "61",
      "Peers": "11",
      "Date": "17.07.2024"
    }
  ],
  "Kinozal": {
    "Result": "No matches were found for your title"
  },
  "RuTor": {
    "Result": "No matches were found for your title"
  },
  "NoNameClub": {
    "Result": "No matches were found for your title"
  }
}
```

#### RuTracker

▶️ `curl -s http://127.0.0.1:8443/api/rutracker/the+rookie+2024`

```json
[
  {
    "Name": "(Soundtrack, Rock) Новичок / Новобранец / The Rookie (Daddy Cop (From The TV Show \"The Rookie\")) (by Zander Hawley) - 2024 (2018), MP3 (tracks), 320 kbps",
    "Id": "6499482",
    "Url": "https://rutracker.net/forum/viewtopic.php?t=6499482",
    "Torrent": "https://rutracker.net/forum/dl.php?t=6499482",
    "Size": "5.3 MB",
    "Downloads": "21",
    "Checked": "True",
    "Type": "Саундтреки к сериалам (lossy)",
    "Type_Link": "https://rutracker.net/forum/tracker.php?f=1499",
    "Seed": "1",
    "Peer": "1",
    "Date": "14.03.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie / Сезон: 6 / Серии: 1-3 из 13 (Билл Роу) [2024, США, драма, комедия, криминал, WEB-DL 720p] MVO (LostFilm) + MVO (TVShows) + MVO (HDrezka) + Original + Sub (Rus, Eng)",
    "Id": "6498673",
    "Url": "https://rutracker.net/forum/viewtopic.php?t=6498673",
    "Torrent": "https://rutracker.net/forum/dl.php?t=6498673",
    "Size": "5.75 GB",
    "Downloads": "435",
    "Checked": "False",
    "Type": "Новинки и сериалы в стадии показа (HD Video)",
    "Type_Link": "https://rutracker.net/forum/tracker.php?f=1803",
    "Seed": "31",
    "Peer": "6",
    "Date": "11.03.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie / Сезон: 6 / Серии: 1-3 из 13 (Билл Роу, Майкл Гои) [2024, США, драма, комедия, криминал, WEB-DL 1080p] 3 x MVO (LostFilm, TVShows, HDrezka) + Original + Sub (Rus, Eng)",
    "Id": "6489949",
    "Url": "https://rutracker.net/forum/viewtopic.php?t=6489949",
    "Torrent": "https://rutracker.net/forum/dl.php?t=6489949",
    "Size": "9.92 GB",
    "Downloads": "1843",
    "Checked": "True",
    "Type": "Новинки и сериалы в стадии показа (HD Video)",
    "Type_Link": "https://rutracker.net/forum/tracker.php?f=1803",
    "Seed": "152",
    "Peer": "81",
    "Date": "9.03.2024"
  },
  {
    "Name": "Новичок / The Rookie / Сезон: 6 / Серии: 1-3 из 10 (Билл Роу, Майкл Гои) [2024, США, боевик, драма, криминал, WEB-DLRip] MVO (LostFilm) + Original",
    "Id": "6489937",
    "Url": "https://rutracker.net/forum/viewtopic.php?t=6489937",
    "Torrent": "https://rutracker.net/forum/dl.php?t=6489937",
    "Size": "1.78 GB",
    "Downloads": "1265",
    "Checked": "True",
    "Type": "Новинки и сериалы в стадии показа",
    "Type_Link": "https://rutracker.net/forum/tracker.php?f=842",
    "Seed": "79",
    "Peer": "52",
    "Date": "8.03.2024"
  }
]
```

- Search by id:

▶️ `curl -s http://127.0.0.1:8443/api/rutracker/6489937`

```json
{
  "Name": "Новичок / Новобранец / The Rookie / Сезон: 6 / Серии: 1-6 из 10 (Билл Роу, Майкл Гои) [2024, США, боевик, драма, криминал, WEB-DLRip] MVO (LostFilm) + Original",
  "Hash": "E5B7183C1E987471F31186D3ADDA6E77176804D1",
  "Torrent": "https://rutracker.org/forum/dl.php?t=6489937",
  "IMDb_link": "https://www.imdb.com/title/tt7587890/",
  "Kinopoisk_link": "https://www.kinopoisk.ru/series/1142153/",
  "IMDb_id": "7587890",
  "Kinopoisk_id": "1142153",
  "Year": "2024",
  "Release": "США",
  "Type": "боевик, драма, криминал",
  "Duration": "00:43:00",
  "Audio": "Профессиональный (многоголосый закадровый) -",
  "Directer": "Билл Роу, Майкл Гои",
  "Actors": "Нэйтан Филлион, Мелисса О’Нил, Эрик Винтер, Дженна Деван, Шон Эшмор, Лиззет Чавез, Мекиа Кокс, Алисса Диас, Тру Валентино, Ричард Т. Джонс ,Бриджет Риган, Трой Кастанеда, Мэллори Томпсон, Алекс Элин Гойко, Констанс Эджума",
  "Description": "Начинать с чистого листа всегда нелегко, особенно для уроженца маленького городка Джона Нолана, который после перевернувшего его жизнь случая решил воплотить в жизнь давнюю мечту и вступить в ряды полиции Лос-Анджелеса. Возрастного новичка встречают с понятным скептицизмом, однако жизненный опыт, упорство и чувство юмора дают Джону преимущество.",
  "Video_Quality": "WEB-DLRip",
  "Video": "XviD, 720x400 (16:9), 23.976 fps, 1600 Kbps",
  "Files": [
    {
      "name": "The.Rookie.S06E01.WEB-DLRip.RGzsRutracker.avi",
      "size": "614.25 MB"
    },
    {
      "name": "The.Rookie.S06E02.WEB-DLRip.RGzsRutracker.avi",
      "size": "615.56 MB"
    },
    {
      "name": "The.Rookie.S06E03.WEB-DLRip.RGzsRutracker.avi",
      "size": "596.67 MB"
    },
    {
      "name": "The.Rookie.S06E04.WEB-DLRip.RGzsRutracker.avi",
      "size": "614.88 MB"
    },
    {
      "name": "The.Rookie.S06E05.WEB-DLRip.RGzsRutracker.avi",
      "size": "596.57 MB"
    },
    {
      "name": "The.Rookie.S06E06.WEB-DLRip.RGzsRutracker.avi",
      "size": "614.89 MB"
    }
  ]
}
```

#### Kinozal

- Search by title:

▶️ `curl -s http://127.0.0.1:8443/api/kinozal/the+rookie/0/2024`

```json
[
  {
    "Name": "Новичок (Новобранец) (6 сезон: 1-6 серии из 13)",
    "Id": "2023066",
    "OriginalName": "The Rookie",
    "Year": "2024",
    "Language": "3 x ПМ, СТ",
    "Format": "WEB-DL (1080p)",
    "Url": "https://kinozal.tv/details.php?id=2023066",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2023066",
    "Size": "19.63 ГБ",
    "Comments": "23",
    "Seeds": "32",
    "Peers": "18",
    "Date": "12.04.2024 23:43"
  },
  {
    "Name": "Новичок (Новобранец) (6 сезон: 1-6 серии из 10)",
    "Id": "2022944",
    "OriginalName": "The Rookie",
    "Year": "2024",
    "Language": "ПМ (LostFilm)",
    "Format": "WEB-DLRip",
    "Url": "https://kinozal.tv/details.php?id=2022944",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2022944",
    "Size": "3.57 ГБ",
    "Comments": "12",
    "Seeds": "41",
    "Peers": "28",
    "Date": "12.04.2024 08:31"
  },
  {
    "Name": "Новичок (Новобранец) (1-6 сезоны: 1-104 серии из 120)",
    "Id": "1656552",
    "OriginalName": "The Rookie",
    "Year": "2018-2024",
    "Language": "ПМ (LostFilm)",
    "Format": "WEB-DLRip (1080p)",
    "Url": "https://kinozal.tv/details.php?id=1656552",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1656552",
    "Size": "240.24 ГБ",
    "Comments": "133",
    "Seeds": "6",
    "Peers": "16",
    "Date": "12.04.2024 01:09"
  },
  {
    "Name": "Новичок (Новобранец) (6 сезон: 1-4 серии из 13)",
    "Id": "2026484",
    "OriginalName": "The Rookie",
    "Year": "2024",
    "Language": "3 x ПМ, СТ",
    "Format": "WEB-DL (720p)",
    "Url": "https://kinozal.tv/details.php?id=2026484",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2026484",
    "Size": "7.65 ГБ",
    "Comments": "1",
    "Seeds": "0",
    "Peers": "1",
    "Date": "30.03.2024 15:27"
  }
]
```

- Search by id:

▶️ `curl -s http://127.0.0.1:8443/api/kinozal/2022944`

```json
[
  {
    "Original": "The Rookie",
    "Title": "Новичок (Новобранец)",
    "Hash": "E5B7183C1E987471F31186D3ADDA6E77176804D1",
    "IMDb_link": "https://www.imdb.com/title/tt7587890/",
    "Kinopoisk_link": "https://www.kinopoisk.ru/film/1142153",
    "IMDB_id": "7587890",
    "Kinopoisk_id": "1142153",
    "Year": "2024",
    "Type": "Боевик, драма, криминал",
    "Release": "США, eOne Television, Perfectmon Pictures, ABC Studios",
    "Directer": "Тори Гаррет, Дэвид МакУиртер, Роберт Белла, Чери Ноулан, Джон Уэртас",
    "Actors": "Натан Филлион, Шон Эшмор, Эрик Винтер, Мелисса О`Нил, Алисса Диас, Ричард Т. Джонс, Мекиа Кокс, Тру Валентино, Эрджей Смит, Каноа Гу, Майкл Трукко, Пейтон Лист (I), Брент Хафф",
    "Description": "Начинать с чистого листа всегда нелегко, особенно для уроженца маленького городка Джона Нолана, который после инцидента, перевернувшего его жизнь, решил воплотить в жизнь давнюю мечту и присоединиться к полиции Лос-Анджелеса. Возрастного новичка встречают с понятным скептицизмом, однако жизненный опыт, упорство и чувство юмора дают Джону преимущество.",
    "Quality": "WEB-DLRip",
    "Video": "XviD, ~ 1600 Кбит/с, 720x400",
    "Audio": "Русский, английский (АС3, 2 ch, 192 Кбит/с)",
    "Size": "3.57 ГБ",
    "Duration": "6 x ~ 00:44:00",
    "Transcript": "Профессиональный многоголосый",
    "Seeds": "41",
    "Peers": "28",
    "Downloaded": "1001",
    "Files": [
      {
        "name": "The.Rookie.S06E01.WEB-DLRip.RGzsRutracker.avi",
        "size": "614 МБ"
      },
      {
        "name": "The.Rookie.S06E02.WEB-DLRip.RGzsRutracker.avi",
        "size": "616 МБ"
      },
      {
        "name": "The.Rookie.S06E03.WEB-DLRip.RGzsRutracker.avi",
        "size": "597 МБ"
      },
      {
        "name": "The.Rookie.S06E04.WEB-DLRip.RGzsRutracker.avi",
        "size": "615 МБ"
      },
      {
        "name": "The.Rookie.S06E05.WEB-DLRip.RGzsRutracker.avi",
        "size": "597 МБ"
      },
      {
        "name": "The.Rookie.S06E06.WEB-DLRip.RGzsRutracker.avi",
        "size": "615 МБ"
      }
    ],
    "Comments": "12",
    "IMDb": "8.0",
    "Kinopoisk": "8.4",
    "Kinozal": "9.3",
    "Votes": "18",
    "Added": "23 февраля 2024 в 00:46",
    "Update": "12 апреля 2024 в 08:31"
  }
]
```

#### RuTor

- Search by title:

▶️ `curl -s http://127.0.0.1:8443/api/rutor/the+rookie+2024`

```json
[
  {
    "Name": "Новичок / Новобранец / The Rookie [06x01-06 из 22] (2024) WEBRip от Kerob | L2",
    "Id": "970650",
    "Url": "https://rutor.info/torrent/970650/novichok_novobranec_the-rookie-06x01-06-iz-22-2024-webrip-ot-kerob-l2",
    "Torrent": "https://d.rutor.info/download/970650",
    "Hash": "f3377c04134adeac02c4e191e0e6317436afddda",
    "Size": "3.39 GB",
    "Comments": "5",
    "Seed": "7",
    "Peer": "9",
    "Date": "10.04.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie [06x01-06 из 22] (2024) WEBRip 720p от Kerob | L2",
    "Id": "970647",
    "Url": "https://rutor.info/torrent/970647/novichok_novobranec_the-rookie-06x01-06-iz-22-2024-webrip-720p-ot-kerob-l2",
    "Torrent": "https://d.rutor.info/download/970647",
    "Hash": "4b6ec5d821d844831ae30e9c851cbf72a9528c85",
    "Size": "7.18 GB",
    "Comments": "0",
    "Seed": "8",
    "Peer": "5",
    "Date": "10.04.2024"
  }
]
```

- Search by id:

▶️ `curl -s http://127.0.0.1:8443/api/rutor/970650`

```json
{
  "Name": "Новичок / Новобранец / The Rookie [06x01-06 из 22] (2024) WEBRip от Kerob | L2",
  "Hash": "f3377c04134adeac02c4e191e0e6317436afddda",
  "Torrent": "https://d.rutor.info/download/970650",
  "IMDb_link": "http://www.imdb.com/title/tt7587890/",
  "Kinopoisk_link": "http://www.kinopoisk.ru/film/1142153/",
  "IMDb_id": "7587890",
  "Kinopoisk_id": "1142153",
  "Rating": "10 из 10 (1 голосов, самая низкая оценка - 10, самая высокая - 10)",
  "Category": "Зарубежные сериалы",
  "Seeds": "7",
  "Peers": "6",
  "Seed_Date": "25-04-2024 10:19:07 (59 минут назад)",
  "Add_Date": "10-04-2024 23:24:09  (14 дня назад)",
  "Size": "3.39 GB (3638136322 Bytes)",
  "Files": [
    {
      "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E01.400p.Kerob.avi",
      "Size": "602.01 MB"
    },
    {
      "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E02.400p.Kerob.avi",
      "Size": "562.48 MB"
    },
    {
      "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E03.400p.Kerob.avi",
      "Size": "621.50 MB"
    },
    {
      "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E04.400p.Kerob.avi",
      "Size": "690.81 MB"
    },
    {
      "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E05.400p.Kerob.avi",
      "Size": "460.92 MB"
    },
    {
      "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E06.400p.Kerob.avi",
      "Size": "531.88 MB"
    }
  ]
}
```

#### NoNameClub

▶️ `curl -s http://127.0.0.1:8443/api/nonameclub/the+rookie+2018`

```json
[
  {
    "Name": "Новичок / The Rookie (2018) WEB-DL [H.264/1080p-LQ] (сезон 1, серии 1-20 из 20) TVShows",
    "Id": "1259608",
    "Url": "https://nnmclub.to/forum/viewtopic.php?t=1259608",
    "Torrent": "https://nnmclub.to/forum/download.php?id=1018672",
    "Size": "51.2 GB",
    "Comments": "6",
    "Type": "Зарубежные сериалы",
    "Seed": "1",
    "Peer": "0",
    "Date": "22.04.2019 12:09"
  },
  {
    "Name": "Новичок / The Rookie (2018) WEB-DL [H.264/1080p-LQ] (сезон 1, серии 1-20 из 20) LostFilm",
    "Id": "1278446",
    "Url": "https://nnmclub.to/forum/viewtopic.php?t=1278446",
    "Torrent": "https://nnmclub.to/forum/download.php?id=1030902",
    "Size": "52.7 GB",
    "Comments": "6",
    "Type": "Зарубежные сериалы",
    "Seed": "3",
    "Peer": "1",
    "Date": "20.04.2019 03:30"
  },
  {
    "Name": "Новичок / The Rookie (2018) WEB-DLRip (сезон 1, серии 1-20 из 20) LostFilm",
    "Id": "1256703",
    "Url": "https://nnmclub.to/forum/viewtopic.php?t=1256703",
    "Torrent": "https://nnmclub.to/forum/download.php?id=1016767",
    "Size": "10.5 GB",
    "Comments": "31",
    "Type": "Зарубежные сериалы",
    "Seed": "7",
    "Peer": "2",
    "Date": "19.04.2019 01:55"
  },
  {
    "Name": "Новобранец / The Rookie (2018) WEB-DLRip [H.264/720p] (сезон 1, серия 1-8 из 20) LostFilm (обновляемая)",
    "Id": "1265982",
    "Url": "https://nnmclub.to/forum/viewtopic.php?t=1265982",
    "Torrent": "https://nnmclub.to/forum/download.php?id=1022722",
    "Size": "10.2 GB",
    "Comments": "6",
    "Type": "Архив Сериалов и Архив Старого многосерийного кино до 90-х",
    "Seed": "0",
    "Peer": "1",
    "Date": "22.12.2018 07:00"

```

- Search by id:

▶️ `curl -s http://127.0.0.1:8443/api/nonameclub/1259608`

```json
{
  "Name": "Новичок / The Rookie (2018) WEB-DL [H.264/1080p-LQ] (сезон 1, серии 1-20 из 20) TVShows",
  "Hash": "C4E5F91AB1F8BBDF79B51C6E6167CFC806E2AA2B",
  "Torrent": "https://nnmclub.to/forum/download.php?id=1018672",
  "IMDb_link": "https://www.imdb.com/title/tt7587890/?ref_=plg_rt_1",
  "Kinopoisk_link": "https://www.kinopoisk.ru/film/1142153/",
  "IMDb_id": "75878901",
  "Kinopoisk_id": "1142153",
  "Release": "США / eOne Television, Perfectmon Pictures, ABC Studios",
  "Type": "драма, криминал",
  "Directer": "Грег Биман, Адам Дэвидсон, Тоа Фрейзер",
  "Actors": "Нэйтан Филлион, Алисса Диас, Титус Макин мл., Эрик Винтер, Ричард Т. Джонс, Мелисса О’Нил, Мерседес Масон, Эфтон Уильямсон, Марсей Монро, Дэвид ДеСантос и др.",
  "Description": "Начинать с чистого листа всегда нелегко, особенно для уроженца маленького городка Джона Нолана, который после инцидента, перевернувшего его жизнь, решил воплотить в жизнь давнюю мечту и присоединиться к полиции Лос-Анджелеса. Возрастного новичка встречают с понятным скептицизмом, однако жизненный опыт, упорство и чувство юмора дают Джону преимущество",
  "Duration": "00:43:00 серия",
  "Video_Quality": "WEB-DL",
  "Video": "AVC/H.264, 1920x1080 (16:9), ~7024 kbps",
  "Audio": "Многоголосый закадровый, любительский (TVShows)",
  "Registration": "22 Апр 2019 12:09:12",
  "Rating": "4.7",
  "Votes": "56",
  "Size": "51.2 GB",
  "Files": [
    {
      "Name": "The.Rookie.S01.1080p.TVShows",
      "Size": "Directory"
    },
    {
      "Name": "The.Rookie.S01E01.1080p.TVShows.mkv",
      "Size": "2.42 GB"
    },
    {
      "Name": "The.Rookie.S01E02.1080p.TVShows.mkv",
      "Size": "2.68 GB"
    },
    {
      "Name": "The.Rookie.S01E03.1080p.TVShows.mkv",
      "Size": "2.61 GB"
    },
    {
      "Name": "The.Rookie.S01E04.1080p.TVShows.mkv",
      "Size": "2.11 GB"
    },
    {
      "Name": "The.Rookie.S01E05.1080p.TVShows.mkv",
      "Size": "2.16 GB"
    },
    {
      "Name": "The.Rookie.S01E06.1080p.TVShows.mkv",
      "Size": "2.43 GB"
    },
    {
      "Name": "The.Rookie.S01E07.1080p.TVShows.mkv",
      "Size": "2.23 GB"
    },
    {
      "Name": "The.Rookie.S01E08.1080p.TVShows.mkv",
      "Size": "1.85 GB"
    },
    {
      "Name": "The.Rookie.S01E09.1080p.TVShows.mkv",
      "Size": "2.03 GB"
    },
    {
      "Name": "The.Rookie.S01E10.1080p.TVShows.mkv",
      "Size": "2.81 GB"
    },
    {
      "Name": "The.Rookie.S01E11.1080p.TVShows.mkv",
      "Size": "3 GB"
    },
    {
      "Name": "The.Rookie.S01E12.1080p.TVShows.mkv",
      "Size": "2.74 GB"
    },
    {
      "Name": "The.Rookie.S01E13.1080p.TVShows.mkv",
      "Size": "2.88 GB"
    },
    {
      "Name": "The.Rookie.S01E14.1080p.TVShows.mkv",
      "Size": "2.88 GB"
    },
    {
      "Name": "The.Rookie.S01E15.1080p.TVShows.mkv",
      "Size": "2.68 GB"
    },
    {
      "Name": "The.Rookie.S01E16.1080p.TVShows.mkv",
      "Size": "2.85 GB"
    },
    {
      "Name": "The.Rookie.S01E17.1080p.TVShows.mkv",
      "Size": "2.68 GB"
    },
    {
      "Name": "The.Rookie.S01E18.1080p.TVShows.mkv",
      "Size": "2.67 GB"
    },
    {
      "Name": "The.Rookie.S01E19.1080p.TVShows.mkv",
      "Size": "2.76 GB"
    },
    {
      "Name": "The.Rookie.S01E20.1080p.TVShows.mkv",
      "Size": "2.7 GB"
    }
  ]
}
```

<!--
#### FastsTorrent

▶️ `Invoke-RestMethod "http://127.0.0.1:8443/api/faststorrent/новичок/0"`

```PowerShell
Name                                                                Size      Torrent
----                                                                ----      -------
Новичок (2023) WEB-DLRip                                            1,37 ГБ   http://fasts-torrent.net/download/444562/torrent/-2023-web-dlrip/
Новичок (2023) WEB-DLRip 1080p                                      4,31 ГБ   http://fasts-torrent.net/download/444563/torrent/-2023-web-dlrip-1080p/
Новичок: Федералы (сезон 1, серия 1-22 из 22) (2022) WEBRip | RuDub 11,39 ГБ  http://fasts-torrent.net/download/433754/torrent/-1-1-22-22-2022-webrip-rudub/
Новичок (3 сезон: 1-11 серии из 20) (2021) WEBRip | LakeFilms       4.31 Gb   http://fasts-torrent.net/download/397471/torrent/-3-1-11-20-2021-webrip-lakefilms/
Новичок (3 сезон: 1-11 серии из 20) (2021) WEBRip 720p | LakeFilms  8.58 Gb   http://fasts-torrent.net/download/397470/torrent/-3-1-11-20-2021-webrip-720p-lakefilms/
Новичок (3 сезон: 1-11 серии из 20) (2021) WEBRip 1080p | LakeFilms 14.06 Gb  http://fasts-torrent.net/download/397469/torrent/-3-1-11-20-2021-webrip-1080p-lakefilms/
Новичок (3 сезон: 1-3 серии из 20)  (2020)  WEB-DLRip | LostFilm    1.8 Gb    http://fasts-torrent.net/download/390632/torrent/-3-1-3-20-2020-web-dlrip-lostfilm/
Новичок (3 сезон: 1 серии из 20)  (2020)  WEB-DL 720p | LostFilm    1.67 Gb   http://fasts-torrent.net/download/389588/torrent/-3-1-20-2020-web-dl-720p-lostfilm/
Новичок (3 сезон: 1 серии из 20) (2021) WEBRip 1080p | Ultradox     1.53 Gb   http://fasts-torrent.net/download/389406/torrent/-3-1-20-2021-webrip-1080p-ultradox/
Новичок (3 сезон: 1 серии из 20) (2021) WEBRip 720p | Ultradox      982.68 Mb http://fasts-torrent.net/download/389405/torrent/-3-1-20-2021-webrip-720p-ultradox/
```
-->

### Save torrent file

To save the torrent file on your computer, you can use one of the following constructs:

- **Linux** via `Bash`:

```bash
id=970650
url=$(curl -s "http://127.0.0.1:8443/api/rutor/$id" | jq -r .Torrent)
curl -s $url --output ~/downloads/$id.torrent
```

- **Windows** via `PowerShell`:

```PowerShell
$id = 970650
$url = $(Invoke-RestMethod "http://127.0.0.1:8443/api/rutor/$id").Torrent
Invoke-RestMethod $url -OutFile "$home\Downloads\$id.torrent"
```

- **Node.js** via `Axios`:

```js
const axios = require('axios')
const os = require('os')
const fs = require('fs')
const path = require('path')

const id = 970650
const url = `http://127.0.0.1:8443/api/rutor/${id}`
const homeDir = os.homedir()

axios.get(url).then(response => {
    const torrentUrl = response.data.Torrent
    return axios({
        url: torrentUrl,
        method: 'GET',
        responseType: 'stream'
    })
    }).then(response => {
        const filePath = path.join(homeDir, 'downloads', `${id}.torrent`)
        const writer = fs.createWriteStream(filePath)
        response.data.pipe(writer)
    })
```