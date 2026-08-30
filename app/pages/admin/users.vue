<!-- app/pages/admin/users.vue -->
<script setup lang="ts">
definePageMeta({ layout: 'admin' , middleware: ['admin']})

const searchQuery = ref('')
const selectedStatus = ref('All Users')
const selectedPlan = ref('All Plans')

const users = ref([
  {
    id: 'usr_8f29a1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    initials: 'AJ',
    plan: 'Pro',
    hasSubscription: true,
    joined: 'Aug 24, 2026',
    lastActive: '12 min ago',
    backtests: 142,
    strategies: 18,
    dataQueries: 842,
    status: 'Active',
  },
  {
    id: 'usr_4c72bd',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    initials: 'SW',
    plan: 'Pro',
    hasSubscription: true,
    joined: 'Aug 21, 2026',
    lastActive: '34 min ago',
    backtests: 87,
    strategies: 11,
    dataQueries: 491,
    status: 'Active',
  },
  {
    id: 'usr_91d4ef',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    initials: 'MC',
    plan: 'Free',
    hasSubscription: false,
    joined: 'Aug 19, 2026',
    lastActive: '2 hrs ago',
    backtests: 24,
    strategies: 4,
    dataQueries: 108,
    status: 'Active',
  },
  {
    id: 'usr_3a81cd',
    name: 'Daniel Brooks',
    email: 'daniel.brooks@example.com',
    initials: 'DB',
    plan: 'Pro',
    hasSubscription: true,
    joined: 'Aug 16, 2026',
    lastActive: 'Yesterday',
    backtests: 312,
    strategies: 29,
    dataQueries: 1824,
    status: 'Active',
  },
  {
    id: 'usr_72e4fa',
    name: 'Emily Carter',
    email: 'emily.carter@example.com',
    initials: 'EC',
    plan: 'Free',
    hasSubscription: false,
    joined: 'Aug 14, 2026',
    lastActive: 'Yesterday',
    backtests: 9,
    strategies: 2,
    dataQueries: 42,
    status: 'Active',
  },
  {
    id: 'usr_5b93ae',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    initials: 'JW',
    plan: 'Pro',
    hasSubscription: true,
    joined: 'Aug 11, 2026',
    lastActive: '2 days ago',
    backtests: 218,
    strategies: 16,
    dataQueries: 1102,
    status: 'Active',
  },
  {
    id: 'usr_18cd72',
    name: 'Chris Taylor',
    email: 'chris.taylor@example.com',
    initials: 'CT',
    plan: 'Free',
    hasSubscription: false,
    joined: 'Aug 8, 2026',
    lastActive: '3 days ago',
    backtests: 17,
    strategies: 3,
    dataQueries: 73,
    status: 'Active',
  },
  {
    id: 'usr_64af21',
    name: 'Ryan Anderson',
    email: 'ryan.anderson@example.com',
    initials: 'RA',
    plan: 'Pro',
    hasSubscription: true,
    joined: 'Aug 3, 2026',
    lastActive: '5 days ago',
    backtests: 456,
    strategies: 41,
    dataQueries: 2914,
    status: 'Active',
  },
])

const selectedUser = ref<(typeof users.value)[number] | null>(null)

const stats = computed(() => {
  const total = users.value.length
  const activeSubscriptions = users.value.filter(
    user => user.hasSubscription,
  ).length

  const noSubscription = total - activeSubscriptions

  const activeRecently = users.value.filter(user => {
    return [
      '12 min ago',
      '34 min ago',
      '2 hrs ago',
      'Yesterday',
    ].includes(user.lastActive)
  }).length

  return {
    total,
    activeSubscriptions,
    noSubscription,
    activeRecently,
  }
})

const filteredUsers = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return users.value.filter(user => {
    const matchesSearch =
      !query ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.id.toLowerCase().includes(query)

    const matchesStatus =
      selectedStatus.value === 'All Users' ||
      (selectedStatus.value === 'Subscribed' && user.hasSubscription) ||
      (selectedStatus.value === 'No Subscription' && !user.hasSubscription)

    const matchesPlan =
      selectedPlan.value === 'All Plans' ||
      user.plan === selectedPlan.value

    return matchesSearch && matchesStatus && matchesPlan
  })
})

