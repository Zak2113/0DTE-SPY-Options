<!-- app/pages/admin/index.vue -->

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

const kpis = [
  {
    label: 'Total Revenue (MRR)',
    value: '$14,250',
    change: '+12.4%',
    isPositive: true,
  },
  {
    label: 'Total Accounts',
    value: '1,842',
    change: '+8.1%',
    isPositive: true,
  },
  {
    label: 'Active (30d)',
    value: '1,120',
    change: '+3.2%',
    isPositive: true,
  },
  {
    label: 'Churn Rate',
    value: '1.4%',
    change: '-0.3%',
    isPositive: true,
  },
]

const recentSignups = [
  {
    name: 'Alex Rivera',
    email: 'alex@acme.corp',
    tier: 'PRO',
    time: '12m ago',
  },
  {
    name: 'Sarah Chen',
    email: 'sarah.c@dev.io',
    tier: 'ESSENTIAL',
    time: '45m ago',
  },
  {
    name: 'Marcus Bell',
    email: 'mbell@studio.design',
    tier: 'BASIC',
    time: '2h ago',
  },
]

const subscriptionDistribution = [
  {
    label: 'Basic',
    users: '1,240 users',
    percentage: 67,
    className: 'basic',
  },
  {
    label: 'Essential',
    users: '482 users',
    percentage: 26,
    className: 'essential',
  },
  {
    label: 'Pro',
    users: '120 users',
    percentage: 7,
    className: 'pro',
  },
]
</script>

<template>
  <div class="overview-page">
    <!-- Page Header -->
    <section class="page-header">
      <div>
        <div class="eyebrow">
          ADMIN // PLATFORM OVERVIEW
        </div>

        <h1 class="page-title">
          Platform Overview.
        </h1>

        <p class="page-description">
          High-level business performance and platform vitals.
        </p>
      </div>

      <div class="header-status">
        <span class="status-dot"></span>
        LIVE DATA
      </div>
    </section>

    <!-- KPI Grid -->
    <section class="kpi-grid">
      <div
        v-for="kpi in kpis"
        :key="kpi.label"
        class="kpi-item"
      >
        <div class="kpi-label">
          {{ kpi.label }}
        </div>

        <div class="kpi-value">
          {{ kpi.value }}
        </div>

        <div
          class="kpi-change"
          :class="{
            positive: kpi.isPositive,
            negative: !kpi.isPositive,
          }"
        >
          {{ kpi.change }}

          <span>
            VS LAST MONTH
          </span>
        </div>
      </div>
    </section>

    <!-- Dashboard Grid -->
    <section class="dashboard-grid">
      <!-- Subscription Distribution -->
      <div class="panel distribution-panel">
        <div class="panel-header">
          <div>
            <div class="panel-eyebrow">
              SUBSCRIPTIONS
            </div>

            <h2 class="panel-title">
              Subscription Distribution
            </h2>
          </div>

          <div class="panel-total">
            1,842
          </div>
        </div>

        <div class="distribution-list">
          <div
            v-for="subscription in subscriptionDistribution"
            :key="subscription.label"
            class="distribution-item"
          >
            <div class="distribution-meta">
              <div class="distribution-name">
                {{ subscription.label }}

                <span>
                  ({{ subscription.users }})
                </span>
              </div>

              <div class="distribution-percentage">
                {{ subscription.percentage }}%
              </div>
            </div>

            <div class="distribution-track">
              <div
                class="distribution-bar"
                :class="subscription.className"
                :style="{
                  width: `${subscription.percentage}%`,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Registrations -->
      <div class="panel registrations-panel">
        <div class="panel-header">
          <div>
            <div class="panel-eyebrow">
              ACTIVITY
            </div>

            <h2 class="panel-title">
              Recent Registrations
            </h2>
          </div>

          <NuxtLink
            to="/admin/users"
            class="panel-link"
          >
            VIEW ALL →
          </NuxtLink>
        </div>

        <div class="registrations-list">
          <div
            v-for="user in recentSignups"
            :key="user.email"
            class="registration"
          >
            <div class="registration-main">
              <div class="registration-name">
                {{ user.name }}
              </div>

              <div class="registration-email">
                {{ user.email }}
              </div>
            </div>

            <div class="registration-meta">
              <span
                class="tier-badge"
                :class="{
                  'tier-basic': user.tier === 'BASIC',
                  'tier-essential': user.tier === 'ESSENTIAL',
                  'tier-pro': user.tier === 'PRO',
                }"
              >
                {{ user.tier }}
              </span>

              <span class="registration-time">
                {{ user.time }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- System Summary -->
    <section class="system-summary">
      <div class="summary-item">
        <span class="summary-label">
          PLATFORM STATUS
        </span>

        <span class="summary-value online">
          <span class="status-dot"></span>
          OPERATIONAL
        </span>
      </div>

      <div class="summary-divider"></div>

      <div class="summary-item">
        <span class="summary-label">
          ACTIVE ACCOUNTS
        </span>

        <span class="summary-value">
          1,120
        </span>
      </div>

      <div class="summary-divider"></div>

      <div class="summary-item">
        <span class="summary-label">
          30D RETENTION
        </span>

        <span class="summary-value">
          98.6%
        </span>
      </div>

      <div class="summary-divider"></div>

      <div class="summary-item">
        <span class="summary-label">
          DATA STATUS
        </span>

        <span class="summary-value">
          CURRENT
        </span>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* =========================================================
   PAGE
   ========================================================= */

.overview-page {
  width: 100%;

  padding-top: 4rem;
  padding-bottom: 5rem;
}


/* =========================================================
   PAGE HEADER
   ========================================================= */

.page-header {
  display: flex;

  align-items: flex-end;

  justify-content: space-between;

  gap: 2rem;

  margin-bottom: 2.5rem;

  padding-bottom: 2rem;

  border-bottom: 1px solid var(--border-color);
}

.eyebrow {
  margin-bottom: 0.9rem;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.65rem;

  letter-spacing: 1.4px;
}

.page-title {
  margin: 0 0 0.75rem;

  color: var(--text-main);

  font-size: 2.75rem;

  font-weight: 700;

  line-height: 1.1;

  letter-spacing: -1px;
}

.page-description {
  margin: 0;

  color: var(--text-muted);

  font-size: 0.95rem;

  line-height: 1.5;
}

.header-status {
  display: flex;

  align-items: center;

  gap: 0.5rem;

  padding-bottom: 0.25rem;

  color: #10b981;

  font-family: monospace;

  font-size: 0.62rem;

  font-weight: 600;

  letter-spacing: 0.8px;

  white-space: nowrap;
}


/* =========================================================
   STATUS DOT
   ========================================================= */

.status-dot {
  width: 6px;
  height: 6px;

  border-radius: 50%;

  background-color: #10b981;
}


/* =========================================================
   KPI GRID
   ========================================================= */

.kpi-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  margin-bottom: 2rem;

  border-top: 1px solid var(--border-color);

  border-bottom: 1px solid var(--border-color);
}

