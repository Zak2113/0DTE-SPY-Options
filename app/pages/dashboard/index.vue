<!-- app/pages/dashboard/index.vue -->

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'authenticated',
})

const { user } = useUserSession()

// Placeholder data — replace with real API calls once the backend job/results
// endpoints exist (e.g. GET /api/backtests, GET /api/stats).
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

  font-size: 0.6rem;

  letter-spacing: 1px;
}

.page-title {
  margin: 0;

  color: var(--text-main);

  font-size: 1.5rem;
  font-weight: 700;

  letter-spacing: 0.2px;
}

.primary-button {
  flex-shrink: 0;

  padding: 0.65rem 1.1rem;

  color: var(--bg-card);

  background-color: var(--text-main);

  font-family: monospace;

  font-size: 0.65rem;
  font-weight: 700;

  letter-spacing: 0.6px;

  text-decoration: none;

  transition: background-color 0.2s ease;
}

.primary-button:hover {
  background-color: var(--accent-color);
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

  font-size: 0.55rem;

  letter-spacing: 1px;
}

.stat-value {
  color: var(--text-main);

  font-family: monospace;

  font-size: 1.4rem;
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

  font-size: 0.95rem;
  font-weight: 700;
}

.section-link {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.6rem;

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

  font-size: 0.75rem;

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

  font-size: 0.55rem;

  letter-spacing: 1px;
}

.cell-strong {
  font-weight: 600;
}

.cell-muted {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.68rem;
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

  font-size: 0.55rem;

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

  font-size: 0.8rem;

  border: 1px solid var(--border-color);
}

.empty-state-link {
  color: var(--text-main);

  font-family: monospace;

  font-size: 0.65rem;
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
}
</style>