function selectUser(user: (typeof users.value)[number]) {
  selectedUser.value = user
}

function closeUser() {
  selectedUser.value = null
}

function toggleSubscription(user: (typeof users.value)[number]) {
  user.hasSubscription = !user.hasSubscription
  user.plan = user.hasSubscription ? 'Pro' : 'Free'
}

function suspendUser(user: (typeof users.value)[number]) {
  user.status = user.status === 'Suspended' ? 'Active' : 'Suspended'
}

function exportUsers() {
  console.log('Exporting users:', filteredUsers.value)
}
</script>

<template>
  <div class="admin-page">
    <!-- Page Header -->
    <header class="page-header">
      <div>
        <div class="eyebrow">USERS</div>

        <h1>User Management</h1>

        <p>
          View, manage, and monitor user accounts and subscriptions.
        </p>
      </div>

      <button
        class="secondary-button header-button"
        type="button"
        @click="exportUsers"
      >
        Export Users
      </button>
    </header>

    <!-- User Stats -->
    <section class="section">
      <div class="stats-grid">
        <article class="stat-card">
          <div class="stat-label">
            TOTAL USERS
          </div>

          <div class="stat-value">
            {{ stats.total.toLocaleString() }}
          </div>

          <div class="stat-detail">
            Registered accounts
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-label">
            ACTIVE SUBSCRIPTIONS
          </div>

          <div class="stat-value">
            {{ stats.activeSubscriptions.toLocaleString() }}
          </div>

          <div class="stat-detail">
            Users with active access
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-label">
            NO SUBSCRIPTION
          </div>

          <div class="stat-value">
            {{ stats.noSubscription.toLocaleString() }}
          </div>

          <div class="stat-detail">
            Free accounts
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-label">
            RECENTLY ACTIVE
          </div>

          <div class="stat-value">
            {{ stats.activeRecently.toLocaleString() }}
          </div>

          <div class="stat-detail">
            Active within the last day
          </div>
        </article>
      </div>
    </section>

    <!-- User List -->
    <section class="section">
      <article class="panel">
        <!-- Toolbar -->
        <div class="user-toolbar">
          <div class="search-wrapper">
            <svg
              class="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7"></circle>
              <path d="m20 20-4-4"></path>
            </svg>

            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search users..."
              aria-label="Search users"
            />
          </div>

          <div class="filter-group">
            <select
              v-model="selectedStatus"
              aria-label="Filter by subscription"
            >
              <option>All Users</option>
              <option>Subscribed</option>
              <option>No Subscription</option>
            </select>

            <select
              v-model="selectedPlan"
              aria-label="Filter by plan"
            >
              <option>All Plans</option>
              <option>Free</option>
              <option>Pro</option>
            </select>
          </div>
        </div>

        <!-- Table Header -->
        <div class="user-table">
          <div class="table-header">
            <div>User</div>
            <div>Subscription</div>
            <div>Usage</div>
            <div>Last Active</div>
            <div></div>
          </div>

          <!-- Users -->
          <button
            v-for="user in filteredUsers"
            :key="user.id"
            class="user-row"
            type="button"
            @click="selectUser(user)"
          >
            <div class="user-cell">
              <div class="avatar">
                {{ user.initials }}
              </div>

              <div class="user-information">
                <div class="user-name">
                  {{ user.name }}
                </div>

                <div class="user-email">
                  {{ user.email }}
                </div>
              </div>
            </div>

            <div class="subscription-cell">
              <span
                class="subscription-badge"
                :class="{
                  subscribed: user.hasSubscription,
                  none: !user.hasSubscription,
                }"
              >
                <span class="status-dot"></span>

                {{
                  user.hasSubscription
                    ? 'Active'
                    : 'No Subscription'
                }}
              </span>

              <span class="plan-name">
                {{ user.plan }}
              </span>
            </div>

            <div class="usage-cell">
              <strong>{{ user.backtests }}</strong>
              <span>backtests</span>
            </div>

            <div class="last-active">
              {{ user.lastActive }}
            </div>

            <div class="row-action">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </div>
          </button>

          <!-- Empty State -->
          <div
            v-if="filteredUsers.length === 0"
            class="empty-state"
          >
            <div class="empty-title">
              No users found
            </div>

            <div class="empty-description">
              Try adjusting your search or filters.
            </div>
          </div>
        </div>

        <!-- Table Footer -->
        <div class="table-footer">
          <span>
            Showing {{ filteredUsers.length }} of {{ users.length }} users
          </span>

          <div class="pagination">
            <button
              class="pagination-button"
              type="button"
              disabled
            >
              Previous
            </button>

            <span class="page-number">
              1
            </span>

            <button
              class="pagination-button"
              type="button"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </article>
    </section>

    <!-- User Detail Overlay -->
    <Transition name="drawer">
      <div
        v-if="selectedUser"
        class="drawer-backdrop"
        @click.self="closeUser"
      >
        <aside class="user-drawer">
          <!-- Drawer Header -->
          <div class="drawer-header">
            <button
              class="close-button"
              type="button"
              aria-label="Close user details"
              @click="closeUser"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>

            <div class="drawer-user">
              <div class="drawer-avatar">
                {{ selectedUser.initials }}
              </div>

              <div>
                <h2>{{ selectedUser.name }}</h2>

                <p>{{ selectedUser.email }}</p>

                <div class="drawer-user-meta">
                  <span
                    class="subscription-badge"
                    :class="{
                      subscribed: selectedUser.hasSubscription,
                      none: !selectedUser.hasSubscription,
                    }"
                  >
                    <span class="status-dot"></span>

                    {{
                      selectedUser.hasSubscription
                        ? 'Active Subscription'
                        : 'No Subscription'
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Drawer Body -->
          <div class="drawer-body">
            <!-- Account -->
            <section class="drawer-section">
              <div class="drawer-section-label">
                ACCOUNT
              </div>

              <div class="detail-list">
                <div class="detail-row">
                  <span>User ID</span>
                  <strong>{{ selectedUser.id }}</strong>
                </div>

                <div class="detail-row">
                  <span>Plan</span>
                  <strong>{{ selectedUser.plan }}</strong>
                </div>

                <div class="detail-row">
                  <span>Joined</span>
                  <strong>{{ selectedUser.joined }}</strong>
                </div>

                <div class="detail-row">
                  <span>Status</span>
                  <strong
                    :class="{
                      'text-danger': selectedUser.status === 'Suspended',
                    }"
                  >
                    {{ selectedUser.status }}
                  </strong>
                </div>
              </div>
            </section>

            <!-- Subscription -->
            <section class="drawer-section">
              <div class="drawer-section-label">
                SUBSCRIPTION
              </div>

              <div class="subscription-card">
                <div class="subscription-card-header">
                  <div>
                    <div class="subscription-card-title">
                      {{ selectedUser.hasSubscription ? 'Pro' : 'Free' }}
                    </div>

                    <div class="subscription-card-description">
                      {{
                        selectedUser.hasSubscription
                          ? 'Active subscription'
                          : 'No active subscription'
                      }}
                    </div>
                  </div>

                  <span
                    class="subscription-indicator"
                    :class="{
                      active: selectedUser.hasSubscription,
                    }"
                  >
                    {{ selectedUser.hasSubscription ? 'ACTIVE' : 'NONE' }}
                  </span>
                </div>

                <div
                  v-if="selectedUser.hasSubscription"
                  class="subscription-details"
                >
                  <div>
                    <span>Billing</span>
                    <strong>$29 / month</strong>
                  </div>

                  <div>
                    <span>Provider</span>
                    <strong>Stripe</strong>
                  </div>
                </div>
              </div>
            </section>

            <!-- Usage -->
            <section class="drawer-section">
              <div class="drawer-section-label">
                USAGE
              </div>

              <div class="usage-grid">
                <div class="usage-card">
                  <strong>
                    {{ selectedUser.backtests.toLocaleString() }}
                  </strong>

                  <span>Backtests</span>
                </div>

                <div class="usage-card">
                  <strong>
                    {{ selectedUser.strategies.toLocaleString() }}
                  </strong>

                  <span>Strategies</span>
                </div>

                <div class="usage-card">
                  <strong>
                    {{ selectedUser.dataQueries.toLocaleString() }}
                  </strong>

                  <span>Data Queries</span>
                </div>
              </div>
            </section>

            <!-- Activity -->
            <section class="drawer-section">
              <div class="drawer-section-label">
                RECENT ACTIVITY
              </div>

              <div class="activity-list">
                <div class="activity-row">
                  <div class="activity-dot"></div>

                  <div>
                    <div class="activity-title">
                      Backtest executed
                    </div>

                    <div class="activity-time">
                      12 minutes ago
                    </div>
                  </div>
                </div>

                <div class="activity-row">
                  <div class="activity-dot"></div>

                  <div>
                    <div class="activity-title">
                      Strategy saved
                    </div>

                    <div class="activity-time">
                      24 minutes ago
                    </div>
                  </div>
                </div>

                <div class="activity-row">
                  <div class="activity-dot"></div>

                  <div>
                    <div class="activity-title">
                      Logged in
                    </div>

                    <div class="activity-time">
                      {{ selectedUser.lastActive }}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Drawer Actions -->
          <div class="drawer-actions">
            <button
              class="secondary-button"
              type="button"
              @click="toggleSubscription(selectedUser)"
            >
              {{
                selectedUser.hasSubscription
                  ? 'Remove Subscription'
                  : 'Grant Subscription'
              }}
            </button>

            <button
              class="danger-button"
              type="button"
              @click="suspendUser(selectedUser)"
            >
              {{
                selectedUser.status === 'Suspended'
                  ? 'Unsuspend User'
                  : 'Suspend User'
              }}
            </button>
          </div>
        </aside>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* =========================================================
   PAGE
   ========================================================= */

