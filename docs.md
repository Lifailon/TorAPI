<p align="center">
    <b>API static documentation with output examples for version 0.3<</b>
</p>

### Endpoint format

```js
/api/search/<TITLE/ID>/<PROVIDER/ALL>
```

**Method** only: `GET`

### Header parametres

| Name       | Mandatory | Type  | Description                                                                                                                                                                    |
| -          | -         | -     | -                                                                                                                                                                              |
| `query`    | True*     | *str* | Movie or TV series title to *search by title* in the path parameter, or identifier to *search by ID*. Cyrillic characters are supported. You can use spaces if the query is in quotation marks, or use the symbol `+` instead of a space. |
| `page`     | False     | *int* | Page number from which the response will be received (`0 to 20`).                                                                                                              |
| `year`     | False     | *int* | Year of release of the film or TV series for filtering (supported only by the provider **Kinozal**).                                                                           |

### Provider List

Get a list of available providers:

🔹 `curl -s http://localhost:8443/api/provider/list`

```json
{
  "Provider_List": [
    {
      "Provider": "RuTracker",
      "Url": "https://rutracker.org"
    },
    {
      "Provider": "Kinozal",
      "Url": "https://kinozal.tv"
    },
    {
      "Provider": "RuTor",
      "Url": "https://rutor.info"
    },
    {
      "Provider": "NoNameClub",
      "Url": "https://nnmclub.to"
    }
  ]
}
```

### Search by Title

#### All

🔹 `curl -s http://localhost:8443/api/search/title/all?query=Bo+Path+of+the+Teal+Lotus&page=0&year=0`

```json
{
  "RuTracker": [
    {
      "Name": "[DL] Bō (Bo): Path of the Teal Lotus [P] [ENG + 8] (2024, Arcade) [Scene]",
      "Id": "6553038",
      "Url": "https://rutracker.net/forum/viewtopic.php?t=6553038",
      "Torrent": "https://rutracker.net/forum/dl.php?t=6553038",
      "Size": "5.28 GB",
      "Download_Count": "554",
      "Checked": "True",
      "Type": "Горячие Новинки",
      "Type_Link": "https://rutracker.net/forum/tracker.php?f=635",
      "Seeds": "28",
      "Peers": "2",
      "Date": "20.07.2024"
    },
    {
      "Name": "[Nintendo Switch] Bo: Path of the Teal Lotus [NSZ][ENG]",
      "Id": "6552174",
      "Url": "https://rutracker.net/forum/viewtopic.php?t=6552174",
      "Torrent": "https://rutracker.net/forum/dl.php?t=6552174",
      "Size": "800.8 MB",
      "Download_Count": "617",
      "Checked": "True",
      "Type": "Switch",
      "Type_Link": "https://rutracker.net/forum/tracker.php?f=1605",
      "Seeds": "75",
      "Peers": "4",
      "Date": "17.07.2024"
    }
  ],
  "Kinozal": {
    "Result": "No matches were found for your title"
  },
  "RuTor": {
    "Result": "No matches were found for your title"
  },
  "NoNameClub": [
    {
      "Name": "Bo: Path of the Teal Lotus (2024) [Multi] (1.0) Scene Tenoke",
      "Id": "1739268",
      "Url": "https://nnmclub.to/forum/viewtopic.php?t=1739268",
      "Torrent": "https://nnmclub.to/forum/download.php?id=1333049",
      "Size": "5.28 GB",
      "Comments": "0",
      "Type": "Горячие новинки Игр",
      "Seeds": "0",
      "Peers": "0",
      "Date": "27.07.2024 03:28"
    }
  ]
}
```

#### RuTracker

🔹 `curl -s http://localhost:8443/api/search/title/rutracker?query=The+Rookie+2024&page=0&year=0`

