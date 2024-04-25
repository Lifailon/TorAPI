
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
| [NoNameClub](https://nnmclub.to)         | 2006    | 1       | No           | Yes | True        |
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
| *PROVIDER* | True      | *str* | Provider name (corresponds to the [list of providers](#-full-list-of-available-providers)) or *ALL*. | 
| *TITLE*    | True*     | *str* | *Name* of the movie or TV series. Cyrillic characters are supported. You can use spaces if the query is enclosed in inverted commas, or use an addition character (+) instead. |
| *ID*       | True*     | *str* | Get more information about a film or TV series by the ID of the specified provider.                  |
| *PAGE*     | False     | *int* | Page number from which the response will be received (`0 to 20`).                                    |
| *YEAR*     | False     | *int* | Year of release of the film or series for filtering (supported only by the provider *Kinozal*).      |

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
    "Name": "Новичок (Новобранец) (6 сезон: 1-6 серии из 13)",
    "OriginalName": "The Rookie",
    "Year": "2024",
    "Language": "3 x ПМ, СТ",
    "Format": "WEB-DL (1080p)",
    "Id": "2023066",
    "Url": "https://kinozal.tv/details.php?id=2023066",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2023066",
    "Size": "19.63 ГБ",
    "Comments": "22",
    "Seeds": "40",
    "Peers": "23",
    "Date": "12.04.2024 23:43"
  },
  {
    "Name": "Новичок (Новобранец) (6 сезон: 1-6 серии из 10)",
    "OriginalName": "The Rookie",
    "Year": "2024",
    "Language": "ПМ (LostFilm)",
    "Format": "WEB-DLRip",
    "Id": "2022944",
    "Url": "https://kinozal.tv/details.php?id=2022944",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2022944",
    "Size": "3.57 ГБ",
    "Comments": "12",
    "Seeds": "32",
    "Peers": "33",
    "Date": "12.04.2024 08:31"
  },
  {
    "Name": "Новичок (Новобранец) (1-6 сезоны: 1-104 серии из 120)",
    "OriginalName": "The Rookie",
    "Year": "2018-2024",
    "Language": "ПМ (LostFilm)",
    "Format": "WEB-DLRip (1080p)",
    "Id": "1656552",
    "Url": "https://kinozal.tv/details.php?id=1656552",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1656552",
    "Size": "240.24 ГБ",
    "Comments": "133",
    "Seeds": "6",
    "Peers": "15",
    "Date": "12.04.2024 01:09"
  },
  {
    "Name": "Новичок (Новобранец) (6 сезон: 1-4 серии из 13)",
    "OriginalName": "The Rookie",
    "Year": "2024",
    "Language": "3 x ПМ, СТ",
    "Format": "WEB-DL (720p)",
    "Id": "2026484",
    "Url": "https://kinozal.tv/details.php?id=2026484",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2026484",
    "Size": "7.65 ГБ",
    "Comments": "1",
    "Seeds": "4",
    "Peers": "3",
    "Date": "30.03.2024 15:27"
  }
]
```

- Search by id:

▶️ `curl -s http://192.168.3.100:8443/api/kinozal/1656552 | jq .`

```json
[
  {
    "Original": "The Rookie",
    "Title": "Новичок (Новобранец)",
    "Hash": "91FD5276F3429F253F952394DE6D3949581853D6",
    "IMDb_link": "https://www.imdb.com/title/tt7587890/",
    "Kinopoisk_link": "https://www.kinopoisk.ru/film/1142153",
    "IMDB_id": "7587890",
    "Kinopoisk_id": "1142153",
    "Year": "2018-2024",
    "Type": "Драма, криминал",
    "Release": "США, eOne Television, ABC Studios",
    "Directer": "Грег Биман, Адам Дэвидсон, Тоа Фрейзер",
    "Actors": "Натан Филлион, Сара Шахи, Алисса Диас, Эли Лартер, Энни Вершинг, Хэролд Перрино, Ричард Т. Джонс, Титус Макин мл., Мелисса О`Нил, Эрик Винтер, Эфтон Уильямсон, Мекиа Кокс, Мерседес Масон, Шон Эшмор, Сет Грин",
    "Description": "Начинать с чистого листа всегда нелегко, особенно для уроженца маленького городка Джона Нолана, который после инцидента, перевернувшего его жизнь, решил воплотить в жизнь давнюю мечту и присоединиться к полиции Лос-Анджелеса. Возрастного новичка встречают с понятным скептицизмом, однако жизненный опыт, упорство и чувство юмора дают Джону преимущество.",
    "Quality": "WEB-DLRip (1080p)",
    "Video": "MPEG-4 AVC, ~ 6800 Кбит/с, 1920x1080",
    "Audio": "Русский, английский (AC3, 2 ch, 384 Кбит/с)",
    "Size": "240.24 ГБ",
    "Duration": "104 х ~ 00:44:00",
    "Transcript": "Профессиональный многоголосый",
    "Seeds": "6",
    "Peers": "15",
    "Downloaded": "2721",
    "Files": "104",
    "Comments": "133",
    "IMDb": "8.0",
    "Kinopoisk": "8.4",
    "Kinozal": "8.3",
    "Votes": "127",
    "Added": "26 октября 2018 в 00:00",
    "Update": "12 апреля 2024 в 01:09"
  }
]
```

- Example of using Cyrillic characters in a search query from PowerShell:

`Invoke-RestMethod "http://192.168.3.100:8443/api/kinozal/Новичок (Новобранец)/0/2024"`

```PowerShell
Name         : Новичок (Новобранец) (6 сезон: 1-6 серии из 13)
Id           : 2023066
OriginalName : The Rookie
Year         : 2024
Language     : 3 x ПМ, СТ
Format       : WEB-DL (1080p)
Url          : https://kinozal.tv/details.php?id=2023066
Torrent      : https://dl.kinozal.tv/download.php?id=2023066
Size         : 19.63 ГБ
Comments     : 23
Seeds        : 37
Peers        : 17
Date         : 12.04.2024 23:43

