- [Endpoint format](#endpoint-format)
- [Parameters](#parameters)
- [Requests and responses](#requests-and-responses)
  - [All](#all)
  - [RuTracker](#rutracker)
  - [Kinozal](#kinozal)
  - [RuTor](#rutor)
  - [NoNameClub](#nonameclub)
  - [FastsTorrent](#faststorrent)
- [Save torrent file](#-save-torrent-file)


### Endpoint format

```js
/api/<PROVIDER/ALL>/<TITLE/ID>/<PAGE>/<YEAR>
```

**Method** only: `GET`

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

▶️ `curl -s http://127.0.0.1:8443/api/all/Bo+Path+of+the+Teal+Lotus`

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

- Search by title:

▶️ `curl -s http://127.0.0.1:8443/api/rutracker/the+rookie+2024`

```json
[
  {
    "Name": "Новичок / Новобранец / The Rookie / Сезон: 6 / Серии: 1-10 из 10 (Билл Роу, Майкл Гои) [2024, США, драма, комедия, криминал, WEB-DL 1080p] 3 x MVO (LostFilm, TVShows, HDrezka) + Original + Sub (Rus, Eng)",
    "Id": "6489949",
    "Url": "https://rutracker.net/forum/viewtopic.php?t=6489949",
    "Torrent": "https://rutracker.net/forum/dl.php?t=6489949",
    "Size": "32.79 GB",
    "Download_Count": "741",
    "Checked": "True",
    "Type": "Сериалы США и Канады (HD Video)",
    "Type_Link": "https://rutracker.net/forum/tracker.php?f=266",
    "Seeds": "13",
    "Peers": "5",
    "Date": "26.06.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie / Сезон: 6 / Серии: 1-10 из 10 (Билл Роу) [2024, США, драма, комедия, криминал, WEB-DL 720p] MVO (LostFilm) + MVO (TVShows) + MVO (HDrezka) + Original + Sub (Rus, Eng)",
    "Id": "6498673",
    "Url": "https://rutracker.net/forum/viewtopic.php?t=6498673",
    "Torrent": "https://rutracker.net/forum/dl.php?t=6498673",
    "Size": "18.33 GB",
    "Download_Count": "1510",
    "Checked": "True",
    "Type": "Сериалы США и Канады (HD Video)",
    "Type_Link": "https://rutracker.net/forum/tracker.php?f=266",
    "Seeds": "17",
    "Peers": "3",
    "Date": "25.05.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie / Сезон: 6 / Серии: 1-10 из 10 (Билл Роу, Майкл Гои) [2024, США, боевик, драма, криминал, WEB-DLRip] MVO (LostFilm) + Original",
    "Id": "6489937",
    "Url": "https://rutracker.net/forum/viewtopic.php?t=6489937",
    "Torrent": "https://rutracker.net/forum/dl.php?t=6489937",
    "Size": "5.95 GB",
    "Download_Count": "3431",
    "Checked": "True",
    "Type": "Сериалы США и Канады",
    "Type_Link": "https://rutracker.net/forum/tracker.php?f=235",
    "Seeds": "29",
    "Peers": "21",
    "Date": "24.05.2024"
  },
  {
    "Name": "(Soundtrack, Rock) Новичок / Новобранец / The Rookie (Daddy Cop (From The TV Show \"The Rookie\")) (by Zander Hawley) - 2024 (2018), MP3 (tracks), 320 kbps",
    "Id": "6499482",
    "Url": "https://rutracker.net/forum/viewtopic.php?t=6499482",
    "Torrent": "https://rutracker.net/forum/dl.php?t=6499482",
    "Size": "5.3 MB",
    "Download_Count": "50",
    "Checked": "True",
    "Type": "Саундтреки к сериалам (lossy)",
    "Type_Link": "https://rutracker.net/forum/tracker.php?f=1499",
    "Seeds": "2",
    "Peers": "0",
    "Date": "14.03.2024"
  }
]
```

- Search by id:

▶️ `curl -s http://127.0.0.1:8443/api/rutracker/6489937`

```json
 {
  "Name": "Новичок / Новобранец / The Rookie / Сезон: 6 / Серии: 1-10 из 10 (Билл Роу, Майкл Гои) [2024, США, боевик, драма, криминал, WEB-DLRip] MVO (LostFilm) + Original",
  "Url": "https://rutracker.org/forum/viewtopic.php?t=6489937",
  "Hash": "3348D0A58DD8F5B251C7A361C9D235549260BA60",
  "Magnet": "magnet:?xt=urn:btih:3348D0A58DD8F5B251C7A361C9D235549260BA60&tr=http%3A%2F%2Fretracker.local%2Fannounce&tr=http%3A%2F%2Fbt.t-ru.org%2Fann&tr=http%3A%2F%2Fbt2.t-ru.org%2Fann&tr=http%3A%2F%2Fbt3.t-ru.org%2Fann&tr=http%3A%2F%2Fbt4.t-ru.org%2Fann",
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
    },
    {
      "name": "The.Rookie.S06E07.WEB-DLRip.RGzsRutracker.avi",
      "size": "607.10 MB"
    },
    {
      "name": "The.Rookie.S06E08.WEB-DLRip.RGzsRutracker.avi",
      "size": "610.67 MB"
    },
    {
      "name": "The.Rookie.S06E09.WEB-DLRip.RGzsRutracker.avi",
      "size": "614.24 MB"
    },
    {
      "name": "The.Rookie.S06E10.WEB-DLRip.RGzsRutracker.avi",
      "size": "611.32 MB"
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
    "Name": "Новичок (Новобранец) (6 сезон: 1-10 серии из 10)",
    "Id": "2023066",
    "OriginalName": "The Rookie",
    "Year": "2024",
    "Language": "3 x ПМ, СТ",
    "Format": "WEB-DL (1080p)",
    "Url": "https://kinozal.tv/details.php?id=2023066",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2023066",
    "Size": "32.79 ГБ",
    "Comments": "34",
    "Seeds": "10",
    "Peers": "2",
    "Date": "26.06.2024 01:17"
  },
  {
    "Name": "Новичок (Новобранец) (1-6 сезоны: 1-108 серии из 108)",
    "Id": "2042752",
    "OriginalName": "The Rookie",
    "Year": "2018-2024",
    "Language": "ПМ (LostFilm)",
    "Format": "WEB-DLRip (720p)",
    "Url": "https://kinozal.tv/details.php?id=2042752",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2042752",
    "Size": "153.07 ГБ",
    "Comments": "1",
    "Seeds": "2",
    "Peers": "4",
    "Date": "25.06.2024 09:30"
  },
  {
    "Name": "Новичок (Новобранец) (6 сезон: 1-10 серии из 10)",
    "Id": "2026484",
    "OriginalName": "The Rookie",
    "Year": "2024",
    "Language": "3 x ПМ, СТ",
    "Format": "WEB-DL (720p)",
    "Url": "https://kinozal.tv/details.php?id=2026484",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2026484",
    "Size": "18.33 ГБ",
    "Comments": "4",
    "Seeds": "14",
    "Peers": "2",
    "Date": "25.05.2024 11:02"
  },
  {
    "Name": "Новичок (Новобранец) (6 сезон: 1-10 серии из 10)",
    "Id": "2022944",
    "OriginalName": "The Rookie",
    "Year": "2024",
    "Language": "ПМ (LostFilm)",
    "Format": "WEB-DLRip",
    "Url": "https://kinozal.tv/details.php?id=2022944",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2022944",
    "Size": "5.95 ГБ",
    "Comments": "22",
    "Seeds": "41",
    "Peers": "11",
    "Date": "24.05.2024 14:31"
  },
  {
    "Name": "Новичок (Новобранец) (1-6 сезоны: 1-108 серии из 108)",
    "Id": "1656552",
    "OriginalName": "The Rookie",
    "Year": "2018-2024",
    "Language": "ПМ (LostFilm)",
    "Format": "WEB-DLRip (1080p)",
    "Url": "https://kinozal.tv/details.php?id=1656552",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1656552",
    "Size": "249.58 ГБ",
    "Comments": "148",
    "Seeds": "8",
    "Peers": "11",
    "Date": "24.05.2024 10:58"
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
    "Url": "https://kinozal.tv/details.php?id=2022944",
    "Hash": "3348D0A58DD8F5B251C7A361C9D235549260BA60",
    "Magnet": "magnet:?xt=urn:btih:3348D0A58DD8F5B251C7A361C9D235549260BA60&tr=http%3A%2F%2Fretracker.local%2Fannounce&tr=http%3A%2F%2Ftr0.torrent4me.com%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr1.torrent4me.com%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr2.torrent4me.com%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr3.torrent4me.com%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr4.torrent4me.com%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr5.torrent4me.com%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr0.tor4me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr1.tor4me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr2.tor4me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr3.tor4me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr4.tor4me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr5.tor4me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr0.tor2me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr1.tor2me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr2.tor2me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr3.tor2me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr4.tor2me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr5.tor2me.info%2Fann%3Fuk%3DkCm7WcIM00",
    "IMDb": "https://www.imdb.com/title/tt7587890/",
    "Kinopoisk": "https://www.kinopoisk.ru/film/1142153",
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
    "Size": "5.95 ГБ",
    "Duration": "10 x ~ 00:44:00",
    "Transcript": "Профессиональный многоголосый",
    "Seeds": "41",
    "Peers": "11",
    "Download_Count": "2015",
    "Files_Count": "10",
    "Comments": "22",
    "IMDb_Rating": "8.0",
    "Kinopoisk_Rating": "8.4",
    "Kinozal_Rating": "8.9",
    "Votes": "35",
    "Added_Date": "23 февраля 2024 в 00:46",
    "Update_Date": "24 мая 2024 в 14:31",
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
      },
      {
        "name": "The.Rookie.S06E07.WEB-DLRip.RGzsRutracker.avi",
        "size": "607 МБ"
      },
      {
        "name": "The.Rookie.S06E08.WEB-DLRip.RGzsRutracker.avi",
        "size": "611 МБ"
      },
      {
        "name": "The.Rookie.S06E09.WEB-DLRip.RGzsRutracker.avi",
        "size": "614 МБ"
      },
      {
        "name": "The.Rookie.S06E10.WEB-DLRip.RGzsRutracker.avi",
        "size": "611 МБ"
      }
    ]
  }
]
```

#### RuTor

- Search by title:

▶️ `curl -s http://127.0.0.1:8443/api/rutor/the+rookie+2024`

```json
.[
  {
    "Name": "Новичок / Новобранец / The Rookie [S06] (2024) WEB-DL 720p | LostFilm, TVShows, HDrezka Studio",
    "Id": "986185",
    "Url": "https://rutor.info/torrent/986185/novichok_novobranec_the-rookie-s06-2024-web-dl-720p-lostfilm-tvshows-hdrezka-studio",
    "Torrent": "https://d.rutor.info/download/986185",
    "Hash": "6c3fa72ddc8f39afc7743f147e8ca3ee66ee99df",
    "Size": "18.33 GB",
    "Comments": "0",
    "Seeds": "5",
    "Peers": "6",
    "Date": "25.05.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie [S06] (2024) WEB-DLRip | LostFilm",
    "Id": "986139",
    "Url": "https://rutor.info/torrent/986139/novichok_novobranec_the-rookie-s06-2024-web-dlrip-lostfilm",
    "Torrent": "https://d.rutor.info/download/986139",
    "Hash": "3348d0a58dd8f5b251c7a361c9d235549260ba60",
    "Size": "5.95 GB",
    "Comments": "0",
    "Seeds": "35",
    "Peers": "18",
    "Date": "25.05.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie [S06] (2024) WEB-DL 1080p | LostFilm, TVShows, HDrezka Studio",
    "Id": "986138",
    "Url": "https://rutor.info/torrent/986138/novichok_novobranec_the-rookie-s06-2024-web-dl-1080p-lostfilm-tvshows-hdrezka-studio",
    "Torrent": "https://d.rutor.info/download/986138",
    "Hash": "2fdb28133eee0e3842ed855a08c07f35e482eedc",
    "Size": "32.79 GB",
    "Comments": "0",
    "Seeds": "13",
    "Peers": "7",
    "Date": "25.05.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie [S06] (2024) WEBRip от Kerob | L2",
    "Id": "970650",
    "Url": "https://rutor.info/torrent/970650/novichok_novobranec_the-rookie-s06-2024-webrip-ot-kerob-l2",
    "Torrent": "https://d.rutor.info/download/970650",
    "Hash": "b7a46e99dd9164787baf77d4f98d84ceb5301ac0",
    "Size": "5.92 GB",
    "Comments": "7",
    "Seeds": "2",
    "Peers": "5",
    "Date": "22.05.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie [S06] (2024) WEBRip 720p от Kerob | L2",
    "Id": "970647",
    "Url": "https://rutor.info/torrent/970647/novichok_novobranec_the-rookie-s06-2024-webrip-720p-ot-kerob-l2",
    "Torrent": "https://d.rutor.info/download/970647",
    "Hash": "99bb9749164676d36d17b2b72497d6f02bf88c50",
    "Size": "12.18 GB",
    "Comments": "0",
    "Seeds": "1",
    "Peers": "4",
    "Date": "22.05.2024"
  }
]
```

- Search by id:

▶️ `curl -s http://127.0.0.1:8443/api/rutor/970650`

```json
{
  "Name": "Новичок / Новобранец / The Rookie [S06] (2024) WEBRip от Kerob | L2",
  "Url": "https://rutor.info/torrent/970650",
  "Hash": "b7a46e99dd9164787baf77d4f98d84ceb5301ac0",
  "Magnet": "magnet:?xt=urn:btih:b7a46e99dd9164787baf77d4f98d84ceb5301ac0&tr=http%3A%2F%2Fretracker.local%2Fannounce&tr=udp%3A%2F%2Fopentor.net%3A6969&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.grepler.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.bitsearch.to%3A1337%2Fannounce&tr=http%3A%2F%2Fh1.trakx.nibba.trade%3A80%2Fannounce&tr=http%3A%2F%2Fh2.trakx.nibba.trade%3A80%2Fannounce&tr=http%3A%2F%2Fh3.trakx.nibba.trade%3A80%2Fannounce&tr=http%3A%2F%2Fh4.trakx.nibba.trade%3A80%2Fannounce&tr=http%3A%2F%2Fh5.trakx.nibba.trade%3A80%2Fannounce",
  "Torrent": "https://d.rutor.info/download/970650",
  "IMDb_link": "http://www.imdb.com/title/tt7587890/",
  "Kinopoisk_link": "http://www.kinopoisk.ru/film/1142153/",
  "IMDb_id": "7587890",
  "Kinopoisk_id": "1142153",
  "Rating": "10 из 10 (2 голосов, самая низкая оценка - 10, самая высокая - 10)",
  "Category": "Зарубежные сериалы",
  "Seeds": "5",
  "Peers": "2",
  "Seed_Date": "19-07-2024 8:19:08 (49 минут назад)",
  "Add_Date": "22-05-2024 17:51:28  (2 месяца назад)",
  "Size": "5.92 GB (6360685830 Bytes)",
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
    },
    {
      "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E07.400p.Kerob.avi",
      "Size": "931.94 MB"
    },
    {
      "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E08.400p.Kerob.avi",
      "Size": "506.55 MB"
    },
    {
      "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E09.400p.Kerob.avi",
      "Size": "523.90 MB"
    },
    {
      "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E10.400p.Kerob.avi",
      "Size": "634.04 MB"
    }
  ]
}
```

#### NoNameClub

- Search by title:

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
    "Seeds": "1",
    "Peers": "0",
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
    "Seeds": "3",
    "Peers": "0",
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
    "Seeds": "6",
    "Peers": "2",
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
    "Seeds": "0",
    "Peers": "1",
    "Date": "22.12.2018 07:00"
  }
]
```

- Search by id:

▶️ `curl -s http://127.0.0.1:8443/api/nonameclub/1259608`

```json
{
  "Name": "Новичок / The Rookie (2018) WEB-DL [H.264/1080p-LQ] (сезон 1, серии 1-20 из 20) TVShows",
  "Url": "https://nnmclub.to/forum/viewtopic.php?t=1259608",
  "Hash": "C4E5F91AB1F8BBDF79B51C6E6167CFC806E2AA2B",
  "Magnet": "magnet:?xt=urn:btih:C4E5F91AB1F8BBDF79B51C6E6167CFC806E2AA2B&tr=http%3A%2F%2Fretracker.local%2Fannounce&tr=http%3A%2F%2Fbt01.nnm-club.info%3A2710%2Fannounce&tr=http%3A%2F%2Fbt02.nnm-club.info%3A2710%2Fannounce&tr=http%3A%2F%2Fbt01.nnm-club.cc%3A2710%2Fannounce&tr=http%3A%2F%2Fbt02.nnm-club.cc%3A2710%2Fannounce",
  "Torrent": "https://nnmclub.to/forum/download.php?id=1018672",
  "IMDb_link": "https://www.imdb.com/title/tt7587890/?ref_=plg_rt_1",
  "Kinopoisk_link": "https://www.kinopoisk.ru/film/1142153/",
  "IMDb_id": "75878901",
  "Kinopoisk_id": "1142153",
  "Release": "США / eOne Television, Perfectmon Pictures, ABC Studios",
  "Type": "драма",
  "Directer": "Грег Биман, Адам Дэвидсон, Тоа Фрейзер",
  "Actors": "Нэйтан Филлион, Алисса Диас, Титус Макин мл., Эрик Винтер, Ричард Т. Джонс, Мелисса О’Нил, Мерседес Масон, Эфтон Уильямсон, Марсей Монро, Дэвид ДеСантос и др.",
  "Description": "Начинать с чистого листа всегда нелегко, особенно для уроженца маленького городка Джона Нолана, который после инцидента, перевернувшего его жизнь, решил воплотить в жизнь давнюю мечту и присоединиться к полиции Лос-Анджелеса. Возрастного новичка встречают с понятным скептицизмом, однако жизненный опыт, упорство и чувство юмора дают Джону преимущество",
  "Duration": "00:43:00 серия",
  "Video_Quality": "WEB-DL",
  "Video": "AVC/H.264, 1920x1080 (16:9), ~7024 kbps",
  "Audio": "Многоголосый закадровый, любительский (TVShows)",
  "Registration": "22 Апр 2019 12:09:12",
  "Rating": "4.6",
  "Votes": "59",
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

▶️ `curl -s "http://127.0.0.1:8443/api/faststorrent/новичок"`

```json
[
  {
    "Name": "Новичок (2024) TS",
    "Size": "1,37 ГБ",
    "Torrent": "http://fasts-torrent.net/download/455970/torrent/-2024-ts/"
  },
  {
    "Name": "Новичок (2024) TS 1080p",
    "Size": "3,36 ГБ",
    "Torrent": "http://fasts-torrent.net/download/455971/torrent/-2024-ts-1080p/"
  },
  {
    "Name": "Новичок (2023) WEB-DLRip",
    "Size": "1,37 ГБ",
    "Torrent": "http://fasts-torrent.net/download/444562/torrent/-2023-web-dlrip/"
  },
  {
    "Name": "Новичок (2023) WEB-DLRip 1080p",
    "Size": "4,31 ГБ",
    "Torrent": "http://fasts-torrent.net/download/444563/torrent/-2023-web-dlrip-1080p/"
  },
  {
    "Name": "Новичок: Федералы (сезон 1, серия 1-22 из 22) (2022) WEBRip | RuDub",
    "Size": "11,39 ГБ",
    "Torrent": "http://fasts-torrent.net/download/433754/torrent/-1-1-22-22-2022-webrip-rudub/"
  },
  {
    "Name": "Новичок (3 сезон: 1-11 серии из 20) (2021) WEBRip | LakeFilms",
    "Size": "4.31 Gb",
    "Torrent": "http://fasts-torrent.net/download/397471/torrent/-3-1-11-20-2021-webrip-lakefilms/"
  },
  {
    "Name": "Новичок (3 сезон: 1-11 серии из 20) (2021) WEBRip 720p | LakeFilms",
    "Size": "8.58 Gb",
    "Torrent": "http://fasts-torrent.net/download/397470/torrent/-3-1-11-20-2021-webrip-720p-lakefilms/"
  },
  {
    "Name": "Новичок (3 сезон: 1-11 серии из 20) (2021) WEBRip 1080p | LakeFilms",
    "Size": "14.06 Gb",
    "Torrent": "http://fasts-torrent.net/download/397469/torrent/-3-1-11-20-2021-webrip-1080p-lakefilms/"
  },
  {
    "Name": "Новичок (3 сезон: 1-3 серии из 20)  (2020)  WEB-DLRip | LostFilm",
    "Size": "1.8 Gb",
    "Torrent": "http://fasts-torrent.net/download/390632/torrent/-3-1-3-20-2020-web-dlrip-lostfilm/"
  },
  {
    "Name": "Новичок (3 сезон: 1 серии из 20)  (2020)  WEB-DL 720p | LostFilm",
    "Size": "1.67 Gb",
    "Torrent": "http://fasts-torrent.net/download/389588/torrent/-3-1-20-2020-web-dl-720p-lostfilm/"
  }
]

```

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