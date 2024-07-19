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

Unofficial API (backend) for RuTracker, Kinozal, RuTor, NoNameClub and other torrent trackers to get torrent files and information by movie title, TV series or id.

This project is inspired by ✨ [Torrents-Api](https://github.com/Ryuk-me/Torrents-Api) for Russian-speaking torrent providers.

Two types of queries are supported:

- **Search by title**, in which we will get all available distributions from the specified torrent tracker (its ID and brief information with a link to download the torrent file).
- **Search by ID** of the specified provider, where we will get additional information: hash for direct download through torrent-client, links to Kinopoisk and IMDb databases, detailed description of the movie or TV series, as well as the content of the torrent-file (list and size of files). 

📚 API documentation on [Wiki page](https://github.com/Lifailon/TorAPI/wiki/%F0%9F%93%9A-API-Documentation)

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
