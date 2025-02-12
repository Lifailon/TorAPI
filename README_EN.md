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
    <strong>English</strong> | <a href="README.md">Русский</a>
</h4>

Unofficial API (**backend**) for torrent trackers RuTracker, Kinozal, RuTor and NoNameClub. Used for fast and centralized search of distribution, receiving torrent files, magnetic links and detailed information about distribution by movie title, series or distribution identifier, and also provides news RSS feed to all providers with filtering by categories.

You can use the public and free version published on [Vercel](https://torapi.vercel.app/api/provider/list) as well as deploy it yourself on any cloud platform using **serverless** or local with [Docker](https://hub.docker.com/r/lifailon/torapi).

The **OpenAPI** specification is available on the official [Swagger Hub](https://app.swaggerhub.com/apis-docs/Lifailon/TorAPI) website.

Released under [MIT license](https://github.com/Lifailon/TorAPI/blob/rsa/LICENSE).

### For what

You do not need to use a VPN when using the public version, as this service is in the gateway role, which allows you to integrate the `API` into any project without network restrictions and also use the news feed on mobile devices, for example through [ReadYou](https://github.com/Ashinch/ReadYou) or [Feeder](https://github.com/spacecowboy/Feeder). No access token and authorization in the trackers are required for the API to work.

Project is inspired by ✨ [Torrent-Api-py](https://github.com/Ryuk-me/Torrent-Api-py) (previously [Torrents-Api](https://github.com/Ryuk-me/Torrents-Api)) for Russian-speaking torrent providers.

### Implemented

- Search by title to get current or all available distributions (from all available pages) from a specified provider (torrent tracker) or from all trackers simultaneously. Each distribution contains a unique identifier (used for **search by id**), category (used for **filtering by category**), brief information and a link to download the torrent file.
- Get a list of categories for all providers and filter search by category.
- Search by unique distribution identifier of the specified provider for additional information: magnetic link and hash sum for direct download through any torrent client, links to databases about cinema (Kinopoisk and IMDb) and posters, detailed description and content of the giveaways (list of files and their size).
- Get RSS new feeds for all used providers in formats `XML`, as well as `JSON`.

### Frontend

#### Google Chrome Extension

The implementation of a simple user interface (like [Jackett](https://github.com/Jackett/Jackett)) is available through the Google Chrome extension 🍿 Libre Kinopoisk for simultaneously searching for distributions in all available torrent trackers and downloading content via magnet links or torrent files directly from the trackers.

#### Wox Plugin

Torrent [Search plugin](https://github.com/Lifailon/Wox.Plugins) for quickly searching for distributions in all available torrent trackers through the [Wox](https://github.com/Wox-launcher/Wox) interface, which is available for installation from the [plugins repository](http://www.wox.one/plugin/431).

---

### 🔗 Full list of available providers:

| Provider name                       | Mirrors | Registration |  Filter for search and RSS      | Search by ID | RSS      |
| -                                   | -       | -            |  -                              | -            | -        |
| [RuTracker](https://rutracker.org)  | 3       | Yes*         |  Category                       | Yes          | Native   |
| [Kinozal](https://kinozal.tv)       | 3       | Yes*         |  Category, release year, format | Yes          | *Custom* |
| [RuTor](https://rutor.info)         | 2       | No           |  Category                       | Yes          | *Custom* |
| [NoNameClub](https://nnmclub.to)    | 1       | No           |  Category                       | Yes          | Native   |

**\*** Registration is required only when downloading a torrent file via a direct link. All distributions when searching by **id** (identifier) contain **info hash sum** and **magnet link** (already contain current list of torrent-trackers servers), which allow to immediately start loading content distribution or generate torrentfile after downloading metadata using any torrent client, for example [qBittorrent](https://github.com/qbittorrent/qBittorrent) (supports RSS and search plugins), [Transmission](https://github.com/transmission/transmission) or [Webtorrent Desktop](https://github.com/webtorrent/webtorrent-desktop).

Access to **RSS** feeds for *RuTracker* and *NoNameClub* is by redirecting the original channel. For *Kinozal* and *RuTor* providers, a casted news feed from the homepage has been implemented that supports filtering by categories.

---

## 🚀 Deploy

You can deploy your own public API to Vercel from this repository, just click the button below and follow the instructions:

[![Vercel](https://img.shields.io/badge/Deploy-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/new/torapi/clone?repository-url=https://github.com/lifailon/TorAPI)

## 🐳 Docker

### Docker Hub

The project uses [GitHub Actions](https://github.com/Lifailon/TorAPI/actions) to build the Docker container and automatically test the functionality of all endpoints.

#### Run

Upload the image and run the container from the [Docker Hub](https://hub.docker.com/repository/docker/lifailon/torapi/general):

```shell
docker run -d --name TorAPI -p 8443:8443 --restart=unless-stopped lifailon/torapi:latest
```

If you are using a proxy server:

```shell
docker run -d --name TorAPI -p 8443:8443 --restart=unless-stopped \
  -e PROXY_ADDRESS="192.168.3.100" \
  -e PROXY_PORT="9090" \
  -e USERNAME="TorAPI" \
  -e PASSWORD="TorAPI" \
  lifailon/torapi:latest
```

Replace the contents of the variables for connecting to the Proxy server with your own. If you do not use authorization on the proxy server, simply do not specify these parameters when starting the container.

#### Compose

You can download and use the [docker-compose](docker-compose.yml) file to build the container from Docker Hub:

```shell
curl -sO https://raw.githubusercontent.com/Lifailon/TorAPI/main/docker-compose.yml
curl -sO https://raw.githubusercontent.com/Lifailon/TorAPI/main/.env.yml
```

Edit the environment variables in the [.env](.env) file (required if using a proxy server) and start the container:

```shell
docker-compose up -d
```

### Local image

You can save an image downloaded from Docker Hub to transfer it to a machine that does not have Docker Hub access:

```shell
docker save -o TorAPI-Docker-Image.tar lifailon/torapi
```

In the [release files](https://github.com/Lifailon/TorAPI/releases) you can download the prepared image and boot it on your machine:

```shell
docker load -i TorAPI-Docker-Image.tar
```

Run the container from the downloaded local image:

```shell
docker run -d --name TorAPI -p 8443:8443 --restart=unless-stopped lifailon/torapi:latest
```

### Dockerfile

You can build the image yourself from the project's source files using [dockerfile](dockerfile).

Clone this repository:

```shell
git clone https://github.com/Lifailon/TorAPI
cd TorAPI
```

Edit variables or other settings in the `dockerfile` if necessary:

```shell
ENV PROXY_ADDRESS="192.168.3.100"
ENV PROXY_PORT="9090"
ENV USERNAME="TorAPI"
ENV PASSWORD="TorAPI"
```

Build the image and run the container:

```shell
docker build -t torapi .
docker run -d --name TorAPI -p 8443:8443 --restart=unless-stopped torapi
```

## 📦 Install

To install the project and all dependencies, you can use the package manager [npm](https://www.npmjs.com/package/torapi):

```shell
npm install -g torapi
```

## 🔨 Build

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

For development, use **nodemon** mode (restarts the server when the contents of files change):

```
npm run dev
```

### Proxy

Use a proxy for all requests:

```js
npm start -- --port 2024 --proxyAddress 192.168.3.100 --proxyPort 9090
```

If authorization on a proxy server is required:

```js
npm start -- --port 2024 --proxyAddress 192.168.3.100 --proxyPort 9090 --username TorAPI --password TorAPI
```

### OpenAPI

📚 Documentation is available in the **Swagger UI** at: `http://localhost:8443/docs` via module [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express). The documentation is described through the [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) library.

To create up-to-date or update Swagger documentation files in `JSON` and `YAML` format, use the command:

```shell
npm run docs
```

## 🧪 Tests

You can run testing to quickly check the health of all endpoints in the console:

```shell
npm start -- --test
```

During testing, the local server is started, a request is made to the endpoint `/api/provider/test`, the output is logged in JSON format and the server exits.

Change header parameter in request:

```shell
npm start -- --test --q "The Rookie"
```

Parameterized tests are also available through [GitHub Actions](/.github/workflows/ci-postman-tests.yml) using [Postman](/test/postman.json) via [newman](https://github.com/postmanlabs/newman) in `JUnit` format:

To run tests locally:

```shell
npm install -g newman

newman run test/postman.json \
    --iteration-count 1 \
    --env-var "baseUrl=http://localhost:8443" \
    --env-var "query=The Rookie" \
    --env-var "queryAllPage=test" \
    --env-var "categoryRuTracker=1605" \
    --env-var "categoryKinozal=20" \
    --env-var "categoryRuTor=10" \
    --env-var "categoryNoNameClub=1318"

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

---

## Other projects:

- 🔎 [LibreKinopoisk](https://github.com/Lifailon/LibreKinopoisk) - Google Chrome extension that adds buttons to the Kinopoisk website and provides a **TorAPI** interface in the [Jackett](https://github.com/Jackett/Jackett) style (without the need to install a server part and use a VPN) for quickly searching for movies and series in open sources.

- 🧲 [Kinozal bot](https://github.com/Lifailon/Kinozal-Bot) - Telegram bot that allows you to automate the process of delivering content to your TV using only your phone. Provides a convenient interface for interacting with the torrent tracker [Kinozal](https://kinozal.tv) and the database [TMDB](https://www.themoviedb.org) to track the release date of episodes, seasons and search for actors for each episode , as well as the ability to manage the torrent client [qBittorrent](https://github.com/qbittorrent/qBittorrent) or [Transmission](https://github.com/transmission/transmission) on your computer, being remote from home and from single interface.

- ❤️ [WebTorrent Desktop api](https://github.com/Lifailon/webtorrent-desktop-api) - fork of the [WebTorrent Desktop](https://github.com/webtorrent/webtorrent-desktop) client, which added a remote control mechanism via the `REST API` based on [Express Framework](https://github.com/expressjs/express).

- 📡 [Reverse Proxy .NET](https://github.com/Lifailon/rpnet) - cross-platform command-line utility for implementing a **.NET** based reverse proxy server. It is used to provide access to hosts on the network from one network interface to remote applications via **TCP**, **UDP** or **HTTP/HTTPS** protocols (`GET` and `POST` requests are supported to access external resources over the Internet) available via another network interface (e.g. via **VPN**) on your host without unnecessary configuration and with authorization support.