Name         : Новичок (Новобранец) (6 сезон: 1-6 серии из 10)
Id           : 2022944
OriginalName : The Rookie
Year         : 2024
Language     : ПМ (LostFilm)
Format       : WEB-DLRip
Url          : https://kinozal.tv/details.php?id=2022944
Torrent      : https://dl.kinozal.tv/download.php?id=2022944
Size         : 3.57 ГБ
Comments     : 12
Seeds        : 42
Peers        : 36
Date         : 12.04.2024 08:31

Name         : Новичок (Новобранец) (1-6 сезоны: 1-104 серии из 120)
Id           : 1656552
OriginalName : The Rookie
Year         : 2018-2024
Language     : ПМ (LostFilm)
Format       : WEB-DLRip (1080p)
Url          : https://kinozal.tv/details.php?id=1656552
Torrent      : https://dl.kinozal.tv/download.php?id=1656552
Size         : 240.24 ГБ
Comments     : 133
Seeds        : 6
Peers        : 23
Date         : 12.04.2024 01:09

Name         : Новичок (Новобранец) (6 сезон: 1-4 серии из 13)
Id           : 2026484
OriginalName : The Rookie
Year         : 2024
Language     : 3 x ПМ, СТ
Format       : WEB-DL (720p)
Url          : https://kinozal.tv/details.php?id=2026484
Torrent      : https://dl.kinozal.tv/download.php?id=2026484
Size         : 7.65 ГБ
Comments     : 1
Seeds        : 4
Peers        : 0
Date         : 30.03.2024 15:27
```

#### RuTor

- Search by title:

▶️ `curl -s http://192.168.3.100:8443/api/rutor/the+rookie+2024/0 | jq .`

```json
[
  {
    "Name": "Новичок / Новобранец / The Rookie [06x01-06 из 22] (2024) WEBRip от Kerob | L2",
    "Id": "970650",
    "Url": "https://rutor.info/torrent/970650/novichok_novobranec_the-rookie-06x01-06-iz-22-2024-webrip-ot-kerob-l2",
    "Torrent": "https://d.rutor.info/download/970650",
    "Magnet": "magnet:?xt=urn:btih:f3377c04134adeac02c4e191e0e6317436afddda&dn=rutor.info&tr=udp://opentor.net:6969&tr=http://retracker.local/announce",
    "Size": "3.39 GB",
    "Comments": "5",
    "Seed": "9",
    "Peer": "9",
    "Date": "10.04.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie [06x01-06 из 22] (2024) WEBRip 720p от Kerob | L2",
    "Id": "970647",
    "Url": "https://rutor.info/torrent/970647/novichok_novobranec_the-rookie-06x01-06-iz-22-2024-webrip-720p-ot-kerob-l2",
    "Torrent": "https://d.rutor.info/download/970647",
    "Magnet": "magnet:?xt=urn:btih:4b6ec5d821d844831ae30e9c851cbf72a9528c85&dn=rutor.info&tr=udp://opentor.net:6969&tr=http://retracker.local/announce",
    "Size": "7.18 GB",
    "Comments": "0",
    "Seed": "10",
    "Peer": "13",
    "Date": "10.04.2024"
  }
]
```

- Search by id:

▶️ `curl -s http://192.168.3.100:8443/api/rutor/970650 | jq .`

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

▶️ `curl -s http://192.168.3.100:8443/api/nonameclub/the+rookie+2018/0 | jq .`

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

`curl -s http://192.168.3.100:8443/api/nonameclub/1259608 | jq .`

```json
{
  "Name": "Новичок / The Rookie (2018) WEB-DL [H.264/1080p-LQ] (сезон 1, серии 1-20 из 20) TVShows",
  "Hash": "C4E5F91AB1F8BBDF79B51C6E6167CFC806E2AA2B",
  "Magnet": "magnet:?xt=urn:btih:C4E5F91AB1F8BBDF79B51C6E6167CFC806E2AA2B",
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