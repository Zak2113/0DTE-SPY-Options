<template>
  <div class="landing-wrapper">
    <nav class="top-nav">
      <div class="logo">SPY_0DTE // ARCHIVE</div>
      <div class="sys-status">
        <span class="status-dot"></span>
        DATA_FEED_ACTIVE
      </div>
    </nav>

    <main class="hero-section">
      <div class="hero-content animate-fade-in">
        <h1 class="title">Analyze Historical <br />0DTE Price Action.</h1>
        <p class="subtitle">
          High-fidelity historical data visualization for SPY zero-day-to-expiration contracts. Track minute-by-minute price action, volatility, and volume flow across past trading sessions.
        </p>
        
        <div class="action-group">
          <NuxtLink to="/viewer" class="cta-button">
            Open Charting Terminal <span class="arrow">→</span>
          </NuxtLink>
        </div>

        <div class="tech-stack">
          <span>ASSET: SPY</span>
          <span class="divider">/</span>
          <span>EXPIRY: 0DTE</span>
          <span class="divider">/</span>
          <span>RESOLUTION: 1-MIN OHLCV</span>
        </div>
      </div>

      <div class="hero-visual animate-slide-up">
        <div class="chart-window">
          <div class="chart-header">
            <div class="ticker-info">
              <span class="ticker">SPY</span>
              <span class="contract">510 C</span>
              <span class="date">May 15, 2024</span>
            </div>
            <div class="price-info">
              <span class="current">4.85</span>
              <span class="change positive">+1.25 (+34.7%)</span>
            </div>
          </div>
          
          <div class="chart-body">
            <div class="grid-line" style="top: 20%;"></div>
            <div class="grid-line" style="top: 50%;"></div>
            <div class="grid-line" style="top: 80%;"></div>
            
            <svg viewBox="0 0 400 200" class="mock-chart-svg" preserveAspectRatio="none">
              <line x1="50" y1="80" x2="50" y2="140" stroke="#ef4444" stroke-width="1.5" />
              <rect x="46" y="90" width="8" height="40" fill="#ef4444" />
              <line x1="110" y1="60" x2="110" y2="110" stroke="#10b981" stroke-width="1.5" />
              <rect x="106" y="70" width="8" height="25" fill="#10b981" />
              <line x1="170" y1="40" x2="170" y2="80" stroke="#10b981" stroke-width="1.5" />
              <rect x="166" y="45" width="8" height="30" fill="#10b981" />
              <line x1="230" y1="30" x2="230" y2="90" stroke="#ef4444" stroke-width="1.5" />
              <rect x="226" y="40" width="8" height="45" fill="#ef4444" />
              <line x1="290" y1="20" x2="290" y2="70" stroke="#10b981" stroke-width="1.5" />
              <rect x="286" y="20" width="8" height="35" fill="#10b981" />
              <line x1="350" y1="10" x2="350" y2="50" stroke="#10b981" stroke-width="1.5" />
              <rect x="346" y="15" width="8" height="20" fill="#10b981" />
              
              <path d="M 50 120 Q 110 90 170 70 T 290 60 T 350 30" fill="none" stroke="#3b82f6" stroke-width="2" opacity="0.6" />
            </svg>

            <div class="mock-volume">
              <div class="vol-bar red" style="height: 60%;"></div>
              <div class="vol-bar green" style="height: 40%;"></div>
              <div class="vol-bar green" style="height: 80%;"></div>
              <div class="vol-bar red" style="height: 100%;"></div>
              <div class="vol-bar green" style="height: 50%;"></div>
              <div class="vol-bar green" style="height: 30%;"></div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <section class="specs-grid animate-fade-in-delayed">
      <div class="spec-item">
        <div class="spec-label">Intraday Precision</div>
        <div class="spec-value">1-Min Resolution</div>
        <div class="spec-desc">Granular tick data perfectly preserves the exact sequence of daily price movements.</div>
      </div>
      <div class="spec-item">
        <div class="spec-label">Historical Archive</div>
        <div class="spec-value">Session Replay</div>
        <div class="spec-desc">Select past trading days to backtest strategies and study historical market behavior.</div>
      </div>
      <div class="spec-item">
        <div class="spec-label">Market Dynamics</div>
        <div class="spec-value">Volume Flow</div>
        <div class="spec-desc">Analyze buying and selling pressure alongside the standard OHLC price chart.</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* --- Layout & Typography --- */