.admin-page {
  width: 100%;
  color: var(--text-main);
}


/* =========================================================
   HEADER
   ========================================================= */

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
}

.eyebrow,
.section-label,
.drawer-section-label {
  color: var(--text-muted);
  font-family: monospace;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 1.1px;
  text-transform: uppercase;
}

.page-header h1 {
  margin: 0.35rem 0 0;
  color: var(--text-main);
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.page-header p {
  margin: 0.35rem 0 0;
  color: var(--text-muted);
  font-size: 0.85rem;
}


/* =========================================================
   SECTIONS
   ========================================================= */

.section {
  margin-bottom: 1.5rem;
}


/* =========================================================
   BUTTONS
   ========================================================= */

.primary-button,
.secondary-button,
.danger-button {
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

.secondary-button {
  border: 1px solid var(--border-color);
  background: var(--bg-main);
  color: var(--text-main);
}

.secondary-button:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.danger-button {
  border: 1px solid #fecaca;
  background: #fef2f2;
  color: #dc2626;
}

.danger-button:hover {
  border-color: #fca5a5;
  background: #fee2e2;
}

.header-button {
  flex-shrink: 0;
}


/* =========================================================
   STATS
   ========================================================= */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.stat-card {
  padding: 1.15rem 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 6px;
}

.stat-label {
  color: var(--text-muted);
  font-family: monospace;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.8px;
}

.stat-value {
  margin-top: 0.5rem;
  color: var(--text-main);
  font-size: 1.45rem;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.stat-detail {
  margin-top: 0.4rem;
  color: var(--text-muted);
  font-size: 0.72rem;
}


/* =========================================================
   PANEL
   ========================================================= */

.panel {
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 6px;
}


/* =========================================================
   TOOLBAR
   ========================================================= */

.user-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 360px;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 0.7rem;
  width: 15px;
  height: 15px;
  color: var(--text-muted);
  transform: translateY(-50%);
  pointer-events: none;
}

.search-wrapper input {
  width: 100%;
  height: 36px;
  box-sizing: border-box;
  padding: 0 0.75rem 0 2.1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-main);
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.76rem;
  outline: none;
  transition: border-color 0.15s ease;
}

.search-wrapper input::placeholder {
  color: var(--text-muted);
  opacity: 0.75;
}

.search-wrapper input:focus {
  border-color: var(--accent-color);
}

.filter-group {
  display: flex;
  gap: 0.5rem;
}

.filter-group select {
  height: 36px;
  min-width: 145px;
  padding: 0 0.65rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-main);
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.72rem;
  outline: none;
  cursor: pointer;
}

