const request = require('supertest');

const app = require('../app');
let body;

describe('Testing encode/decode/statistic endpoints', () => {
    it('respond with valid HTTP status code, content-type and correct data for encoding', async () => {
        // Encoding long url
        let response = await request(app).post('/encode').send({ url: 'https://google.com/test/'});
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        body = JSON.parse(response.text);
        expect(body.shortUrl).toBeDefined();
        expect(body.shortUrl).toContain('http://short.est/');

        // Querying stats
        let key = new URL(body.shortUrl).pathname.split('/')[1];
        response = await request(app).get(`/statistic/${key}`);
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        body = JSON.parse(response.text);
        expect(body.stats).toBeDefined();
        expect(body.stats.url).toBeDefined();
        expect(body.stats.shortUrl).toBeDefined();
        expect(body.stats.date_encoded).toBeDefined();
            
        // Decoding shortUrl
        response = await request(app).post('/decode').send({ url: body.stats.shortUrl });
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        body = JSON.parse(response.text);
        expect(body.originalUrl).toBeDefined();
        expect(body.originalUrl).toBe('https://google.com/test/'); 
    });

    it('responds with 404 HTTP status code and Not Found message when querying inexistent stats', async () => {
        let response = await request(app).get(`/statistic/re4345`);
                
        expect(response.statusCode).toBe(404);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        body = JSON.parse(response.text);
        expect(body.message).toBe('No Stats Found');
    });

    it('responds with 404 HTTP status code and Not Found message when decoding inexistent shortUrl', async () => {
        let response = await request(app).post('/decode').send({ url: 'http://short.est/54trty' });
                
        expect(response.statusCode).toBe(404);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        body = JSON.parse(response.text);
        expect(body.message).toBe('Not Found');
    });
});