.landing-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  background-color: var(--bg-main);
  max-width: 1400px;
  margin: 0 auto;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
  font-family: monospace;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.logo { color: var(--text-main); font-weight: bold; }
.sys-status { display: flex; align-items: center; gap: 0.5rem; color: #10B981; }
.status-dot { width: 8px; height: 8px; background-color: #10B981; border-radius: 50%; animation: pulse 2s infinite; }

/* --- Hero Section --- */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  flex: 1;
  padding: 4rem 0;
}

.title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--text-main);
  margin-bottom: 1.5rem;
  letter-spacing: -1px;
}

.subtitle {
  font-size: 1.15rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 90%;
}

/* --- CTA & Product Specs --- */
.cta-button {
  display: inline-flex;
  align-items: center;
  background-color: var(--text-main);
  color: var(--bg-main);
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 2px;
  transition: all 0.2s ease;
}

.cta-button:hover {
  background-color: var(--accent-color);
  color: white;
}

.cta-button .arrow { margin-left: 0.5rem; transition: transform 0.2s; }
.cta-button:hover .arrow { transform: translateX(4px); }

.tech-stack {
  margin-top: 3rem;
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--text-muted);
  display: flex;
  gap: 1rem;
}
.divider { color: var(--border-color); }

/* --- Simulated Chart Window --- */
.hero-visual { width: 100%; }
.chart-window {
  background-color: #0E1117; /* Keep chart dark regardless of theme */
  border: 1px solid #2d2f36;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
}

.chart-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #2d2f36;
}

.ticker-info { display: flex; flex-direction: column; gap: 0.25rem; }
.ticker { color: #FAFAFA; font-size: 1.25rem; font-weight: 700; letter-spacing: 1px; }
.contract { color: #8b929e; font-size: 0.9rem; font-family: monospace; }
.date { color: #52525b; font-size: 0.8rem; text-transform: uppercase; }

.price-info { text-align: right; }
.current { display: block; color: #FAFAFA; font-size: 1.5rem; font-weight: 600; font-variant-numeric: tabular-nums; }
.change { display: block; font-size: 0.85rem; font-family: monospace; font-variant-numeric: tabular-nums; }
.change.positive { color: #10B981; }

.chart-body {
  position: relative;
  height: 250px;
  background-color: #0E1117;
  padding: 1rem 0;
}

/* Background Grid */
.grid-line {
  position: absolute;
  left: 0; right: 0;
  height: 1px;
  background-color: #2d2f36;
  opacity: 0.5;
}

.mock-chart-svg {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
}

/* Volume Sub-Chart */
.mock-volume {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 0 2rem;
  opacity: 0.4;
  z-index: 1;
}

.vol-bar { width: 8px; border-radius: 1px 1px 0 0; }
.vol-bar.red { background-color: #ef4444; }
.vol-bar.green { background-color: #10B981; }

/* --- Features Grid --- */
.specs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.spec-item { padding-right: 1rem; }
.spec-label { font-family: monospace; font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem; }
.spec-value { font-size: 1.3rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.5rem; }
.spec-desc { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; }

/* --- Animations --- */
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
.animate-fade-in { animation: fadeIn 0.8s ease forwards; }
.animate-fade-in-delayed { opacity: 0; animation: fadeIn 0.8s ease 0.3s forwards; }
.animate-slide-up { opacity: 0; animation: slideUp 0.8s ease 0.1s forwards; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* --- Responsive --- */
@media (max-width: 1024px) {
  .hero-section { grid-template-columns: 1fr; gap: 3rem; text-align: center; }
  .subtitle { margin: 0 auto 3rem auto; }
  .tech-stack { justify-content: center; }
  .specs-grid { grid-template-columns: 1fr; border-top: none; gap: 3rem; }
  .landing-wrapper { padding: 2rem; }
}
</style>