.filter-group select:focus {
  border-color: var(--accent-color);
}


/* =========================================================
   USER TABLE
   ========================================================= */

.user-table {
  width: 100%;
}

.table-header,
.user-row {
  display: grid;
  grid-template-columns: minmax(250px, 2fr) 1.25fr 0.8fr 0.9fr 30px;
  align-items: center;
  column-gap: 1rem;
  padding: 0 1.25rem;
}

.table-header {
  min-height: 38px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-muted);
  font-family: monospace;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.7px;
  text-transform: uppercase;
}

.user-row {
  width: 100%;
  min-height: 68px;
  border: none;
  border-bottom: 1px solid var(--border-color);
  background: transparent;
  color: inherit;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.12s ease;
}

.user-row:last-child {
  border-bottom: none;
}

.user-row:hover {
  background: color-mix(
    in srgb,
    var(--accent-color) 3%,
    var(--bg-card)
  );
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.avatar,
.drawer-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--bg-main);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  font-family: monospace;
  font-weight: 600;
}

.avatar {
  width: 32px;
  height: 32px;
  font-size: 0.62rem;
}

.user-information {
  min-width: 0;
}

.user-name {
  overflow: hidden;
  color: var(--text-main);
  font-size: 0.78rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-email {
  overflow: hidden;
  margin-top: 0.18rem;
  color: var(--text-muted);
  font-size: 0.69rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.subscription-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
}

.subscription-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: monospace;
  font-size: 0.61rem;
  font-weight: 600;
  letter-spacing: 0.2px;
  text-transform: uppercase;
}