```json
[
  {
    "Name": "Новичок / Новобранец / The Rookie / Сезон: 6 / Серии: 1-10 из 10 (Билл Роу, Майкл Гои) [2024, США, драма, комедия, криминал, WEB-DL 1080p] 3 x MVO (LostFilm, TVShows, HDrezka) + Original + Sub (Rus, Eng)",
    "Id": "6489949",
    "Url": "https://rutracker.net/forum/viewtopic.php?t=6489949",
    "Torrent": "https://rutracker.net/forum/dl.php?t=6489949",
    "Size": "32.79 GB",
    "Download_Count": "999",
    "Checked": "True",
    "Type": "Сериалы США и Канады (HD Video)",
    "Type_Link": "https://rutracker.net/forum/tracker.php?f=266",
    "Seeds": "36",
    "Peers": "9",
    "Date": "26.06.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie / Сезон: 6 / Серии: 1-10 из 10 (Билл Роу) [2024, США, драма, комедия, криминал, WEB-DL 720p] MVO (LostFilm) + MVO (TVShows) + MVO (HDrezka) + Original + Sub (Rus, Eng)",
    "Id": "6498673",
    "Url": "https://rutracker.net/forum/viewtopic.php?t=6498673",
    "Torrent": "https://rutracker.net/forum/dl.php?t=6498673",
    "Size": "18.33 GB",
    "Download_Count": "1637",
    "Checked": "True",
    "Type": "Сериалы США и Канады (HD Video)",
    "Type_Link": "https://rutracker.net/forum/tracker.php?f=266",
    "Seeds": "29",
    "Peers": "8",
    "Date": "25.05.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie / Сезон: 6 / Серии: 1-10 из 10 (Билл Роу, Майкл Гои) [2024, США, боевик, драма, криминал, WEB-DLRip] MVO (LostFilm) + Original",
    "Id": "6489937",
    "Url": "https://rutracker.net/forum/viewtopic.php?t=6489937",
    "Torrent": "https://rutracker.net/forum/dl.php?t=6489937",
    "Size": "5.95 GB",
    "Download_Count": "3669",
    "Checked": "True",
    "Type": "Сериалы США и Канады",
    "Type_Link": "https://rutracker.net/forum/tracker.php?f=235",
    "Seeds": "90",
    "Peers": "31",
    "Date": "24.05.2024"
  },
  {
    "Name": "(Soundtrack, Rock) Новичок / Новобранец / The Rookie (Daddy Cop (From The TV Show \"The Rookie\")) (by Zander Hawley) - 2024 (2018), MP3 (tracks), 320 kbps",
    "Id": "6499482",
    "Url": "https://rutracker.net/forum/viewtopic.php?t=6499482",
    "Torrent": "https://rutracker.net/forum/dl.php?t=6499482",
    "Size": "5.3 MB",
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

#### Kinozal

🔹 `curl -s http://localhost:8443/api/search/title/kinozal?query=The+Rookie&page=0&year=2024`

```json
[
  {
    "Name": "Новичок (Новобранец) (6 сезон: 1-10 серии из 10)",
    "Id": "2023066",
    "Original_Name": "The Rookie",
    "Year": "2024",
    "Language": "3 x ПМ, СТ",
    "Format": "WEB-DL (1080p)",
    "Url": "https://kinozal.tv/details.php?id=2023066",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2023066",
    "Size": "32.79 ГБ",
    "Comments": "34",
    "Seeds": "9",
    "Peers": "2",
    "Date": "26.06.2024 01:17"
  },
  {
    "Name": "Новичок (Новобранец) (1-6 сезоны: 1-108 серии из 108)",
    "Id": "2042752",
    "Original_Name": "The Rookie",
    "Year": "2018-2024",
    "Language": "ПМ (LostFilm)",
    "Format": "WEB-DLRip (720p)",
    "Url": "https://kinozal.tv/details.php?id=2042752",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2042752",
    "Size": "153.07 ГБ",
    "Comments": "1",
    "Seeds": "3",
    "Peers": "4",
    "Date": "25.06.2024 09:30"
  },
  {
    "Name": "Новичок (Новобранец) (6 сезон: 1-10 серии из 10)",
    "Id": "2026484",
    "Original_Name": "The Rookie",
    "Year": "2024",
    "Language": "3 x ПМ, СТ",
    "Format": "WEB-DL (720p)",
    "Url": "https://kinozal.tv/details.php?id=2026484",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2026484",
    "Size": "18.33 ГБ",
    "Comments": "4",
    "Seeds": "9",
    "Peers": "4",
    "Date": "25.05.2024 11:02"
  },
  {
    "Name": "Новичок (Новобранец) (6 сезон: 1-10 серии из 10)",
    "Id": "2022944",
    "Original_Name": "The Rookie",
    "Year": "2024",
    "Language": "ПМ (LostFilm)",
    "Format": "WEB-DLRip",
    "Url": "https://kinozal.tv/details.php?id=2022944",
    "Torrent": "https://dl.kinozal.tv/download.php?id=2022944",
    "Size": "5.95 ГБ",
    "Comments": "22",
    "Seeds": "43",
    "Peers": "13",
    "Date": "24.05.2024 14:31"
  },
  {
    "Name": "Новичок (Новобранец) (1-6 сезоны: 1-108 серии из 108)",
    "Id": "1656552",
    "Original_Name": "The Rookie",
    "Year": "2018-2024",
    "Language": "ПМ (LostFilm)",
    "Format": "WEB-DLRip (1080p)",
    "Url": "https://kinozal.tv/details.php?id=1656552",
    "Torrent": "https://dl.kinozal.tv/download.php?id=1656552",
    "Size": "249.58 ГБ",
    "Comments": "148",
    "Seeds": "7",
    "Peers": "11",
    "Date": "24.05.2024 10:58"
  }
]
```