.kpi-item {
  min-height: 145px;

  padding: 1.35rem 1.5rem;

  border-right: 1px solid var(--border-color);
}

.kpi-item:last-child {
  border-right: none;
}

.kpi-label {
  margin-bottom: 0.7rem;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.62rem;

  letter-spacing: 0.8px;

  text-transform: uppercase;
}

.kpi-value {
  margin-bottom: 0.6rem;

  color: var(--text-main);

  font-size: 1.8rem;

  font-weight: 600;

  line-height: 1;

  font-variant-numeric: tabular-nums;
}

.kpi-change {
  font-family: monospace;

  font-size: 0.68rem;

  font-weight: 600;
}

.kpi-change.positive {
  color: #10b981;
}

.kpi-change.negative {
  color: #ef4444;
}

.kpi-change span {
  margin-left: 0.25rem;

  color: var(--text-muted);

  font-weight: 400;
}


/* =========================================================
   DASHBOARD GRID
   ========================================================= */

.dashboard-grid {
  display: grid;

  grid-template-columns:
    minmax(0, 2fr)
    minmax(320px, 1fr);

  gap: 1.5rem;

  margin-bottom: 2rem;
}


/* =========================================================
   PANELS
   ========================================================= */

.panel {
  min-width: 0;

  background-color: var(--bg-card);

  border: 1px solid var(--border-color);
}

.panel-header {
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 1rem;

  padding: 1.35rem 1.5rem;

  border-bottom: 1px solid var(--border-color);
}

.panel-eyebrow {
  margin-bottom: 0.35rem;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.58rem;

  letter-spacing: 1px;
}

.panel-title {
  margin: 0;

  color: var(--text-main);

  font-size: 1rem;

  font-weight: 600;
}

.panel-total {
  color: var(--text-main);

  font-family: monospace;

  font-size: 0.75rem;

  font-weight: 600;
}

.panel-link {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.58rem;

  letter-spacing: 0.7px;

  text-decoration: none;

  white-space: nowrap;

  transition: color 0.2s ease;
}

.panel-link:hover {
  color: var(--accent-color);
}


/* =========================================================
   SUBSCRIPTION DISTRIBUTION
   ========================================================= */

.distribution-list {
  display: flex;

  flex-direction: column;

  gap: 1.5rem;

  padding: 1.5rem;
}

.distribution-item {
  width: 100%;
}

.distribution-meta {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 1rem;

  margin-bottom: 0.5rem;
}

