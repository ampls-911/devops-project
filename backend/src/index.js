const express = require('express');
const cors = require('cors');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 5000;

// Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

// Middleware
app.use(cors());
app.use(express.json());

// Track requests
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });
  });
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the DevOps Project API' });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    project: 'DevOps Mini Project',
    version: '1.0.0',
    author: 'Student',
    stack: ['React', 'Node.js', 'Docker', 'Kubernetes', 'ArgoCD'],
  });
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
}

module.exports = app;