#### RuTor

🔹 `curl -s http://localhost:8443/api/search/title/rutor?query=The+Rookie+2024&page=0&year=0`

```json
[
  {
    "Name": "Новичок / Новобранец / The Rookie [S06] (2024) WEB-DL 720p | LostFilm, TVShows, HDrezka Studio",
    "Id": "986185",
    "Url": "https://rutor.info/torrent/986185/novichok_novobranec_the-rookie-s06-2024-web-dl-720p-lostfilm-tvshows-hdrezka-studio",
    "Torrent": "https://d.rutor.info/download/986185",
    "Hash": "6c3fa72ddc8f39afc7743f147e8ca3ee66ee99df",
    "Size": "18.33 GB",
    "Comments": "0",
    "Seeds": "5",
    "Peers": "2",
    "Date": "25.05.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie [S06] (2024) WEB-DLRip | LostFilm",
    "Id": "986139",
    "Url": "https://rutor.info/torrent/986139/novichok_novobranec_the-rookie-s06-2024-web-dlrip-lostfilm",
    "Torrent": "https://d.rutor.info/download/986139",
    "Hash": "3348d0a58dd8f5b251c7a361c9d235549260ba60",
    "Size": "5.95 GB",
    "Comments": "0",
    "Seeds": "36",
    "Peers": "19",
    "Date": "25.05.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie [S06] (2024) WEB-DL 1080p | LostFilm, TVShows, HDrezka Studio",
    "Id": "986138",
    "Url": "https://rutor.info/torrent/986138/novichok_novobranec_the-rookie-s06-2024-web-dl-1080p-lostfilm-tvshows-hdrezka-studio",
    "Torrent": "https://d.rutor.info/download/986138",
    "Hash": "2fdb28133eee0e3842ed855a08c07f35e482eedc",
    "Size": "32.79 GB",
    "Comments": "0",
    "Seeds": "16",
    "Peers": "8",
    "Date": "25.05.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie [S06] (2024) WEBRip от Kerob | L2",
    "Id": "970650",
    "Url": "https://rutor.info/torrent/970650/novichok_novobranec_the-rookie-s06-2024-webrip-ot-kerob-l2",
    "Torrent": "https://d.rutor.info/download/970650",
    "Hash": "b7a46e99dd9164787baf77d4f98d84ceb5301ac0",
    "Size": "5.92 GB",
    "Comments": "7",
    "Seeds": "6",
    "Peers": "2",
    "Date": "22.05.2024"
  },
  {
    "Name": "Новичок / Новобранец / The Rookie [S06] (2024) WEBRip 720p от Kerob | L2",
    "Id": "970647",
    "Url": "https://rutor.info/torrent/970647/novichok_novobranec_the-rookie-s06-2024-webrip-720p-ot-kerob-l2",
    "Torrent": "https://d.rutor.info/download/970647",
    "Hash": "99bb9749164676d36d17b2b72497d6f02bf88c50",
    "Size": "12.18 GB",
    "Comments": "0",
    "Seeds": "1",
    "Peers": "3",
    "Date": "22.05.2024"
  }
]
```

#### NoNameClub

