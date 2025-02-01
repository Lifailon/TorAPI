<p align="center">
    <img src="image/logo-02.png" alt="Image alt">
</p>

---

<p align="center">
        <a href="https://www.npmjs.com/package/torapi"><img title="NPM" src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white"></a>
        <a href="https://vercel.com/torapi/torapi"><img title="Vercel" src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"></a>
        <a href="https://hub.docker.com/r/lifailon/torapi"><img title="Docker" src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"></a>
        <a href="https://app.swaggerhub.com/apis-docs/Lifailon/TorAPI"><img title="Swagger" src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white"></a>
        <a href="https://documenter.getpostman.com/view/37302476/2sAXqzYeRj"><img title="Postman" src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"></a>
        <a href="https://github.com/Lifailon/TorAPI/actions"><img title="Actions" src="https://img.shields.io/badge/Actions-%230075A8.svg?style=for-the-badge&logo=githubactions&logoColor=white"></a>
        <a href="https://github.com/Lifailon/TorAPI/blob/main/jenkins/jenkinsfile"><img title="Actions" src="https://img.shields.io/badge/jenkins-%232C5263?style=for-the-badge&logo=jenkins&logoColor=white"></a>
    <br>
    <br>
        <a href="https://github.com/Lifailon/TorAPI/actions"><img title="Actions"src="https://img.shields.io/github/actions/workflow/status/Lifailon/TorAPI/ci-postman-tests.yml?logo=Postman&label=CI+Postman"></a>
        <a href="https://github.com/Lifailon/TorAPI/actions"><img title="Actions"src="https://img.shields.io/github/actions/workflow/status/Lifailon/TorAPI/cd-vercel.yml?logo=Vercel&label=CD+Vercel"></a>
        <a href="https://github.com/Lifailon/TorAPI/actions"><img title="Actions"src="https://img.shields.io/github/actions/workflow/status/Lifailon/TorAPI/cd-docker-hub.yml?logo=GitHub-Actions&label=CD+Docker+Hub"></a>
        <a href="https://hub.docker.com/r/lifailon/torapi"><img title="Docker"src="https://img.shields.io/docker/image-size/lifailon/torapi?&color=blue&logo=Docker&label=Docker+Image"></a>
    <br>
        <a href="https://www.npmjs.com/package/torapi"><img title="GitHub License"src="https://img.shields.io/npm/v/torapi?logo=npm&logoColor=red"></a>
        <a href="https://app.swaggerhub.com/apis-docs/Lifailon/TorAPI"><img title="Swagger"src="https://img.shields.io/swagger/valid/3.0?specUrl=https%3A%2F%2Fraw.githubusercontent.com%2FLifailon%2FTorAPI%2Fmain%2Fswagger%2Fswagger.yaml&logo=Swagger&label=Swagger"></a>
</p>

<h4 align="center">
    <a href="README.md">English</a> | <strong>Русский</strong>
</h4>

Неофициальный `API` (**backend**) для торрент трекеров RuTracker, Kinozal, RuTor и NoNameClub. Используется для быстрого и централизованного поиска раздач, получения торрент файлов, магнитных ссылок и подробной информации о раздаче по названию фильма, сериала или идентификатору раздачи.

