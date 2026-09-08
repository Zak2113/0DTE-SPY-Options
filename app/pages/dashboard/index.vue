<!-- app/pages/dashboard/index.vue -->

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'authenticated',
})

const { user } = useUserSession()

// -----------------------------------------------------------------------
// Placeholder data below — replace each block with a real API call once
// the corresponding backend endpoint exists:
//
//   spyQuote      -> GET /api/market/spy-quote        (live/last SPY price)
//   biggestMover   -> GET /api/market/todays-movers?limit=1
//   topMovers      -> GET /api/market/todays-movers?limit=5
//   stats          -> GET /api/stats
//   recentBacktests -> GET /api/backtests?limit=5
//
// "Biggest mover" methodology (compute this once per day, server-side, right
// after the day's 0DTE chain is ingested):
//   For every contract that traded today, take (session high - session low)
//   as the max theoretical profit if someone bought at the low and sold at
//   the high (or the reverse for a short). Rank contracts by percent return
//   ((high - low) / low), not raw dollar move, since a $50 move on a $2
//   option and a $2 move on a $0.10 option aren't comparable in raw dollars.
//   The #1 ranked contract is "today's biggest mover".
// -----------------------------------------------------------------------

const spyQuote = ref({
  price: 668.42,
  change: 3.15,
  changePct: 0.47,
  marketOpen: true,
  closesIn: '2h 14m',
  asOf: '11:46 AM ET',
})

const biggestMover = ref({
  symbol: 'SPY 260828C00670000',
  label: '$670 Call',
  low: 0.12,
  high: 2.84,
  lowTime: '9:42 AM',
  highTime: '2:58 PM',
  pnlPct: 2166.7,
  pnlPerContract: 272.0,
})

const topMovers = ref([
  { symbol: 'SPY 260828C00670000', label: '$670 Call', pnlPct: 2166.7 },
  { symbol: 'SPY 260828P00660000', label: '$660 Put', pnlPct: 1840.0 },
  { symbol: 'SPY 260828C00672000', label: '$672 Call', pnlPct: 1390.5 },
  { symbol: 'SPY 260828P00658000', label: '$658 Put', pnlPct: 980.2 },
  { symbol: 'SPY 260828C00668000', label: '$668 Call', pnlPct: 812.9 },
])

const stats = [
  { label: 'BACKTESTS RUN', value: '128' },
  { label: 'AVG WIN RATE', value: '61.4%' },
  { label: 'BEST STRATEGY P&L', value: '+$4,210' },
  { label: 'WATCHLIST', value: '3 tickers' },
]

const recentBacktests = [
  {
    id: 1,
    strategy: 'Iron Condor',
    underlying: 'SPY',
    range: '2026-01-01 → 2026-06-30',
    pnl: 1240.5,
    status: 'complete',
    ranAt: '2 hours ago',
  },
  {
    id: 2,
    strategy: 'Short Put Credit Spread',
    underlying: 'SPY',
    range: '2025-09-01 → 2026-06-30',
    pnl: -320.0,
    status: 'complete',
    ranAt: 'yesterday',
  },
  {
    id: 3,
    strategy: 'Iron Condor',
    underlying: 'SPX',
    range: '2026-03-01 → 2026-06-30',
    pnl: 0,
    status: 'running',
    ranAt: 'just now',
  },
]