🔹 `curl -s http://localhost:8443/api/search/title/nonameclub?query=The+Rookie+2018&page=0&year=0`

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
    "Date": "22.04.2019 09:09"
  },
  {
    "Name": "Новичок / The Rookie (2018) WEB-DL [H.264/1080p-LQ] (сезон 1, серии 1-20 из 20) LostFilm",
    "Id": "1278446",
    "Url": "https://nnmclub.to/forum/viewtopic.php?t=1278446",
    "Torrent": "https://nnmclub.to/forum/download.php?id=1030902",
    "Size": "52.7 GB",
    "Comments": "6",
    "Type": "Зарубежные сериалы",
    "Seeds": "6",
    "Peers": "1",
    "Date": "20.04.2019 00:30"
  },
  {
    "Name": "Новичок / The Rookie (2018) WEB-DLRip (сезон 1, серии 1-20 из 20) LostFilm",
    "Id": "1256703",
    "Url": "https://nnmclub.to/forum/viewtopic.php?t=1256703",
    "Torrent": "https://nnmclub.to/forum/download.php?id=1016767",
    "Size": "10.5 GB",
    "Comments": "31",
    "Type": "Зарубежные сериалы",
    "Seeds": "10",
    "Peers": "0",
    "Date": "18.04.2019 22:55"
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
    "Peers": "0",
    "Date": "22.12.2018 04:00"
  }
]
```

### Search by ID

#### RuTracker

🔹 `curl -s http://localhost:8443/api/search/id/rutracker?query=6489937`

```json
[
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
    "Quality": "WEB-DLRip",
    "Video": "XviD, 720x400 (16:9), 23.976 fps, 1600 Kbps",
    "Files": [
      {
        "Name": "The.Rookie.S06E01.WEB-DLRip.RGzsRutracker.avi",
        "Size": "614.25 MB"
      },
      {
        "Name": "The.Rookie.S06E02.WEB-DLRip.RGzsRutracker.avi",
        "Size": "615.56 MB"
      },
      {
        "Name": "The.Rookie.S06E03.WEB-DLRip.RGzsRutracker.avi",
        "Size": "596.67 MB"
      },
      {
        "Name": "The.Rookie.S06E04.WEB-DLRip.RGzsRutracker.avi",
        "Size": "614.88 MB"
      },
      {
        "Name": "The.Rookie.S06E05.WEB-DLRip.RGzsRutracker.avi",
        "Size": "596.57 MB"
      },
      {
        "Name": "The.Rookie.S06E06.WEB-DLRip.RGzsRutracker.avi",
        "Size": "614.89 MB"
      },
      {
        "Name": "The.Rookie.S06E07.WEB-DLRip.RGzsRutracker.avi",
        "Size": "607.10 MB"
      },
      {
        "Name": "The.Rookie.S06E08.WEB-DLRip.RGzsRutracker.avi",
        "Size": "610.67 MB"
      },
      {
        "Name": "The.Rookie.S06E09.WEB-DLRip.RGzsRutracker.avi",
        "Size": "614.24 MB"
      },
      {
        "Name": "The.Rookie.S06E10.WEB-DLRip.RGzsRutracker.avi",
        "Size": "611.32 MB"
      }
    ]
  }
]
```

#### Kinozal

🔹 `curl -s http://localhost:8443/api/search/id/kinozal?query=2022944`

```json
[
  {
    "Name": "Новичок (Новобранец)",
    "Original_Name": "The Rookie",
    "Url": "https://kinozal.tv/details.php?id=2022944",
    "Hash": "3348D0A58DD8F5B251C7A361C9D235549260BA60",
    "Magnet": "magnet:?xt=urn:btih:3348D0A58DD8F5B251C7A361C9D235549260BA60&tr=http%3A%2F%2Fretracker.local%2Fannounce&tr=http%3A%2F%2Ftr0.torrent4me.com%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr1.torrent4me.com%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr2.torrent4me.com%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr3.torrent4me.com%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr4.torrent4me.com%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr5.torrent4me.com%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr0.tor4me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr1.tor4me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr2.tor4me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr3.tor4me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr4.tor4me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr5.tor4me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr0.tor2me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr1.tor2me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr2.tor2me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr3.tor2me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr4.tor2me.info%2Fann%3Fuk%3DkCm7WcIM00&tr=http%3A%2F%2Ftr5.tor2me.info%2Fann%3Fuk%3DkCm7WcIM00",
    "IMDb_link": "https://www.imdb.com/title/tt7587890/",
    "Kinopoisk_link": "https://www.kinopoisk.ru/film/1142153",
    "IMDB_id": "7587890",
    "Kinopoisk_id": "1142153",
    "Year": "2024",
    "Type": "Боевик, детектив, драма, криминал, полицейский, процедурал",
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
    "Seeds": "43",
    "Peers": "12",
    "Download_Count": "2058",
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
        "Name": "The.Rookie.S06E01.WEB-DLRip.RGzsRutracker.avi",
        "Size": "614 МБ"
      },
      {
        "Name": "The.Rookie.S06E02.WEB-DLRip.RGzsRutracker.avi",
        "Size": "616 МБ"
      },
      {
        "Name": "The.Rookie.S06E03.WEB-DLRip.RGzsRutracker.avi",
        "Size": "597 МБ"
      },
      {
        "Name": "The.Rookie.S06E04.WEB-DLRip.RGzsRutracker.avi",
        "Size": "615 МБ"
      },
      {
        "Name": "The.Rookie.S06E05.WEB-DLRip.RGzsRutracker.avi",
        "Size": "597 МБ"
      },
      {
        "Name": "The.Rookie.S06E06.WEB-DLRip.RGzsRutracker.avi",
        "Size": "615 МБ"
      },
      {
        "Name": "The.Rookie.S06E07.WEB-DLRip.RGzsRutracker.avi",
        "Size": "607 МБ"
      },
      {
        "Name": "The.Rookie.S06E08.WEB-DLRip.RGzsRutracker.avi",
        "Size": "611 МБ"
      },
      {
        "Name": "The.Rookie.S06E09.WEB-DLRip.RGzsRutracker.avi",
        "Size": "614 МБ"
      },
      {
        "Name": "The.Rookie.S06E10.WEB-DLRip.RGzsRutracker.avi",
        "Size": "611 МБ"
      }
    ]
  }
]
```