.subscription-badge.subscribed {
  color: #16a34a;
}

.subscription-badge.none {
  color: var(--text-muted);
}

.status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.plan-name {
  color: var(--text-muted);
  font-size: 0.67rem;
}

.usage-cell {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.usage-cell strong {
  color: var(--text-main);
  font-size: 0.78rem;
}

.usage-cell span {
  color: var(--text-muted);
  font-size: 0.65rem;
}

.last-active {
  color: var(--text-muted);
  font-size: 0.7rem;
}

.row-action {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: var(--text-muted);
}

.row-action svg {
  width: 15px;
  height: 15px;
}

.user-row:hover .row-action {
  color: var(--accent-color);
}


/* =========================================================
   EMPTY STATE
   ========================================================= */

.empty-state {
  padding: 3rem 1.25rem;
  text-align: center;
}

.empty-title {
  color: var(--text-main);
  font-size: 0.8rem;
  font-weight: 600;
}

.empty-description {
  margin-top: 0.3rem;
  color: var(--text-muted);
  font-size: 0.72rem;
}


/* =========================================================
   TABLE FOOTER
   ========================================================= */

.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1.25rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-muted);
  font-size: 0.68rem;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.pagination-button {
  height: 28px;
  padding: 0 0.6rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-main);
  color: var(--text-muted);
  font-family: inherit;
  font-size: 0.65rem;
}

.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.page-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: var(--accent-color);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 600;
}


/* =========================================================
   DRAWER
   ========================================================= */

.drawer-backdrop {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: flex;
  justify-content: flex-end;
  background: rgb(0 0 0 / 35%);
}

.user-drawer {
  display: flex;
  width: min(460px, 100%);
  height: 100%;
  flex-direction: column;
  background: var(--bg-card);
  border-left: 1px solid var(--border-color);
  box-shadow: -12px 0 40px rgb(0 0 0 / 12%);
}


/* =========================================================
   DRAWER HEADER
   ========================================================= */

.drawer-header {
  position: relative;
  padding: 1.5rem 1.5rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-main);
  color: var(--text-muted);
  cursor: pointer;
}

.close-button:hover {
  color: var(--text-main);
  border-color: var(--text-muted);
}

.close-button svg {
  width: 15px;
  height: 15px;
}

.drawer-user {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-right: 2rem;
}

.drawer-avatar {
  width: 44px;
  height: 44px;
  font-size: 0.72rem;
}

.drawer-user h2 {
  margin: 0;
  color: var(--text-main);
  font-size: 1rem;
  font-weight: 600;
}

.drawer-user p {
  margin: 0.25rem 0 0;
  color: var(--text-muted);
  font-size: 0.72rem;
}

.drawer-user-meta {
  margin-top: 0.5rem;
}


/* =========================================================
   DRAWER BODY
   ========================================================= */

.drawer-body {
  flex: 1;
  padding: 1.25rem 1.5rem;
  overflow-y: auto;
}

.drawer-section {
  margin-bottom: 1.5rem;
}

.drawer-section:last-child {
  margin-bottom: 0;
}

