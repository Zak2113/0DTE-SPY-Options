<!-- app/pages/admin/index.vue -->

<script setup lang="ts">
definePageMeta({
  middleware: ['admin'],
  layout: 'admin'
})

const {
  data: users,
  pending,
  error,
  refresh,
} = await useFetch('/api/admin/users')

function formatDate(date: string | Date | null) {
  if (!date) return 'Never'

  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getTierLabel(tier: string | null | undefined) {
  if (!tier) return 'NONE'

  return tier.toUpperCase()
}

function getRoleLabel(role: string | null | undefined) {
  if (!role) return 'USER'

  return role.toUpperCase()
}
</script>

<template>
  <div class="admin-page">
    <!-- Header -->
    <section class="admin-header">
      <div>
        <div class="eyebrow">
          ADMIN // USER MANAGEMENT
        </div>

        <h1 class="title">
          User Directory.
        </h1>

        <p class="subtitle">
          View registered users, subscription tiers, verification status,
          and account activity.
        </p>
      </div>

      <button
        type="button"
        class="refresh-button"
        :class="{ refreshing: pending }"
        :disabled="pending"
        @click="refresh()"
      >
        <svg
          class="refresh-icon"
          :class="{ spinning: pending }"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 11a8.1 8.1 0 0 0-15.5-2" />
          <path d="M4 4v5h5" />
          <path d="M4 13a8.1 8.1 0 0 0 15.5 2" />
          <path d="M20 20v-5h-5" />
        </svg>

        {{ pending ? 'LOADING' : 'REFRESH' }}
      </button>
    </section>

    <!-- Status -->
    <div
      v-if="pending"
      class="state-message"
    >
      <span class="state-dot"></span>
      LOADING USER DIRECTORY...
    </div>

    <div
      v-else-if="error"
      class="state-message error"
    >
      <span class="state-dot"></span>
      FAILED TO LOAD USERS
      <span class="error-detail">
        {{ error.statusMessage || 'Unknown error' }}
      </span>
    </div>

    <!-- User Table -->
    <section
      v-else
      class="users-section"
    >
      <div class="table-meta">
        <span class="meta-label">
          REGISTERED USERS
        </span>

        <span class="user-count">
          {{ users?.length || 0 }}
        </span>
      </div>

      <div class="table-wrapper">
        <table class="users-table">
          <thead>
            <tr>
              <th>USER</th>
              <th>ROLE</th>
              <th>PLAN / TIER</th>
              <th>EMAIL STATUS</th>
              <th>LAST LOGIN</th>
              <th>REGISTERED</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
            >
              <!-- User -->
              <td class="user-cell">
                <div class="user-name">
                  {{ user.name || 'Unnamed User' }}
                </div>

                <div class="user-email">
                  {{ user.email }}
                </div>
              </td>

              <!-- Role -->
              <td>
                <span
                  class="badge"
                  :class="{
                    'badge-admin': user.role === 'admin',
                    'badge-user': user.role !== 'admin',
                  }"
                >
                  {{ getRoleLabel(user.role) }}
                </span>
              </td>

              <!-- Tier -->
              <td>
                <span
                  class="badge"
                  :class="{
                    'badge-essential': user.tier === 'essential',
                    'badge-pro': user.tier === 'pro',
                    
                    'badge-none':
                      !user.tier ||
                      !['essential', 'pro'].includes(user.tier),
                  }"
                >
                  {{ getTierLabel(user.tier) }}
                </span>
              </td>

              <!-- Email -->
              <td>
                <span
                  class="verification"
                  :class="{
                    verified: user.emailVerified,
                    pending: !user.emailVerified,
                  }"
                >
                  <span class="verification-dot"></span>

                  {{ user.emailVerified ? 'VERIFIED' : 'PENDING' }}
                </span>
              </td>

              <!-- Last Login -->
              <td class="date-cell">
                {{ formatDate(user.lastLoginAt) }}
              </td>

              <!-- Registered -->
              <td class="date-cell">
                {{ formatDate(user.createdAt) }}
              </td>
            </tr>

            <tr v-if="!users?.length">
              <td
                colspan="6"
                class="empty-state"
              >
                NO USERS FOUND
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Footer information -->
    <section class="admin-footer">
      <div class="footer-status">
        <span class="status-dot"></span>
        ADMIN ACCESS ACTIVE
      </div>

      <div class="footer-info">
        USER DATA // AUTHENTICATION SYSTEM
      </div>
    </section>
  </div>
