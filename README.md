<p align="center">
    <img src="logo.png" alt="Image alt">
</p>

---

<p align="center">
    <a href="https://github.com/nodejs/node"><img title="Node" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"></a>
    <a href="https://github.com/expressjs/express"><img title="Express" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"></a>
</p>

<p align="center">
    <a href="https://hub.docker.com/r/lifailon/torapi"><img title="Docker" src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"></a>
    <a href="https://app.swaggerhub.com/apis-docs/TorAPI-7df/TorAPI/0.3.0"><img title="Swagger" src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white"></a>
    <a href="https://github.com/Lifailon/TorAPI/actions"><img title="Actions" src="https://img.shields.io/badge/Actions-%230075A8.svg?style=for-the-badge&logo=githubactions&logoColor=white"></a>
</p>

<p align="center">
    <a href="https://hub.docker.com/r/lifailon/torapi"><img title="Docker"src="https://img.shields.io/docker/image-size/lifailon/torapi?&color=blue&label=Docker%20Image"></a>
    <a href="https://github.com/Lifailon/TorAPI/actions"><img title="Actions"src="https://img.shields.io/github/actions/workflow/status/Lifailon/TorAPI/docker-build-and-tests.yml?logo=GitHub-Actions&label=Build%20and%20Tests"></a>
    <a href="https://github.com/Lifailon/TorAPI"><img title="Version"src="https://img.shields.io/github/v/tag/lifailon/TorAPI?logo=GitHub&color=gray&label=Version"></a>
    <a href="https://github.com/Lifailon/TorAPI"><img title="Language"src="https://img.shields.io/github/languages/top/lifailon/TorAPI?logo=JavaScript&color=gold&label=JavaScript"></a>
    <a href="https://github.com/Lifailon/TorAPI/blob/main/LICENSE"><img title="License"src="https://img.shields.io/github/license/lifailon/TorAPI?logo=Readme&color=white&label=License"></a>
</p>

Unofficial API (**backend**) for RuTracker, Kinozal, RuTor and NoNameClub for receiving torrent files and detailed information about distribution by movie title, TV series or id, and also provides RSS news feed for all providers.

This project is inspired by ✨ [Torrents-Api](https://github.com/Ryuk-me/Torrents-Api) for Russian-speaking torrent providers.

Implemented:

- **Search by title** to get all available distributions from a specified torrent tracker (its ID and brief information with a link to download the torrent file) or from **all** trackers at once.
- **Search by ID** of the specified provider to get additional information: hash for direct download via torrent-client, links to Kinopoisk and IMDb databases, detailed description of the movie or series, as well as the content of the torrent-distribution.
- **Get RSS news feeds** from all used providers in `XML` and also `JSON` formats.

📄 Released under the [MIT license](https://github.com/Lifailon/TorAPI/blob/rsa/LICENSE).

---

### 🔗 Full list of available providers:

| Provider name                       | Mirrors | Registration | Search by ID | RSS      |
| -                                   | -       | -            | -            | -        |
| [RuTracker](https://rutracker.org)  | 3       | Yes*         | Yes          | Native   |
| [Kinozal](https://kinozal.tv)       | 3       | Yes*         | Yes          | Native   |
| [RuTor](https://rutor.info)         | 2       | No           | Yes          | *Custom* |
| [NoNameClub](https://nnmclub.to)    | 1       | No           | Yes          | Native   |

**\*** Registration is required only when downloading a torrent file via a direct link. All distributions when searching by ID contain **hash** (cookies have already been added) and **magnet links** (containing a list of trackers), which allow you to download the contents of the distribution or generate a torrent file using any torrent client after downloading the metadata.

The RSS feed is accessed by redirecting the original feed. For providers that do not support RSS by default, a custom news feed has been implemented from the main page.

You can see examples of requests and responses in the static documentation posted on [GitHub Wiki](https://github.com/Lifailon/TorAPI/wiki/%F0%9F%93%9A-API-Static-Documentation) and [GitHub Page](https://lifailon.github.io/TorAPI).

[![Wikipedia](https://img.shields.io/badge/API_Static_Docs-009CAB.svg?style=for-the-badge&logo=wikipedia&logoColor=white)](https://lifailon.github.io/TorAPI)

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

📚 Documentation is available in the **Swagger UI** at: `http://localhost:8443/docs`

You can specify a different port:

```js
npm start -- --port 2024
```

Use a proxy for all requests:

```js
npm start -- --port 2024 --proxyAddress 192.168.3.100 --proxyPort 9090
```

If authorization on a proxy server is required:

```js
npm start -- --port 2024 --proxyAddress 192.168.3.100 --proxyPort 9090 --username TorAPI --password TorAPI
```

🧪 [GitHub Actions workflows](https://github.com/Lifailon/TorAPI/tree/main/.github/workflows) are used for build docker image, test functional all endpoints and get response times.

## 🐳 Docker

### Docker Hub

#### Run

Upload the image and run the container from the [Docker Hub](https://hub.docker.com/repository/docker/lifailon/torapi/general):

```shell
docker run -d --name TorAPI -p 8443:8443 lifailon/torapi:latest
```

If you are using a proxy server:

```shell
docker run -d --name TorAPI -p 8443:8443 \
  -e PROXY_ADDRESS="192.168.3.100" \
  -e PROXY_PORT="9090" \
  -e USERNAME="TorAPI" \
  -e PASSWORD="TorAPI" \
  lifailon/torapi:latest
```

#### Compose

You can download and use the [docker-compose](docker-compose.yml) file to build the container from Docker Hub:

```shell
curl -sO https://raw.githubusercontent.com/Lifailon/TorAPI/main/docker-compose.yml
curl -sO https://raw.githubusercontent.com/Lifailon/TorAPI/main/.env.yml
```

Edit the environment variables file [.env](.env) and build the container:

```shell
docker-compose up -d
```

### Dockerfile

You can use project files to build from [dockerfile](dockerfile):

```shell
git clone https://github.com/Lifailon/TorAPI
cd TorAPI
```

When using a proxy, edit the variables in dockerfile:

```shell
ENV PROXY_ADDRESS="192.168.3.100"
ENV PROXY_PORT="9090"
ENV USERNAME="TorAPI"
ENV PASSWORD="TorAPI"
```

Build the image and run the container:

```shell
docker build -t torapi .
docker run -d --name TorAPI -p 8443:8443 torapi
```