.drawer-section-label {
  margin-bottom: 0.7rem;
}


/* =========================================================
   DETAILS
   ========================================================= */

.detail-list {
  border: 1px solid var(--border-color);
  border-radius: 5px;
}

.detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 38px;
  padding: 0 0.8rem;
  border-bottom: 1px solid var(--border-color);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row span {
  color: var(--text-muted);
  font-size: 0.7rem;
}

.detail-row strong {
  color: var(--text-main);
  font-family: monospace;
  font-size: 0.68rem;
  font-weight: 500;
  text-align: right;
}

.text-danger {
  color: #dc2626 !important;
}


/* =========================================================
   SUBSCRIPTION
   ========================================================= */

.subscription-card {
  padding: 0.9rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
}

.subscription-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.subscription-card-title {
  color: var(--text-main);
  font-size: 0.82rem;
  font-weight: 600;
}

.subscription-card-description {
  margin-top: 0.25rem;
  color: var(--text-muted);
  font-size: 0.68rem;
}

.subscription-indicator {
  padding: 0.25rem 0.4rem;
  border: 1px solid var(--border-color);
  border-radius: 3px;
  color: var(--text-muted);
  font-family: monospace;
  font-size: 0.58rem;
  font-weight: 600;
}

.subscription-indicator.active {
  border-color: #bbf7d0;
  background: #f0fdf4;
  color: #16a34a;
}

.subscription-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--border-color);
}

.subscription-details div {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.subscription-details span {
  color: var(--text-muted);
  font-size: 0.65rem;
}

.subscription-details strong {
  color: var(--text-main);
  font-size: 0.72rem;
}


/* =========================================================
   USAGE
   ========================================================= */

.usage-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
}

.usage-card {
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
}

.usage-card strong {
  display: block;
  color: var(--text-main);
  font-size: 1rem;
  font-weight: 700;
}

.usage-card span {
  display: block;
  margin-top: 0.25rem;
  color: var(--text-muted);
  font-size: 0.62rem;
}


/* =========================================================
   ACTIVITY
   ========================================================= */

.activity-list {
  border-left: 1px solid var(--border-color);
  margin-left: 0.3rem;
  padding-left: 1rem;
}

.activity-row {
  position: relative;
  display: flex;
  gap: 0.65rem;
  padding-bottom: 1rem;
}

.activity-row:last-child {
  padding-bottom: 0;
}

.activity-dot {
  position: absolute;
  top: 0.2rem;
  left: -1.3rem;
  width: 5px;
  height: 5px;
  border: 2px solid var(--bg-card);
  border-radius: 50%;
  background: var(--accent-color);
  box-sizing: content-box;
}

.activity-title {
  color: var(--text-main);
  font-size: 0.7rem;
  font-weight: 600;
}

.activity-time {
  margin-top: 0.2rem;
  color: var(--text-muted);
  font-size: 0.62rem;
}


/* =========================================================
   DRAWER ACTIONS
   ========================================================= */

.drawer-actions {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
}

.drawer-actions .secondary-button,
.drawer-actions .danger-button {
  flex: 1;
}


/* =========================================================
   DRAWER TRANSITION
   ========================================================= */

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.2s ease;
}

.drawer-enter-active .user-drawer,
.drawer-leave-active .user-drawer {
  transition: transform 0.2s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .user-drawer,
.drawer-leave-to .user-drawer {
  transform: translateX(100%);
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .table-header,
  .user-row {
    grid-template-columns: minmax(220px, 2fr) 1.25fr 0.8fr 0.9fr 30px;
  }
}

@media (max-width: 800px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .user-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .search-wrapper {
    max-width: none;
  }

  .filter-group {
    width: 100%;
  }

  .filter-group select {
    flex: 1;
  }

  .table-header {
    display: none;
  }

  .user-row {
    grid-template-columns: 1fr auto;
    gap: 0.75rem;
    padding: 0.9rem 1.25rem;
  }

  .subscription-cell,
  .usage-cell,
  .last-active {
    display: none;
  }

  .row-action {
    grid-column: 2;
    grid-row: 1;
  }
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .table-footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .drawer-header {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .drawer-body {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .drawer-actions {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .usage-grid {
    grid-template-columns: 1fr;
  }
}
</style>