.distribution-name {
  color: var(--text-main);

  font-size: 0.82rem;

  font-weight: 500;
}

.distribution-name span {
  color: var(--text-muted);

  font-weight: 400;
}

.distribution-percentage {
  color: var(--text-main);

  font-family: monospace;

  font-size: 0.7rem;

  font-weight: 600;
}

.distribution-track {
  width: 100%;

  height: 6px;

  overflow: hidden;

  background-color: var(--bg-main);

  border: 1px solid var(--border-color);
}

.distribution-bar {
  height: 100%;
}

.distribution-bar.basic {
  background-color: #94a3b8;
}

.distribution-bar.essential {
  background-color: #10b981;
}

.distribution-bar.pro {
  background-color: var(--accent-color);
}


/* =========================================================
   RECENT REGISTRATIONS
   ========================================================= */

.registrations-list {
  display: flex;

  flex-direction: column;

  padding: 0 1.5rem;
}

.registration {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 1rem;

  padding: 1rem 0;

  border-bottom: 1px solid var(--border-color);
}

.registration:last-child {
  border-bottom: none;
}

.registration-main {
  min-width: 0;
}

.registration-name {
  margin-bottom: 0.25rem;

  overflow: hidden;

  color: var(--text-main);

  font-size: 0.8rem;

  font-weight: 600;

  text-overflow: ellipsis;

  white-space: nowrap;
}

.registration-email {
  overflow: hidden;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.6rem;

  text-overflow: ellipsis;

  white-space: nowrap;
}

.registration-meta {
  display: flex;

  flex-direction: column;

  align-items: flex-end;

  gap: 0.35rem;

  flex-shrink: 0;
}

.tier-badge {
  padding: 0.25rem 0.45rem;

  border: 1px solid var(--border-color);

  font-family: monospace;

  font-size: 0.58rem;

  font-weight: 600;

  letter-spacing: 0.5px;
}

.tier-basic {
  color: var(--text-muted);

  background-color: var(--bg-main);
}

.tier-essential {
  color: #166534;

  background-color: #dcfce7;

  border-color: #bbf7d0;
}

.tier-pro {
  color: #1d4ed8;

  background-color: #dbeafe;

  border-color: #bfdbfe;
}

.registration-time {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.58rem;
}


/* =========================================================
   SYSTEM SUMMARY
   ========================================================= */

.system-summary {
  display: flex;

  align-items: center;

  min-height: 70px;

  padding: 0 1.5rem;

  background-color: var(--bg-card);

  border-top: 1px solid var(--border-color);

  border-bottom: 1px solid var(--border-color);
}

.summary-item {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 1rem;

  flex: 1;

  padding: 0 1rem;
}

.summary-item:first-child {
  padding-left: 0;
}

.summary-item:last-child {
  padding-right: 0;
}

.summary-label {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.57rem;

  letter-spacing: 0.8px;

  white-space: nowrap;
}

.summary-value {
  display: flex;

  align-items: center;

  gap: 0.4rem;

  color: var(--text-main);

  font-family: monospace;

  font-size: 0.65rem;

  font-weight: 600;

  white-space: nowrap;
}

.summary-value.online {
  color: #10b981;
}

.summary-divider {
  width: 1px;

  height: 28px;

  flex-shrink: 0;

  background-color: var(--border-color);
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1050px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .kpi-item:nth-child(2) {
    border-right: none;
  }

  .kpi-item:nth-child(-n + 2) {
    border-bottom: 1px solid var(--border-color);
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}


@media (max-width: 750px) {
  .overview-page {
    padding-top: 3rem;

    padding-bottom: 4rem;
  }

  .page-header {
    align-items: flex-start;

    flex-direction: column;

    margin-bottom: 2rem;
  }

  .page-title {
    font-size: 2.3rem;
  }

  .kpi-grid {
    grid-template-columns: 1fr;
  }

  .kpi-item {
    border-right: none;

    border-bottom: 1px solid var(--border-color);
  }

  .kpi-item:last-child {
    border-bottom: none;
  }

  .system-summary {
    align-items: stretch;

    flex-direction: column;

    padding: 0;
  }

  .summary-item {
    min-height: 55px;

    padding: 0 1rem !important;

    border-bottom: 1px solid var(--border-color);
  }

  .summary-item:last-child {
    border-bottom: none;
  }

  .summary-divider {
    display: none;
  }
}


@media (max-width: 500px) {
  .page-title {
    font-size: 2rem;
  }

  .panel-header {
    padding: 1.1rem;
  }

  .distribution-list {
    padding: 1.1rem;
  }

  .registrations-list {
    padding: 0 1.1rem;
  }

  .registration {
    align-items: flex-start;

    flex-direction: column;
  }

  .registration-meta {
    align-items: flex-start;

    flex-direction: row;

    width: 100%;
  }
}
</style>