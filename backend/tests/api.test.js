const request = require('supertest');
const app = require('../src/index');

describe('API Endpoints', () => {
  test('GET / should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Welcome to the DevOps Project API');
  });

  test('GET /api/health should return status OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('timestamp');
  });

  test('GET /api/info should return project info', async () => {
    const res = await request(app).get('/api/info');
    expect(res.statusCode).toBe(200);
    expect(res.body.project).toBe('DevOps Mini Project');
    expect(res.body.stack).toBeInstanceOf(Array);
  });

  test('GET /metrics should return Prometheus metrics', async () => {
    const res = await request(app).get('/metrics');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('http_requests_total');
  });
});