#### RuTor

🔹 `curl -s http://localhost:8443/api/search/id/rutor?query=970650`

```json
[
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
    "Seeds": "6",
    "Peers": "2",
    "Seed_Date": "30-07-2024 7:19:07 (54 минуты назад)",
    "Add_Date": "22-05-2024 17:51:28  (2 месяца назад)",
    "Size": "5.92 GB (6360685830 Bytes)",
    "Files": [
      {
        "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E01.400p.Kerob.avi",
        "Size": "602.01 MB"
      },
      {
        "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E02.400p.Kerob.avi",
        "Size": "562.48 MB"
      },
      {
        "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E03.400p.Kerob.avi",
        "Size": "621.50 MB"
      },
      {
        "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E04.400p.Kerob.avi",
        "Size": "690.81 MB"
      },
      {
        "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E05.400p.Kerob.avi",
        "Size": "460.92 MB"
      },
      {
        "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E06.400p.Kerob.avi",
        "Size": "531.88 MB"
      },
      {
        "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E07.400p.Kerob.avi",
        "Size": "931.94 MB"
      },
      {
        "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E08.400p.Kerob.avi",
        "Size": "506.55 MB"
      },
      {
        "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E09.400p.Kerob.avi",
        "Size": "523.90 MB"
      },
      {
        "Name": "The.Rookie.S06.400p.Kerob/The.Rookie.S06E10.400p.Kerob.avi",
        "Size": "634.04 MB"
      }
    ]
  }
]
```

#### NoNameClub

🔹 `curl -s http://localhost:8443/api/search/id/nonameclub?query=1259608`

```json
[
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
    "Quality": "WEB-DL",
    "Video": "AVC/H.264, 1920x1080 (16:9), ~7024 kbps",
    "Audio": "Многоголосый закадровый, любительский (TVShows)",
    "Registration": "22 Апр 2019 12:09:12",
    "Rating": "4.6",
    "Votes": "59",
    "Size": "51.2 GB",
    "Files": [
      {
        "Name": "The.Rookie.S01.1080p.TVShows",
        "Size": "Directory"
      },
      {
        "Name": "The.Rookie.S01E01.1080p.TVShows.mkv",
        "Size": "2.42 GB"
      },
      {
        "Name": "The.Rookie.S01E02.1080p.TVShows.mkv",
        "Size": "2.68 GB"
      },
      {
        "Name": "The.Rookie.S01E03.1080p.TVShows.mkv",
        "Size": "2.61 GB"
      },
      {
        "Name": "The.Rookie.S01E04.1080p.TVShows.mkv",
        "Size": "2.11 GB"
      },
      {
        "Name": "The.Rookie.S01E05.1080p.TVShows.mkv",
        "Size": "2.16 GB"
      },
      {
        "Name": "The.Rookie.S01E06.1080p.TVShows.mkv",
        "Size": "2.43 GB"
      },
      {
        "Name": "The.Rookie.S01E07.1080p.TVShows.mkv",
        "Size": "2.23 GB"
      },
      {
        "Name": "The.Rookie.S01E08.1080p.TVShows.mkv",
        "Size": "1.85 GB"
      },
      {
        "Name": "The.Rookie.S01E09.1080p.TVShows.mkv",
        "Size": "2.03 GB"
      },
      {
        "Name": "The.Rookie.S01E10.1080p.TVShows.mkv",
        "Size": "2.81 GB"
      },
      {
        "Name": "The.Rookie.S01E11.1080p.TVShows.mkv",
        "Size": "3 GB"
      },
      {
        "Name": "The.Rookie.S01E12.1080p.TVShows.mkv",
        "Size": "2.74 GB"
      },
      {
        "Name": "The.Rookie.S01E13.1080p.TVShows.mkv",
        "Size": "2.88 GB"
      },
      {
        "Name": "The.Rookie.S01E14.1080p.TVShows.mkv",
        "Size": "2.88 GB"
      },
      {
        "Name": "The.Rookie.S01E15.1080p.TVShows.mkv",
        "Size": "2.68 GB"
      },
      {
        "Name": "The.Rookie.S01E16.1080p.TVShows.mkv",
        "Size": "2.85 GB"
      },
      {
        "Name": "The.Rookie.S01E17.1080p.TVShows.mkv",
        "Size": "2.68 GB"
      },
      {
        "Name": "The.Rookie.S01E18.1080p.TVShows.mkv",
        "Size": "2.67 GB"
      },
      {
        "Name": "The.Rookie.S01E19.1080p.TVShows.mkv",
        "Size": "2.76 GB"
      },
      {
        "Name": "The.Rookie.S01E20.1080p.TVShows.mkv",
        "Size": "2.7 GB"
      }
    ]
  }
]
```

