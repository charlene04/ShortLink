## ShortLink: A URL Shortening Service
- This is a simple Node js application that can encode long urls into shortened url. Flipping the coin, the shortened url can be be decoded into the original long url. In addition, the API also exposees a `statistics/:key` endpoint for fetching statistical data.

### Endpoints
- `POST: /encode`
- `POST: /decode`
- `GET: /statistic/:key`

### Prerequisite
1. Node v16.17.1 (preferably, but v14.x.x at the very least)
2. Postman (for manual API testing)

### SETUP

#### Start the server
1. Clone the repo into your local machine
2. `cd` into the project directory and run `npm install` to install project dependencies
3. run `npm start` to start the server


#### Testing with Postman

- ENCODING
1. Open the postman client application
2. Enter `http://localhost:3000/encode` in the postman address bar (`3000` is the port the Node server is running on)
3. Select `POST` as the request method from the actions dropdown
4. Select `Body` as data type and provide a JSON object containing `url` as key, and any long url of choice as its value. For example:
```
{
    "url": "https://googgle.com/my-profile-testing"
}
```

5. Click on `Send` to send the request
6. Observe the response. It should contain a JSON object with `shortUrl`.



- DECODING
1. Enter `http://localhost:3000/decode` in the postman address bar (`3000` is the port the Node server is running on)
2. Select `POST` as the request method from the actions dropdown
3. Select `Body` as data type and provide a JSON object containing `url` as key, and `shortUrl` gotten from ENCODING step above as its value. For example:
```
{
    "url": "https://short.est/my4rt5"
}
```

4. Click on `Send` to send the request
5. Observe the response. It should contain a JSON object with `originalUrl` matching the one provided during the ENCODING step



- STATISTICS
1. Enter `http://localhost:3000/statistic/PATHNAME` in the postman address bar (`3000` is the port the Node server is running on)
2. Select `GET` as the request method from the actions dropdown
3. `PATHNAME` refers to the 6 character string in the ShortUrl returned during the ENCODING step. From the example above, `PATHNAME` is `my4rt5`.
4. Click on `Send` to send the request
5. Observe the response. It should contain a JSON object with `stats`.
6. The stats returned should have `url`, `shortUrl`, and `date_encoded`. `url` references the original long url provided during ENCODING


#### Running jest test
1. Ensure the server is not running (to avoid port clash as the test would also instantiate the server on same port)
2. `cd` into the project directory and run `npm run test`
3. Observe
