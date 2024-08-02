/**
 * @openapi
 * /api/provider/list:
 *   get:
 *     tags: [Provider]
 *     description: Get a list of providers
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 * /api/get/rss/kinozal:
 *   get:
 *     tags: [RSS]
 *     description: Get news feed from RSS in XML or JSON format
 *     parameters:
 *       - name: Accept
 *         in: header
 *         required: true
 *         description: To receive a response in the required format, use the response selection parameter in the responses block
 *         schema:
 *           type: string
 *           enum: [application/xml, application/json]
 *           default: application/xml
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                 rss:
 *                   type: string
 *                   example: "Array"
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rss:
 *                   type: string
 *                   example: "Array"
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 * /api/search/title/rutracker:
 *   get:
 *     tags: [Search by Title]
 *     description: Search for a movie or TV series in torrent tracker RuTracker
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: Query parameter
 *         schema:
 *           type: string
 *           example: "The Rookie"
 *       - name: page
 *         in: query
 *         description: Page number
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *       - name: year
 *         in: query
 *         description: Year release
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *           maximum: 2024
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Name:
 *                     type: string
 *                   Id:
 *                     type: string
 *                   Url:
 *                     type: string
 *                   Torrent:
 *                     type: string
 *                   Size:
 *                     type: string
 *                   Download_Count:
 *                     type: string
 *                   Checked:
 *                     type: string
 *                   Type:
 *                     type: string
 *                   Type_Link:
 *                     type: string
 *                   Seeds:
 *                     type: string
 *                   Peers:
 *                     type: string
 *                   Date:
 *                     type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 * /api/search/title/kinozal:
 *   get:
 *     tags: [Search by Title]
 *     description: Search for a movie or TV series in torrent tracker Kinozal
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: Query parameter
 *         schema:
 *           type: string
 *           example: "The Rookie"
 *       - name: page
 *         in: query
 *         description: Page number
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *       - name: year
 *         in: query
 *         description: Year release
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *           maximum: 2024
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Name:
 *                     type: string
 *                   Id:
 *                     type: string
 *                   Original_Name:
 *                     type: string
 *                   Year:
 *                     type: string
 *                   Language:
 *                     type: string
 *                   Format:
 *                     type: string
 *                   Url:
 *                     type: string
 *                   Torrent:
 *                     type: string
 *                   Size:
 *                     type: string
 *                   Comments:
 *                     type: string
 *                   Seeds:
 *                     type: string
 *                   Peers:
 *                     type: string
 *                   Date:
 *                     type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 * /api/search/title/rutor:
 *   get:
 *     tags: [Search by Title]
 *     description: Search for a movie or TV series in torrent tracker RuTor
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: Query parameter
 *         schema:
 *           type: string
 *           example: "The Rookie"
 *       - name: page
 *         in: query
 *         description: Page number
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *       - name: year
 *         in: query
 *         description: Year release
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *           maximum: 2024
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Name:
 *                     type: string
 *                   Id:
 *                     type: string
 *                   Url:
 *                     type: string
 *                   Torrent:
 *                     type: string
 *                   Hash:
 *                     type: string
 *                   Size:
 *                     type: string
 *                   Comments:
 *                     type: string
 *                   Seeds:
 *                     type: string
 *                   Peers:
 *                     type: string
 *                   Date:
 *                     type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 * /api/search/title/nonameclub:
 *   get:
 *     tags: [Search by Title]
 *     description: Search for a movie or TV series in torrent tracker NoNameClub
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: Query parameter
 *         schema:
 *           type: string
 *           example: "The Rookie"
 *       - name: page
 *         in: query
 *         description: Page number
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *       - name: year
 *         in: query
 *         description: Year release
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *           maximum: 2024
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Name:
 *                     type: string
 *                   Id:
 *                     type: string
 *                   Url:
 *                     type: string
 *                   Torrent:
 *                     type: string
 *                   Size:
 *                     type: string
 *                   Comments:
 *                     type: string
 *                   Type:
 *                     type: string
 *                   Seeds:
 *                     type: string
 *                   Peers:
 *                     type: string
 *                   Date:
 *                     type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 * /api/search/title/all:
 *   get:
 *     tags: [Search by Title]
 *     description: Search for a movie or TV series in all torrent trackers
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: Query parameter
 *         schema:
 *           type: string
 *           example: "The Rookie"
 *       - name: page
 *         in: query
 *         description: Page number
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *       - name: year
 *         in: query
 *         description: Year release
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *           maximum: 2024
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 RuTracker:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Name:
 *                         type: string
 *                       Id:
 *                         type: string
 *                       Url:
 *                         type: string
 *                       Torrent:
 *                         type: string
 *                       Size:
 *                         type: string
 *                       Download_Count:
 *                         type: string
 *                       Checked:
 *                         type: string
 *                       Type:
 *                         type: string
 *                       Type_Link:
 *                         type: string
 *                       Seeds:
 *                         type: string
 *                       Peers:
 *                         type: string
 *                       Date:
 *                         type: string
 *                 Kinozal:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Name:
 *                         type: string
 *                       Id:
 *                         type: string
 *                       Original_Name:
 *                         type: string
 *                       Year:
 *                         type: string
 *                       Language:
 *                         type: string
 *                       Format:
 *                         type: string
 *                       Url:
 *                         type: string
 *                       Torrent:
 *                         type: string
 *                       Size:
 *                         type: string
 *                       Comments:
 *                         type: string
 *                       Seeds:
 *                         type: string
 *                       Peers:
 *                         type: string
 *                       Date:
 *                         type: string
 *                 RoTor:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Name:
 *                         type: string
 *                       Id:
 *                         type: string
 *                       Url:
 *                         type: string
 *                       Torrent:
 *                         type: string
 *                       Hash:
 *                         type: string
 *                       Size:
 *                         type: string
 *                       Comments:
 *                         type: string
 *                       Seeds:
 *                         type: string
 *                       Peers:
 *                         type: string
 *                       Date:
 *                         type: string
 *                 NoNameClub:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Name:
 *                         type: string
 *                       Id:
 *                         type: string
 *                       Url:
 *                         type: string
 *                       Torrent:
 *                         type: string
 *                       Size:
 *                         type: string
 *                       Comments:
 *                         type: string
 *                       Type:
 *                         type: string
 *                       Seeds:
 *                         type: string
 *                       Peers:
 *                         type: string
 *                       Date:
 *                         type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 * /api/search/id/rutracker:
 *   get:
 *     tags: [Search by ID]
 *     description: Search by id in the torrent tracker RuTracker
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: ID parameter
 *         schema:
 *           type: integer
 *           example: 6489937
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Name:
 *                     type: string
 *                   Url:
 *                     type: string
 *                   Hash:
 *                     type: string
 *                   Magnet:
 *                     type: string
 *                   Torrent:
 *                     type: string
 *                   IMDb_link:
 *                     type: string
 *                   Kinopoisk_link:
 *                     type: string
 *                   IMDb_id:
 *                     type: string
 *                   Kinopoisk_id:
 *                     type: string
 *                   Year:
 *                     type: string
 *                   Release:
 *                     type: string
 *                   Type:
 *                     type: string
 *                   Duration:
 *                     type: string
 *                   Audio:
 *                     type: string
 *                   Directer:
 *                     type: string
 *                   Actors:
 *                     type: string
 *                   Description:
 *                     type: string
 *                   Quality:
 *                     type: string
 *                   Video:
 *                     type: string
 *                   Files:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Name:
 *                           type: string
 *                         Size:
 *                           type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found 
 * /api/search/id/kinozal:
 *   get:
 *     tags: [Search by ID]
 *     description: Search by id in the torrent tracker Kinozal
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: ID parameter
 *         schema:
 *           type: integer
 *           example: 2022944
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Name:
 *                     type: string
 *                   Original_Name:
 *                     type: string
 *                   Url:
 *                     type: string
 *                   Hash:
 *                     type: string
 *                   Magnet:
 *                     type: string
 *                   IMDb_link:
 *                     type: string
 *                   Kinopoisk_link:
 *                     type: string
 *                   IMDb_id:
 *                     type: string
 *                   Kinopoisk_id:
 *                     type: string
 *                   Year:
 *                     type: string
 *                   Type:
 *                     type: string
 *                   Release:
 *                     type: string
 *                   Directer:
 *                     type: string
 *                   Actors:
 *                     type: string
 *                   Description:
 *                     type: string
 *                   Quality:
 *                     type: string
 *                   Video:
 *                     type: string
 *                   Audio:
 *                     type: string
 *                   Size:
 *                     type: string
 *                   Duration:
 *                     type: string
 *                   Transcript:
 *                     type: string
 *                   Seeds:
 *                     type: string
 *                   Peers:
 *                     type: string
 *                   Download_Count:
 *                     type: string
 *                   Files_Count:
 *                     type: string
 *                   Comments:
 *                     type: string
 *                   IMDb_Rating:
 *                     type: string
 *                   Kinopoisk_Rating:
 *                     type: string
 *                   Kinozal_Rating:
 *                     type: string
 *                   Votes:
 *                     type: string
 *                   Added_Date:
 *                     type: string
 *                   Update_Date:
 *                     type: string
 *                   Files:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Name:
 *                           type: string
 *                         Size:
 *                           type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found 
 * /api/search/id/rutor:
 *   get:
 *     tags: [Search by ID]
 *     description: Search by id in the torrent tracker RuTor
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: ID parameter
 *         schema:
 *           type: integer
 *           example: 970650
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Name:
 *                     type: string
 *                   Url:
 *                     type: string
 *                   Hash:
 *                     type: string
 *                   Magnet:
 *                     type: string
 *                   Torrent:
 *                     type: string
 *                   IMDb_link:
 *                     type: string
 *                   Kinopoisk_link:
 *                     type: string
 *                   IMDb_id:
 *                     type: string
 *                   Kinopoisk_id:
 *                     type: string
 *                   Rating:
 *                     type: string
 *                   Category:
 *                     type: string
 *                   Seeds:
 *                     type: string
 *                   Peers:
 *                     type: string
 *                   Seed_Date:
 *                     type: string
 *                   Add_Date:
 *                     type: string
 *                   Size:
 *                     type: string
 *                   Files:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Name:
 *                           type: string
 *                         Size:
 *                           type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found 
 * /api/search/id/nonameclub:
 *   get:
 *     tags: [Search by ID]
 *     description: Search by id in the torrent tracker NoNameClub
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: ID parameter
 *         schema:
 *           type: integer
 *           example: 1259608
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Name:
 *                     type: string
 *                   Url:
 *                     type: string
 *                   Hash:
 *                     type: string
 *                   Magnet:
 *                     type: string
 *                   Torrent:
 *                     type: string
 *                   IMDb_link:
 *                     type: string
 *                   Kinopoisk_link:
 *                     type: string
 *                   IMDb_id:
 *                     type: string
 *                   Kinopoisk_id:
 *                     type: string
 *                   Release:
 *                     type: string
 *                   Type:
 *                     type: string
 *                   Directer:
 *                     type: string
 *                   Actors:
 *                     type: string
 *                   Description:
 *                     type: string
 *                   Duration:
 *                     type: string
 *                   Quality:
 *                     type: string
 *                   Video:
 *                     type: string
 *                   Audio:
 *                     type: string
 *                   Registration:
 *                     type: string
 *                   Rating:
 *                     type: string
 *                   Votes:
 *                     type: string
 *                   Size:
 *                     type: string
 *                   Files:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Name:
 *                           type: string
 *                         Size:
 *                           type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
*/