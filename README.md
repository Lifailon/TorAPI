
<h2 align='center'>🎞️ TorAPI 🎞️</h2>

<p align="center">
<a href="https://github.com/nodejs/node"><img title="Node" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"></a>
<a href="https://github.com/expressjs/express"><img title="Express" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"></a>
</p>

<p align="center">
<a href="https://github.com/Lifailon/TorAPI"><img title="Language"src="https://img.shields.io/github/languages/top/lifailon/TorAPI?logo=javascript&color=gold"></a>
<a href="https://github.com/Lifailon/TorAPI"><img title="Version"src="https://img.shields.io/github/v/tag/lifailon/TorAPI?logo=Git&label=version&color=blue"></a>
<a href="https://github.com/Lifailon/TorAPI"><img title="License"src="https://img.shields.io/github/license/lifailon/TorAPI?logo=GitHub&color=green"></a>
</p>

Unofficial API server for RuTracker, Kinozal, RuTor and NoNameClub to get torrent files and other information by movie title, series or id. This project is an idea fork of [Torrents-Api](https://github.com/Ryuk-me/Torrents-Api) ✨ (all code is completely rewritten) for Russian-speaking torrent providers.

📄 Released under the [MIT license](https://github.com/Lifailon/TorAPI/blob/rsa/LICENSE).

---

### 🔗 Full list of available providers:

| Provider name                            | Release | Mirrors | Registration | VPN | Search by ID |
| -                                        | -       | -       | -            | -   | -            |
| [RuTracker](https://rutracker.org)       | 2004    | 3       | Yes          | Yes | False        |
| [Kinozal](https://kinozal.tv)            | 2006    | 2       | Yes          | Yes | True         |
| [RuTor](https://rutor.info)              | 2009    | 2       | No           | Yes | True         |
| [NoNameClub](https://nnmclub.to)         | 2006    | 1       | No           | Yes | False        |
| [FastsTorrent](http://fasts-torrent.net) | 2022    | 1       | No           | No  | False        |

---

## 🚀 Start

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
/api/<PROVIDER/ALL>/<TITLE/ID>/<PAGE>/<YEAR>
```

#### Methods:

Only `GET`

#### Parameters:

| Name       | Mandatory | Type  | Description                                                                                          |
| -          | -         | -     | -                                                                                                    |
| *PROVIDER* | True      | *str* | Provider name (corresponds to the [list of providers](#-full-list-of-available-providers))  or *ALL* | 
| *TITLE*    | True*     | *str* | *Name* of the movie or TV series (the `+` symbol is used instead of a space)                         |
| *ID*       | True*     | *str* | Getting additional ID information from a specific provider                                           |
| *PAGE*     | False     | *int* | Page number from which the response will be received (`0 to 20`)                                     |
| *YEAR*     | False     | *int* | Year of release of the film or series for filtering (supported only by the provider *Kinozal*)       |

\* You can use one of two parameters in the endpoint path: *TITLE* or *ID*.

#### Requests and responses:

- [RuTracker](#rutracker)
- [Kinozal](#kinozal)
- [RuTor](#rutor)
- [NoNameClub](#nonameclub)
- [FastsTorrent](#faststorrent)

#### RuTracker

▶️ `curl -s http://192.168.3.100:8443/api/rutracker/the+rookie+2024/0 | jq .`

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

#### Kinozal

- Search by title:

▶️ `curl -s http://192.168.3.100:8443/api/kinozal/the+rookie/0/2024 | jq .`

```json
[
  {
    "Name": "Новичок (Новобранец) (6 сезон: 1-3 серии из 13)",
    "OriginalName": "The Rookie",
    "Year": "2024",
    "Language": "3 x ПМ, СТ",
    "Format": "WEB-DL (720p)",
    "Id": "2026484",
    "Url": "https://kinozal.tv/details.php?id=2026484",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2026484",
    "Size": "5.75 ГБ",
    "Comments": "1",
    "Seeds": "5",
    "Peers": "7",
    "Date": "11.03.2024 23:28"
  },
  {
    "Name": "Новичок (Новобранец) (6 сезон: 1-3 серии из 13)",
    "OriginalName": "The Rookie",
    "Year": "2024",
    "Language": "3 x ПМ, СТ",
    "Format": "WEB-DL (1080p)",
    "Id": "2023066",
    "Url": "https://kinozal.tv/details.php?id=2023066",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2023066",
    "Size": "9.92 ГБ",
    "Comments": "12",
    "Seeds": "38",
    "Peers": "27",
    "Date": "09.03.2024 00:29"
  },
  {
    "Name": "Новичок (Новобранец) (6 сезон: 1-3 серии из 10)",
    "OriginalName": "The Rookie",
    "Year": "2024",
    "Language": "ПМ (LostFilm)",
    "Format": "WEB-DLRip",
    "Id": "2022944",
    "Url": "https://kinozal.tv/details.php?id=2022944",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2022944",
    "Size": "1.78 ГБ",
    "Comments": "7",
    "Seeds": "31",
    "Peers": "14",
    "Date": "08.03.2024 11:53"
  },
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
    "Comments": "130",
    "Seeds": "10",
    "Peers": "24",
    "Date": "08.03.2024 09:08"
  }
]
```

- Search by ID:

▶️ `curl -s http://192.168.3.100:8443/api/kinozal/1656552 | jq .`

```json
[
  {
    "Hash": "9250D2B648F42D45AD2D8B516E9AEF3D1BAC2D95",
    "Title": "Новичок (Новобранец)",
    "Original": "The Rookie",
    "Year": "2018-2024",
    "Type": "Драма, криминал",
    "Release": "США, eOne Television, ABC Studios",
    "Directer": "Грег Биман, Адам Дэвидсон, Тоа Фрейзер",
    "Actors": "Натан Филлион, Сара Шахи, Алисса Диас, Эли Лартер, Энни Вершинг, Хэролд Перрино, Ричард Т. Джонс, Титус Макин мл., Мелисса О`Нил, Эрик Винтер, Эфтон Уильямсон, Мекиа Кокс, Мерседес Масон, Шон Эшмор, Сет Грин",
    "Description": "Начинать с чистого листа всегда нелегко, особенно для уроженца маленького городка Джона Нолана, который после инцидента, перевернувшего его жизнь, решил воплотить в жизнь давнюю мечту и присоединиться к полиции Лос-Анджелеса. Возрастного новичка встречают с понятным скептицизмом, однако жизненный опыт, упорство и чувство юмора дают Джону преимущество.",
    "Quality": "WEB-DLRip (1080p)",
    "Video": "MPEG-4 AVC, ~ 6800 Кбит/с, 1920x1080",
    "Audio": "Русский, английский (AC3, 2 ch, 384 Кбит/с)",
    "Size": "233.22 ГБ",
    "Duration": "101 х ~ 00:44:00",
    "Transcript": "Профессиональный многоголосый",
    "Seeds": "11",
    "Peers": "19",
    "Downloaded": "2693",
    "Files": "101",
    "Comments": "130",
    "IMDb": "8.0",
    "Kinopoisk": "8.4",
    "Kinozal": "8.4",
    "Votes": "122",
    "Added": "26 октября 2018 в 00:00",
    "Update": "8 марта 2024 в 09:08"
  }
]
```

#### RuTor

- Search by title:

▶️ `curl -s http://192.168.3.100:8443/api/rutor/the+rookie+2024/0 | jq .`

```json
[
  {
    "Name": "Новичок / Новобранец / The Rookie [06x01-03 из 22] (2024) WEBRip от Kerob | L2",
    "Id": "970650",
    "Url": "https://rutor.info/torrent/970650/novichok_novobranec_the-rookie-06x01-03-iz-22-2024-webrip-ot-kerob-l2",
    "Torrent": "https://d.rutor.info/download/970650",
    "Magnet": "magnet:?xt=urn:btih:150c072d8e97e9f47fe1adb9d41f19e5a6e045c7&dn=rutor.info&tr=udp://opentor.net:6969&tr=http://retracker.local/announce",
    "Size": "1.74 GB",
    "Comments": "3",
    "Seed": "12",
    "Peer": "8",
    "Date": "07.03.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie [06x01-03 из 22] (2024) WEBRip 720p от Kerob | L2",
    "Id": "970647",
    "Url": "https://rutor.info/torrent/970647/novichok_novobranec_the-rookie-06x01-03-iz-22-2024-webrip-720p-ot-kerob-l2",
    "Torrent": "https://d.rutor.info/download/970647",
    "Magnet": "magnet:?xt=urn:btih:6848c14a3a45d3fe8d47e2c980ae342f0793c2db&dn=rutor.info&tr=udp://opentor.net:6969&tr=http://retracker.local/announce",
    "Size": "3.33 GB",
    "Comments": "0",
    "Seed": "27",
    "Peer": "24",
    "Date": "07.03.2024"
  }
]
```

- Search by ID:

▶️ `curl -s http://192.168.3.100:8443/api/rutor/970650 | jq .`

```json
[
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
  }
]
```

#### NoNameClub

▶️ `curl -s http://192.168.3.100:8443/api/nonameclub/the+rookie+2018/0 | jq .`

```json
[
  {
    "Name": "Новичок / The Rookie (2018) WEB-DL [H.264/1080p-LQ] (сезон 1, серии 1-20 из 20) TVShows",
    "Url": "https://nnmclub.to/forum/viewtopic.php?t=1259608",
    "Torrent": "https://nnmclub.to/forum/download.php?id=1018672",
    "Size": "51.2 GB",
    "Comments": "6",
    "Type": "Зарубежные сериалы",
    "Type_Link": "https://nnmclub.to/forum/tracker.php?f=768&nm=the rookie 2018",
    "Seed": "2",
    "Peer": "0",
    "Date": "22.04.2019 12:09"
  },
  {
    "Name": "Новичок / The Rookie (2018) WEB-DL [H.264/1080p-LQ] (сезон 1, серии 1-20 из 20) LostFilm",
    "Url": "https://nnmclub.to/forum/viewtopic.php?t=1278446",
    "Torrent": "https://nnmclub.to/forum/download.php?id=1030902",
    "Size": "52.7 GB",
    "Comments": "6",
    "Type": "Зарубежные сериалы",
    "Type_Link": "https://nnmclub.to/forum/tracker.php?f=768&nm=the rookie 2018",
    "Seed": "4",
    "Peer": "0",
    "Date": "20.04.2019 03:30"
  },
  {
    "Name": "Новичок / The Rookie (2018) WEB-DLRip (сезон 1, серии 1-20 из 20) LostFilm",
    "Url": "https://nnmclub.to/forum/viewtopic.php?t=1256703",
    "Torrent": "https://nnmclub.to/forum/download.php?id=1016767",
    "Size": "10.5 GB",
    "Comments": "31",
    "Type": "Зарубежные сериалы",
    "Type_Link": "https://nnmclub.to/forum/tracker.php?f=768&nm=the rookie 2018",
    "Seed": "11",
    "Peer": "2",
    "Date": "19.04.2019 01:55"
  },
  {
    "Name": "Новобранец / The Rookie (2018) WEB-DLRip [H.264/720p] (сезон 1, серия 1-8 из 20) LostFilm (обновляемая)",
    "Url": "https://nnmclub.to/forum/viewtopic.php?t=1265982",
    "Torrent": "https://nnmclub.to/forum/download.php?id=1022722",
    "Size": "10.2 GB",
    "Comments": "6",
    "Type": "Архив Сериалов и Архив Старого многосерийного кино до 90-х",
    "Type_Link": "https://nnmclub.to/forum/tracker.php?f=802&nm=the rookie 2018",
    "Seed": "0",
    "Peer": "0",
    "Date": "22.12.2018 07:00"
  }
]
```

#### FastsTorrent

▶️ `curl -s http://192.168.3.100:8443/api/faststorrent/taxi/0 | jq .`

```json
[
  {
    "Name": "Такси / Taxi (2015) BDRip 720p | Лицензия",
    "Size": "3.06 Gb",
    "Torrent": "http://fasts-torrent.net/download/168797/torrent/-taxi-2015-bdrip-720p-/"
  },
  {
    "Name": "Такси / Taxi (2015) HDRip | Лицензия",
    "Size": "1.37 Gb",
    "Torrent": "http://fasts-torrent.net/download/168798/torrent/-taxi-2015-hdrip-/"
  }
]
```