Вы можете воспользоваться публичной и бесплатной версией опубликованной на платформе [Vercel](https://torapi.vercel.app/api/provider/list), или развернуть его самостоятельно на любом облачной платформе используя **serverless**, а также локально с помощью [Docker](https://hub.docker.com/r/lifailon/torapi) или менеджера пакетов [NPM](https://www.npmjs.com/package/torapi).

Спецификация **OpenAPI** доступна на официальном сайте [Swagger Hub](https://app.swaggerhub.com/apis-docs/Lifailon/TorAPI).

Выпущено под лицензией [MIT](https://github.com/Lifailon/TorAPI/blob/rsa/LICENSE).

- [💁 Для чего](#-для-чего)
- [🎉 Реализовано](#-реализовано)
- [📰 Список доступных провайдеров](#-список-доступных-провайдеров)
- [⚡ Frontend](#-frontend)
  - [Google Chrome Extension](#google-chrome-extension)
  - [Wox Plugin](#wox-plugin)
- [🚀 Deploy](#-deploy)
- [🐳 Docker](#-docker)
  - [Docker Hub](#docker-hub)
    - [Run](#run)
    - [Compose](#compose)
  - [Local image](#local-image)
  - [Dockerfile](#dockerfile)
- [📦 NPM](#-npm)
- [🔨 Build](#-build)
- [📚 Swagger](#-swagger)
- [🧪 Postman](#-postman)
- [👨‍🔬 Jenkins](#-jenkins)
- [🎊 Другие проекты](#-другие-проекты)

## 💁 Для чего

При использовании публичной версии не нужно использовать `VPN` сервисы, так как данный сервер выступает в роле шлюза, что позволяет интегрировать `API` в любой проект без сетевых ограничений, а также использовать новостную `RSS` ленту на мобильных устройствах, например, через [ReadYou](https://github.com/Ashinch/ReadYou) или [Feeder](https://github.com/spacecowboy/Feeder). Для работы API не требуется токен доступа и авторизация в трекерах.

Проект вдохновлен ✨ [Torrent-Api-py](https://github.com/Ryuk-me/Torrent-Api-py) (ранее [Torrents-Api](https://github.com/Ryuk-me/Torrents-Api)) для русскоязычных торрент провайдеров.

## 🎉 Реализовано

- [X] Поиск по названию для получения актуальных или всех доступных раздач (со всех доступных страниц) из указанного провайдера (торрент-трекера) или со всех трекеров одновнеременно. Каждая раздача содержит уникальный идентификатор (используется для поиска по `id`), категорию (используется для фильтрации по категории), краткая информация и ссылка на скачивание торрент-файла.
- [X] Получение списка категорий для всех провайдеров и фильтрация поиска по категории.
- [X] Поиск по уникальному идентификатору раздачи указанного провайдера для получения дополнительной информации: магнитная ссылка и хэш сумма для прямой загрузки через любой торрент клиент, ссылки на базы даных о кинематографе (Кинопоиск и IMDb), ссылки на постеры, подробное описание и содержимое раздачи (список файлов и их размер).
- [X] Получение новостных `RSS` лент для всех используемых провайдеров с поддержкой фильтрации в форматах `XML`, а также `JSON`.

## 📰 Список доступных провайдеров

| Имя провайдера                      | Зеркала | Регистрация  |  Фильтрация для поиска и RSS   | Поиск по ID  | RSS      |
| -                                   | -       | -            |  -                             | -            | -        |
| [RuTracker](https://rutracker.org)  | 3       | Yes*         |  Категория                     | Yes          | Native   |
| [Kinozal](https://kinozal.tv)       | 3       | Yes*         |  Категория, год выхода, формат | Yes          | *Custom* |
| [RuTor](https://rutor.info)         | 2       | No           |  Категория                     | Yes          | *Custom* |
| [NoNameClub](https://nnmclub.to)    | 1       | No           |  Категория                     | Yes          | Native   |

**\*** Регистрация требуется только при скачивании торрент-файла по прямой ссылке. Все раздачи при поиске по **id** (идентификатору) содержат **хэш сумму** и **магнитные ссылки** (уже включают в себя актуальный список серверов торрент-трекеров), которые позволяют сразу начать загрузку содержимого раздачи или сгенерировать торрент-файл после загрузки метаданных с помощью любого торрент-клиента, например, [qBittorrent](https://github.com/qbittorrent/qBittorrent) (поддерживает RSS и поисковые плагины), [Transmission](https://github.com/transmission/transmission) или [Webtorrent Desktop](https://github.com/webtorrent/webtorrent-desktop).

Доступ к новостным **RSS** лентам для *RuTracker* и *NoNameClub* осуществляется путем перенаправления оригинального канала. Для провайдеров *Kinozal* и *RuTor* реализована кастомная лента новостей с главной страницы, которые поддерживают фильтрацию по категориям.

## ⚡ Frontend

### Google Chrome Extension

Пользовательский интерфейс для браузера и мобильных устройств в стиле [Jackett](https://github.com/Jackett/Jackett) через расширение 🍿 [Libre Kinopoisk](https://github.com/Lifailon/LibreKinopoisk) для одновременного поиска раздач во всех доступных торрент-трекерах и загрузки контента.

### Wox Plugin

Плагин [Torrent Search](https://github.com/Lifailon/Wox.Plugins) для быстрого поиска раздач во всех доступных торрент-трекерах через интерфейс [Wox](https://github.com/Wox-launcher/Wox), которое доступно для установки из [репозитория плагинов](http://www.wox.one/plugin/431).

## 🚀 Deploy

Вы можете развернуть свой публичный сервер на платформе Vercel из исходного кода репозитория. Для этого нажмите кнопку ниже и следуйте инструкциям:

[![Vercel](https://img.shields.io/badge/Deploy-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/new/torapi/clone?repository-url=https://github.com/lifailon/TorAPI)

## 🐳 Docker

### Docker Hub

Проект использует [GitHub Actions](https://github.com/Lifailon/TorAPI/actions) для сборки контейнера Docker и автоматического тестирования функциональности всех конечных точек.

#### Run

Загрузите образ и запустите контейнер из [Docker Hub](https://hub.docker.com/repository/docker/lifailon/torapi/general):

```shell
docker run -d --name TorAPI -p 8443:8443 --restart=unless-stopped lifailon/torapi:latest
```

Что бы использовать Proxy сервер, воспользуйтесь следующими параметрами при запуске контейнера:

```shell
docker run -d --name TorAPI -p 8443:8443 --restart=unless-stopped \
  -e PROXY_ADDRESS="192.168.3.100" \
  -e PROXY_PORT="9090" \
  -e USERNAME="TorAPI" \
  -e PASSWORD="TorAPI" \
  lifailon/torapi:latest
```

Замените содержимое переменных для подключения к Proxy серверу на свои. Если вы не используете авторизацию на прокси сервере, просто не указывайте эти параметры при запуске контейнера.

#### Compose

Вы можете загрузить и использовать файл `docker-compose.yml` для сборки контейнера из **Docker Hub**:

```shell
curl -sO https://raw.githubusercontent.com/Lifailon/TorAPI/main/docker-compose.yml
curl -sO https://raw.githubusercontent.com/Lifailon/TorAPI/main/.env.yml
```

Отредактируйте переменные окружения в файле [env](.env) (необходимо для использования прокси сервера), и запустите контейнер:

```shell
docker-compose up -d
```

### Local image

Вы можете сохранить образ, загруженный из Docker Hub, что бы передать ее на машину, у которой нет доступа к Docker Hub:

```shell
docker save -o TorAPI-Docker-Image.tar lifailon/torapi
```

В [файлах к релизу](https://github.com/Lifailon/TorAPI/releases) вы можете скачать подготовленный образ и загрузить его на своей машине:

```shell
docker load -i TorAPI-Docker-Image.tar
```

Запустите контейнер из загруженного локального образа:

```shell
docker run -d --name TorAPI -p 8443:8443 --restart=unless-stopped lifailon/torapi:latest
```

### Dockerfile

Вы можете создать образ самостоятельно из исходных файлов проекта, используя [dockerfile](dockerfile).

Клонируйте репозиторий:

```shell
git clone https://github.com/Lifailon/TorAPI
cd TorAPI
```

При необходимости, отредактируйте переменные или другие параметры в `dockerfile`:

```shell
ENV PROXY_ADDRESS="192.168.3.100"
ENV PROXY_PORT="9090"
ENV USERNAME="TorAPI"
ENV PASSWORD="TorAPI"
```

Соберите образ и запустите контейнер:

```shell
docker build -t torapi .
docker run -d --name TorAPI -p 8443:8443 --restart=unless-stopped torapi
```

## 📦 NPM

Для установки проекта и всех зависимостей, вы можете использовать менеджер пакетов [npm](https://www.npmjs.com/package/torapi):

```shell
npm install -g torapi
```

## 🔨 Build

Для сборки проекта из исходного кода, клонируйте репозиторий, установите зависимости и запустите сервер:

```shell
git clone https://github.com/Lifailon/TorAPI
cd TorAPI
npm install
npm start
```

По умолчанию сервер будет запущен на порту `8443`.

Вы можете указать другой порт:

```js
npm start -- --port 2024
```

Для разработки используется запуск в режиме [nodemon](https://github.com/remy/nodemon) (перезапускает сервер при изменение содержимого файлов):

```
npm run dev
```

Использование прокси сервера для всех запросов:

```js
npm start -- --port 2024 --proxyAddress 192.168.3.100 --proxyPort 9090
```

Авторизация на прокси сервере:

```js
npm start -- --port 2024 --proxyAddress 192.168.3.100 --proxyPort 9090 --username TorAPI --password TorAPI
```

## 📚 Swagger

Документация доступна через **Swagger UI** по адресу `http://localhost:8443/docs` с использованием модуля [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express). Описание документации производится через библиотеку [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc).

Чтобы создать или обновить файлы документации Swagger в формате `JSON` и `YAML`, используйте команду:

```shell
npm run docs
```

## 🧪 Postman

Вы можете запустить тестирование, чтобы быстро проверить работоспособность всех конечных точек в консоли:

```shell
npm start -- --test
```

Во время тестирования запускается локальный сервер, делается запрос к конечной точке `/api/provider/test`, логирует вывод в формате JSON и завершает свою работу.

Изменение параметра заголовка в запросе:

```shell
npm start -- --test --q "The Rookie"
```

Также доступны параметризированные тесты через [GitHub Actions](/.github/workflows/ci-postman-tests.yml) с использованием [Postman](/postman-tests.json) и [Newman](https://github.com/postmanlabs/newman) для формирования отчетов в формате `JUnit`.

Локальный запуск тестов:

```shell
npm install -g newman

newman run postman-tests.json \
    --iteration-count 1 \
    --env-var "baseUrl=http://localhost:8443" \
    --env-var "query=The Rookie" \
    --env-var "queryAllPage=test" \
    --env-var "categoryRuTracker=1605" \
    --env-var "categoryKinozal=20" \
    --env-var "categoryRuTor=10" \
    --env-var "categoryNoNameClub=1318"
...
┌─────────────────────────┬────────────────────┬───────────────────┐
│                         │           executed │            failed │
├─────────────────────────┼────────────────────┼───────────────────┤
│              iterations │                  1 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│                requests │                 45 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│            test-scripts │                167 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│      prerequest-scripts │                154 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│              assertions │                169 │                 0 │
├─────────────────────────┴────────────────────┴───────────────────┤
│ total run duration: 32s                                          │
├──────────────────────────────────────────────────────────────────┤
│ total data received: 1.95MB (approx)                             │
├──────────────────────────────────────────────────────────────────┤
│ average response time: 663ms [min: 2ms, max: 6.1s, s.d.: 1216ms] │
└──────────────────────────────────────────────────────────────────┘
```

## 👨‍🔬 Jenkins

Для автоматизации процесса развертвывания и управления (запуск, остановка и выгрузка логов) на удаленной машине в локальной среде используется [Jenkins Pipeline](jenkinsfile).

---

## 🎊 Другие проекты

- 🔎 [LibreKinopoisk](https://github.com/Lifailon/LibreKinopoisk) - расширение Google Chrome, которое добавляет кнопки на сайт Кинопоиск и предоставляет интерфейс **TorAPI** в стиле [Jackett](https://github.com/Jackett/Jackett) (без необходимости устанавливать серверную часть и использовать VPN) для быстрого поиска фильмов и сериалов в открытых источниках.

- 🧲 [Kinozal Bot](https://github.com/Lifailon/Kinozal-Bot) - Telegram бот, который позволяет автоматизировать процесс доставки контента до вашего телевизора, используя только телефон. Предоставляет удобный интерфейс для взаимодействия с торрент трекером [Кинозал](https://kinozal.tv) и базой данных [TMDB](https://www.themoviedb.org) для отслеживания даты выхода серий, сезонов и поиска актеров для каждой серии, а также возможность управлять торрент клиентом [qBittorrent](https://github.com/qbittorrent/qBittorrent) или [Transmission](https://github.com/transmission/transmission) на вашем компьютере, находясь удаленно от дома и из единого интерфейса.

- 📡 [Froxy](https://github.com/Lifailon/froxy/blob/main/README_RU.md) - классический и обратный прокси сервер на базе `.NET` для запуска в режиме командной строки и контейнера [Docker](https://hub.docker.com/r/lifailon/froxy). Поддерживает проксирование `HTTPS` трафика (`CONNECT` запросы) и протокол `SOCKS5` для туннелирования `TCP` трафика, а также `TCP`, `UDP` и `HTTP/HTTPS` протоколы для обратоного проксирования (поддерживается обработка `GET` и `POST` запросов с передачей заголовков и тела запроса для работы с `API` и передачи `cookie`).

- ❤️ [WebTorrent Desktop api](https://github.com/Lifailon/webtorrent-desktop-api) - форк клиента [WebTorrent Desktop](https://github.com/webtorrent/webtorrent-desktop), в котором добавлен механизм удаленного управления через `REST API` на базе [Express Framework](https://github.com/expressjs/express).