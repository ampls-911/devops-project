import React, { useState, useEffect } from 'react';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

function App() {
  const [health, setHealth] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/health`)
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch(() => setHealth({ status: 'Unreachable' }));

    fetch(`${BACKEND_URL}/api/info`)
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch(() => {});
  }, []);

  return (
    <div className="app">
      {/* Hero */}
      <header className="hero">
        <div className="hero-content">
          <span className="badge">DevOps Mini Project</span>
          <h1>End-to-End DevOps Pipeline</h1>
          <p>
            A full CI/CD pipeline with Docker, Kubernetes, ArgoCD,
            Prometheus and Grafana — built for IT Business School.
          </p>
          <div className="hero-buttons">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              GitHub Repo
            </a>
            <a href="#stack" className="btn btn-secondary">
              View Stack
            </a>
          </div>
        </div>
      </header>

      {/* Status */}
      <section className="status-section">
        <div className="container">
          <h2>Live Backend Status</h2>
          <div className="status-card">
            <span
              className={`status-dot ${
                health?.status === 'OK' ? 'green' : 'red'
              }`}
            />
            <span className="status-text">
              Backend:{' '}
              <strong>{health ? health.status : 'Connecting...'}</strong>
            </span>
            {health?.uptime && (
              <span className="uptime">
                Uptime: {Math.floor(health.uptime)}s
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="stack-section" id="stack">
        <div className="container">
          <h2>Tech Stack</h2>
          <div className="stack-grid">
            {(
              info?.stack || [
                'React',
                'Node.js',
                'Docker',
                'Kubernetes',
                'ArgoCD',
              ]
            ).map((tech) => (
              <div className="stack-card" key={tech}>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="pipeline-section">
        <div className="container">
          <h2>DevOps Pipeline</h2>
          <div className="pipeline">
            {[
              'Plan',
              'Code',
              'Build',
              'Test',
              'Release',
              'Deploy',
              'Operate',
              'Monitor',
            ].map((step, i) => (
              <div className="pipeline-step" key={step}>
                <div className="step-number">{i + 1}</div>
                <div className="step-label">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>IT Business School — DevOps Module 2026</p>
      </footer>
    </div>
  );
}

export default App;