</template>

<style scoped>
/* =========================================================
   PAGE
   ========================================================= */

.admin-page {
  width: 100%;

  padding-top: 4.5rem;
  padding-bottom: 6rem;
}


/* =========================================================
   HEADER
   ========================================================= */

.admin-header {
  display: flex;

  align-items: flex-end;

  justify-content: space-between;

  gap: 2rem;

  margin-bottom: 3rem;

  padding-bottom: 2rem;

  border-bottom: 1px solid var(--border-color);
}

.eyebrow {
  margin-bottom: 1rem;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.75rem;

  letter-spacing: 1.5px;
}

.title {
  margin: 0 0 1rem;

  color: var(--text-main);

  font-size: 3rem;

  font-weight: 700;

  line-height: 1.1;

  letter-spacing: -1px;
}

.subtitle {
  max-width: 650px;

  margin: 0;

  color: var(--text-muted);

  font-size: 1rem;

  line-height: 1.6;
}


/* =========================================================
   REFRESH BUTTON
   ========================================================= */

.refresh-button {
  flex-shrink: 0;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 0.6rem;

  min-height: 42px;

  padding: 0.7rem 1rem;

  background: transparent;

  color: var(--text-main);

  border: 1px solid var(--border-color);

  border-radius: 2px;

  font-family: monospace;

  font-size: 0.75rem;

  font-weight: 600;

  letter-spacing: 1px;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.refresh-button:hover:not(:disabled) {
  background-color: var(--text-main);

  color: var(--bg-main);

  border-color: var(--text-main);
}

.refresh-button:disabled {
  opacity: 0.5;

  cursor: not-allowed;
}

.refresh-icon {
  flex-shrink: 0;
}

.refresh-icon.spinning {
  animation: spin 0.8s linear infinite;
}


/* =========================================================
   STATE
   ========================================================= */

.state-message {
  display: flex;

  align-items: center;

  gap: 0.6rem;

  padding: 1.25rem 1.5rem;

  color: var(--text-muted);

  border: 1px solid var(--border-color);

  font-family: monospace;

  font-size: 0.75rem;

  letter-spacing: 0.8px;
}

.state-message.error {
  color: #ef4444;

  border-color: rgba(239, 68, 68, 0.35);
}

.state-dot {
  width: 7px;
  height: 7px;

  flex-shrink: 0;

  border-radius: 50%;

  background-color: var(--text-muted);
}

.state-message.error .state-dot {
  background-color: #ef4444;
}

.error-detail {
  color: var(--text-muted);

  letter-spacing: 0;
}


/* =========================================================
   TABLE SECTION
   ========================================================= */

.users-section {
  width: 100%;
}

.table-meta {
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 0.75rem;
}

.meta-label {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.7rem;

  letter-spacing: 1.2px;
}

.user-count {
  min-width: 28px;

  padding: 0.25rem 0.5rem;

  color: var(--text-main);

  background-color: var(--bg-card);

  border: 1px solid var(--border-color);

  font-family: monospace;

  font-size: 0.7rem;

  text-align: center;
}


/* =========================================================
   TABLE
   ========================================================= */

.table-wrapper {
  width: 100%;

  overflow-x: auto;

  border: 1px solid var(--border-color);

  background-color: var(--bg-card);
}

.users-table {
  width: 100%;

  min-width: 900px;

  border-collapse: collapse;

  text-align: left;
}

.users-table thead {
  background-color: var(--bg-main);
}

.users-table th {
  padding: 0.9rem 1rem;

  color: var(--text-muted);

  border-bottom: 1px solid var(--border-color);

  font-family: monospace;

  font-size: 0.65rem;

  font-weight: 600;

  letter-spacing: 1px;

  white-space: nowrap;
}

.users-table td {
  padding: 1rem;

  color: var(--text-muted);

  border-bottom: 1px solid var(--border-color);

  font-size: 0.85rem;

  vertical-align: middle;
}

.users-table tbody tr:last-child td {
  border-bottom: none;
}

.users-table tbody tr {
  transition: background-color 0.15s ease;
}

.users-table tbody tr:hover {
  background-color: color-mix(
    in srgb,
    var(--text-main) 3%,
    var(--bg-card)
  );
}


/* =========================================================
   USER
   ========================================================= */

.user-cell {
  min-width: 220px;
}

.user-name {
  margin-bottom: 0.25rem;

  color: var(--text-main);

  font-size: 0.9rem;

  font-weight: 600;
}

.user-email {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.7rem;
}


/* =========================================================
   BADGES
   ========================================================= */

.badge {
  display: inline-flex;

  align-items: center;

  min-height: 25px;

  padding: 0.25rem 0.55rem;

  border: 1px solid transparent;

  font-family: monospace;

  font-size: 0.65rem;

  font-weight: 600;

  letter-spacing: 0.7px;
}


/* Role */

.badge-admin {
  color: var(--text-main);

  background-color: color-mix(
    in srgb,
    var(--accent-color) 12%,
    var(--bg-card)
  );

  border-color: color-mix(
    in srgb,
    var(--accent-color) 25%,
    var(--border-color)
  );
}

.badge-user {
  color: var(--text-muted);

  background-color: var(--bg-main);

  border-color: var(--border-color);
}


/* Tier */

.badge-essential {
  color: #92400e;

  background-color: #fef3c7;

  border-color: #fde68a;
}

.badge-pro {
  color: #166534;

  background-color: #dcfce7;

  border-color: #bbf7d0;
}

.badge-pro-plus {
  color: #1d4ed8;

  background-color: #dbeafe;

  border-color: #bfdbfe;
}

.badge-none {
  color: var(--text-muted);

  background-color: var(--bg-main);

  border-color: var(--border-color);
}


/* =========================================================
   VERIFICATION
   ========================================================= */

.verification {
  display: inline-flex;

  align-items: center;

  gap: 0.5rem;

  font-family: monospace;

  font-size: 0.68rem;

  font-weight: 600;

  letter-spacing: 0.5px;
}

.verification-dot {
  width: 6px;
  height: 6px;

  border-radius: 50%;

  background-color: currentColor;
}

.verification.verified {
  color: #10b981;
}

.verification.pending {
  color: #ef4444;
}


/* =========================================================
   DATES
   ========================================================= */

.date-cell {
  color: var(--text-muted) !important;

  font-family: monospace;

  font-size: 0.7rem !important;

  white-space: nowrap;
}


/* =========================================================
   EMPTY STATE
   ========================================================= */

.empty-state {
  padding: 4rem 1rem !important;

  color: var(--text-muted) !important;

  font-family: monospace;

  font-size: 0.7rem !important;

  letter-spacing: 1px;

  text-align: center !important;
}


/* =========================================================
   FOOTER
   ========================================================= */

.admin-footer {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 2rem;

  margin-top: 2rem;

  padding-top: 1.25rem;

  border-top: 1px solid var(--border-color);
}

.footer-status {
  display: flex;

  align-items: center;

  gap: 0.5rem;

  color: #10b981;

  font-family: monospace;

  font-size: 0.65rem;

  letter-spacing: 0.8px;
}

.footer-status .status-dot {
  width: 6px;
  height: 6px;

  border-radius: 50%;

  background-color: #10b981;
}

.footer-info {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.6rem;

  letter-spacing: 0.8px;
}


/* =========================================================
   ANIMATION
   ========================================================= */

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 800px) {
  .admin-page {
    padding-top: 3rem;

    padding-bottom: 4rem;
  }

  .admin-header {
    align-items: flex-start;

    flex-direction: column;

    margin-bottom: 2rem;
  }

  .title {
    font-size: 2.5rem;
  }

  .refresh-button {
    width: 100%;
  }

  .admin-footer {
    align-items: flex-start;

    flex-direction: column;

    gap: 0.75rem;
  }
}


@media (max-width: 500px) {
  .admin-page {
    padding-top: 2.5rem;
  }

  .title {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .users-table {
    min-width: 800px;
  }
}
</style>
