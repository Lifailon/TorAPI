import http from "k6/http"
import { check, sleep } from "k6"

export const options = {
    stages: [
        { duration: "10s", target: 5 },
        { duration: "10s", target: 10 },
        { duration: "10s", target: 0 }
    ]
}

export default function () {
    const TOR_API_URL = __ENV.TOR_API_URL || "http://localhost:8443"
    const TOR_API_QUERY = __ENV.TOR_API_QUERY || "test"
    
    const headers = {
        "User-Agent": "Grafana"
    }
    
    const queryParams = `query=${encodeURIComponent(TOR_API_QUERY)}&category=0&page=0`

    let res = http.get(`${TOR_API_URL}/api/provider/list`, { headers: headers })
    check(res, { "status 200": (r) => r.status === 200 })
    sleep(Math.random() * 2 + 2)

    res = http.get(`${TOR_API_URL}/api/search/title/rutracker?${queryParams}`, { headers: headers })
    check(res, { "status 200": (r) => r.status === 200 })
    sleep(Math.random() * 2 + 2)
}