### Tests endpoints

Example of building a Docker container via GitHub Actions:

```shell
- Checking the availability of data on the server:

RuTracker data avaliable: false
Kinozal data avaliable: true
RuTor data avaliable: true
NoNameClub data avaliable: true

- Search by Title:

--- RuTracker:
Response time (ms): 799
Status code: 200
Check data: true
Data: Новичок / Новобранец / The Rookie / Сезон: 6 / Серии: 1-10 из 10 (Билл Роу, Майкл Гои) [2024, США, драма, комедия, криминал, WEB-DL 1080p] 3 x MVO (LostFilm, TVShows, HDrezka) + Original + Sub (Rus, Eng)

--- Kinozal:
Response time (ms): 411
Status code: 200
Check data: true
Data: Новичок (Новобранец) (6 сезон: 1-10 серии из 10)

--- RuTor:
Response time (ms): 706
Status code: 200
Check data: true
Data: Новичок / Новобранец / The Rookie [S06] (2024) WEB-DL 720p | LostFilm, TVShows, HDrezka Studio

--- NoNameClub:
Response time (ms): 105
Status code: 200
Check data: true
Data: Агент Три нуля / Новички / Su ren te gong / The Rookies (2019) WEBRip [H.264/1080p]

- Search by ID:

--- RuTracker:
Response time (ms): 31022
Status code: 400
! Skip counter, data is not available on the server
Check data: false
! Skip counter, data is not available on the server
Data: 

--- Kinozal:
Response time (ms): 630
Status code: 200
Check data: true
Data: Новичок (Новобранец)

--- RuTor:
Response time (ms): 757
Status code: 200
Check data: true
Data: Новичок / Новобранец / The Rookie [S06] (2024) WEBRip от Kerob | L2

--- NoNameClub:
Response time (ms): 1354
Status code: 200
Check data: true
Data: Новичок / The Rookie (2018) WEB-DL [H.264/1080p-LQ] (сезон 1, серии 1-20 из 20) TVShows

Number all tests: 16
Number successful tests: 14
Number failed tests: 0
```

### Save torrent file

To save the torrent file on your computer, you can use one of the following constructs:

- **Linux** via `Bash`:

```bash
id=970650
url=$(curl -s "http://127.0.0.1:8443/api/search/id/rutor?query=$id" | jq -r .[].Torrent)
curl -s $url --output ~/downloads/$id.torrent
```

- **Windows** via `PowerShell`:

```PowerShell
$id = 970650
$url = $(Invoke-RestMethod "http://127.0.0.1:8443/api/search/id/rutor?query=$id").Torrent
Invoke-RestMethod $url -OutFile "$home\Downloads\$id.torrent"
```

- **Node.js** via `Axios`:

```js
const axios = require('axios')
const os = require('os')
const fs = require('fs')
const path = require('path')

const id = 970650
const url = `http://localhost:8443/api/search/id/rutor?query=${id}`
const homeDir = os.homedir()

axios.get(url).then(response => {
    const torrentUrl = response.data[0].Torrent
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