function formatPnl(value: number) {
  if (value === 0) return '—'
  const sign = value > 0 ? '+' : ''
  return `${sign}$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function formatPct(value: number, withSign = true) {
  const sign = withSign && value > 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}
</script>

<template>
  <div class="dashboard-page">
    <!-- Page header -->
    <div class="page-header">
      <div>
        <div class="page-eyebrow">
          OVERVIEW
        </div>
        <h1 class="page-title">
          Welcome back{{ user?.name ? `, ${user.name}` : '' }}
        </h1>
      </div>

      <NuxtLink to="/dashboard/backtests/new" class="primary-button">
        New backtest
      </NuxtLink>
    </div>

    <!-- Headline: SPY price + today's biggest mover -->
    <div class="hero-grid">
      <div class="hero-card">
        <div class="hero-card-header">
          <span class="hero-eyebrow">SPY</span>
          <span :class="['market-badge', spyQuote.marketOpen ? 'market-open' : 'market-closed']">
            {{ spyQuote.marketOpen ? 'OPEN' : 'CLOSED' }}
          </span>
        </div>

        <div class="hero-price-row">
          <span class="hero-price">${{ spyQuote.price.toFixed(2) }}</span>
          <span :class="['hero-change', spyQuote.change >= 0 ? 'positive' : 'negative']">
            {{ spyQuote.change >= 0 ? '+' : '' }}{{ spyQuote.change.toFixed(2) }}
            ({{ formatPct(spyQuote.changePct) }})
          </span>
        </div>

        <div class="hero-footer">
          <span v-if="spyQuote.marketOpen">Closes in {{ spyQuote.closesIn }}</span>
          <span v-else>Market closed</span>
          <span class="hero-footer-dot">·</span>
          <span>As of {{ spyQuote.asOf }}</span>
        </div>
      </div>

      <div class="hero-card hero-card--accent">
        <div class="hero-card-header">
          <span class="hero-eyebrow">TODAY'S BIGGEST 0DTE MOVER</span>
        </div>

        <div class="mover-main-row">
          <span class="mover-label">{{ biggestMover.label }}</span>
          <span class="mover-pnl-pct">{{ formatPct(biggestMover.pnlPct) }}</span>
        </div>

        <div class="mover-detail-row">
          <div class="mover-detail">
            <span class="mover-detail-label">LOW</span>
            <span class="mover-detail-value">${{ biggestMover.low.toFixed(2) }} <span class="cell-muted">{{ biggestMover.lowTime }}</span></span>
          </div>
          <span class="mover-arrow">→</span>
          <div class="mover-detail">
            <span class="mover-detail-label">HIGH</span>
            <span class="mover-detail-value">${{ biggestMover.high.toFixed(2) }} <span class="cell-muted">{{ biggestMover.highTime }}</span></span>
          </div>
          <div class="mover-detail mover-detail--pnl">
            <span class="mover-detail-label">PER CONTRACT</span>
            <span class="mover-detail-value positive">{{ formatPnl(biggestMover.pnlPerContract) }}</span>
          </div>
        </div>

        <div class="hero-footer">
          <NuxtLink :to="`/dashboard/backtests/new?symbol=${biggestMover.symbol}`" class="mover-link">
            Backtest this setup →
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Top movers -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">Today's top movers</span>
        <NuxtLink to="/dashboard/movers" class="section-link">
          View all →
        </NuxtLink>
      </div>

      <div class="movers-list">
        <div
          v-for="(mover, i) in topMovers"
          :key="mover.symbol"
          class="movers-row"
        >
          <span class="movers-rank">{{ i + 1 }}</span>
          <span class="cell-strong">{{ mover.label }}</span>
          <span class="cell-muted movers-symbol">{{ mover.symbol }}</span>
          <span class="movers-pnl positive">{{ formatPct(mover.pnlPct) }}</span>
        </div>
      </div>
    </div>

    <!-- Stat cards -->
    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <div class="stat-label">
          {{ stat.label }}
        </div>
        <div class="stat-value">
          {{ stat.value }}
        </div>
      </div>
    </div>

    <!-- Recent backtests -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">Recent backtests</span>
        <NuxtLink to="/dashboard/backtests" class="section-link">
          View all →
        </NuxtLink>
      </div>

      <div v-if="recentBacktests.length" class="backtest-table">
        <div class="table-row table-row--head">
          <span>Strategy</span>
          <span>Underlying</span>
          <span>Range</span>
          <span>P&amp;L</span>
          <span>Status</span>
          <span>Ran</span>
        </div>

        <NuxtLink
          v-for="bt in recentBacktests"
          :key="bt.id"
          :to="`/dashboard/backtests/${bt.id}`"
          class="table-row"
        >
          <span class="cell-strong">{{ bt.strategy }}</span>
          <span>{{ bt.underlying }}</span>
          <span class="cell-muted">{{ bt.range }}</span>
          <span :class="['cell-pnl', bt.pnl > 0 ? 'positive' : bt.pnl < 0 ? 'negative' : '']">
            {{ formatPnl(bt.pnl) }}
          </span>
          <span>
            <span :class="['status-badge', `status-${bt.status}`]">
              {{ bt.status }}
            </span>
          </span>
          <span class="cell-muted">{{ bt.ranAt }}</span>
        </NuxtLink>
      </div>

      <div v-else class="empty-state">
        <p>No backtests yet.</p>
        <NuxtLink to="/dashboard/backtests/new" class="empty-state-link">
          Run your first backtest →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* =========================================================
   PAGE HEADER
   ========================================================= */

.dashboard-page {
  display: flex;
  flex-direction: column;

  gap: 2.5rem;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 1.5rem;
}

.page-eyebrow {
  margin-bottom: 0.4rem;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.68rem;

  letter-spacing: 1px;
}

.page-title {
  margin: 0;

  color: var(--text-main);

  font-size: 1.75rem;
  font-weight: 700;

  letter-spacing: 0.2px;
}

.primary-button {
  flex-shrink: 0;

  padding: 0.65rem 1.1rem;

  color: var(--bg-card);

  background-color: var(--text-main);

  font-family: monospace;

  font-size: 0.72rem;
  font-weight: 700;

  letter-spacing: 0.6px;

  text-decoration: none;

  transition: background-color 0.2s ease;
}

.primary-button:hover {
  background-color: var(--accent-color);
}


/* =========================================================
   HERO CARDS (SPY price + biggest mover)
   ========================================================= */

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;

  gap: 1px;

  background-color: var(--border-color);

  border: 1px solid var(--border-color);
}

.hero-card {
  display: flex;
  flex-direction: column;

  gap: 0.9rem;

  padding: 1.5rem 1.75rem;

  background-color: var(--bg-card);
}

.hero-card--accent {
  border-left: 2px solid var(--accent-color);
}

.hero-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-eyebrow {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.68rem;

  letter-spacing: 1px;
}

.market-badge {
  padding: 0.15rem 0.5rem;

  font-family: monospace;

  font-size: 0.62rem;

  letter-spacing: 0.6px;
}

.market-open {
  color: #3a9a5c;

  border: 1px solid #3a9a5c;
}

.market-closed {
  color: var(--text-muted);

  border: 1px solid var(--border-color);
}

.hero-price-row {
  display: flex;
  align-items: baseline;

  gap: 0.75rem;
}

.hero-price {
  color: var(--text-main);

  font-family: monospace;

  font-size: 2.5rem;
  font-weight: 700;
}

.hero-change {
  font-family: monospace;

  font-size: 0.95rem;
  font-weight: 600;
}

.hero-change.positive {
  color: #3a9a5c;
}

.hero-change.negative {
  color: #c0473f;
}

.hero-footer {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.72rem;
}

.hero-footer-dot {
  margin: 0 0.4rem;
}


/* =========================================================
   BIGGEST MOVER CARD
   ========================================================= */

.mover-main-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.mover-label {
  color: var(--text-main);

  font-size: 1.3rem;
  font-weight: 700;
}

.mover-pnl-pct {
  color: var(--accent-color);

  font-family: monospace;

  font-size: 2rem;
  font-weight: 700;
}

.mover-detail-row {
  display: flex;
  align-items: center;

  gap: 1rem;
}

.mover-detail {
  display: flex;
  flex-direction: column;

  gap: 0.25rem;
}

.mover-detail--pnl {
  margin-left: auto;

  align-items: flex-end;
}

.mover-detail-label {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.6rem;

  letter-spacing: 1px;
}

.mover-detail-value {
  color: var(--text-main);

  font-family: monospace;

  font-size: 0.9rem;
  font-weight: 700;
}

.mover-detail-value.positive {
  color: #3a9a5c;
}

.mover-arrow {
  color: var(--text-muted);

  font-size: 1rem;
}

.mover-link {
  color: var(--accent-color);

  font-family: monospace;

  font-size: 0.72rem;
  font-weight: 700;

  letter-spacing: 0.3px;

  text-decoration: none;
}

.mover-link:hover {
  text-decoration: underline;
}


/* =========================================================
   TOP MOVERS LIST
   ========================================================= */

.movers-list {
  border: 1px solid var(--border-color);
}

.movers-row {
  display: grid;
  grid-template-columns: 2rem 1.2fr 1.6fr 1fr;
  align-items: center;

  gap: 1rem;

  padding: 0.7rem 1.25rem;

  font-size: 0.85rem;

  border-bottom: 1px solid var(--border-color);
}

.movers-row:last-child {
  border-bottom: none;
}

.movers-rank {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.78rem;
}

.movers-symbol {
  font-size: 0.72rem;
}

.movers-pnl {
  font-family: monospace;
  font-weight: 700;

  text-align: right;
}

.movers-pnl.positive {
  color: #3a9a5c;
}


/* =========================================================
   STAT CARDS
   ========================================================= */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 1px;

  background-color: var(--border-color);

  border: 1px solid var(--border-color);
}

.stat-card {
  padding: 1.25rem 1.5rem;

  background-color: var(--bg-card);
}

.stat-label {
  margin-bottom: 0.6rem;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.62rem;

  letter-spacing: 1px;
}

.stat-value {
  color: var(--text-main);

  font-family: monospace;

  font-size: 1.6rem;
  font-weight: 700;
}


/* =========================================================
   SECTION
   ========================================================= */

.section {
  display: flex;
  flex-direction: column;

  gap: 1rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-title {
  color: var(--text-main);

  font-size: 1.05rem;
  font-weight: 700;
}

.section-link {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.68rem;

  letter-spacing: 0.4px;

  text-decoration: none;

  transition: color 0.2s ease;
}

.section-link:hover {
  color: var(--accent-color);
}


/* =========================================================
   BACKTEST TABLE
   ========================================================= */

.backtest-table {
  border: 1px solid var(--border-color);
}

.table-row {
  display: grid;
  grid-template-columns: 1.4fr 0.7fr 1.4fr 0.9fr 0.8fr 0.8fr;
  align-items: center;

  gap: 1rem;

  padding: 0.85rem 1.25rem;

  color: var(--text-main);

  font-size: 0.82rem;

  text-decoration: none;

  border-bottom: 1px solid var(--border-color);

  transition: background-color 0.2s ease;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:not(.table-row--head):hover {
  background-color: var(--bg-main);
}

.table-row--head {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.62rem;

  letter-spacing: 1px;
}

.cell-strong {
  font-weight: 600;
}

.cell-muted {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.75rem;
}

.cell-pnl {
  font-family: monospace;
  font-weight: 700;
}

.cell-pnl.positive {
  color: #3a9a5c;
}

.cell-pnl.negative {
  color: #c0473f;
}

.status-badge {
  padding: 0.2rem 0.5rem;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.6rem;

  letter-spacing: 0.6px;
  text-transform: uppercase;

  border: 1px solid var(--border-color);
}

.status-complete {
  color: var(--text-main);
}

.status-running {
  color: var(--accent-color);

  border-color: var(--accent-color);
}


/* =========================================================
   EMPTY STATE
   ========================================================= */

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 0.6rem;

  padding: 2.5rem 1.5rem;

  color: var(--text-muted);

  font-size: 0.88rem;

  border: 1px solid var(--border-color);
}

.empty-state-link {
  color: var(--text-main);

  font-family: monospace;

  font-size: 0.72rem;
  font-weight: 700;

  letter-spacing: 0.4px;

  text-decoration: none;
}

.empty-state-link:hover {
  color: var(--accent-color);
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .table-row {
    grid-template-columns: 1.2fr 0.6fr 1fr 0.8fr;
  }

  .table-row span:nth-child(5),
  .table-row span:nth-child(6) {
    display: none;
  }

  .movers-row {
    grid-template-columns: 2rem 1fr 1fr;
  }

  .movers-symbol {
    display: none;
  }
}

@media (max-width: 600px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .table-row {
    grid-template-columns: 1fr 1fr;
  }

  .table-row span:nth-child(3),
  .table-row span:nth-child(4) {
    display: none;
  }

  .mover-detail-row {
    flex-wrap: wrap;
  }

  .mover-detail--pnl {
    margin-left: 0;

    align-items: flex-start;
  }
}
</style>