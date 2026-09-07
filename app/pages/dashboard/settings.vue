<!-- app/pages/dashboard/settings.vue -->

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'authenticated',
})

const { user, fetch: refreshSession } = useUserSession()

/* -------------------------------------------------------------------------
   PROFILE — change display name
   ------------------------------------------------------------------------- */

const name = ref(user.value?.name ?? '')
const nameSaving = ref(false)
const nameStatus = ref<{ type: 'success' | 'error'; message: string } | null>(null)

async function saveName() {
  nameSaving.value = true
  nameStatus.value = null

  try {
    await $fetch('/api/user/profile', {
      method: 'PATCH',
      body: { name: name.value },
    })
    await refreshSession()
    nameStatus.value = { type: 'success', message: 'Name updated.' }
  } catch (err: any) {
    nameStatus.value = {
      type: 'error',
      message: err?.data?.message || 'Could not update name. Try again.',
    }
  } finally {
    nameSaving.value = false
  }
}

/* -------------------------------------------------------------------------
   SECURITY — change password
   ------------------------------------------------------------------------- */

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const passwordSaving = ref(false)
const passwordStatus = ref<{ type: 'success' | 'error'; message: string } | null>(null)

async function savePassword() {
  passwordStatus.value = null

  if (newPassword.value.length < 8) {
    passwordStatus.value = { type: 'error', message: 'New password must be at least 8 characters.' }
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    passwordStatus.value = { type: 'error', message: 'New password and confirmation do not match.' }
    return
  }

  passwordSaving.value = true

  try {
    await $fetch('/api/user/password', {
      method: 'PATCH',
      body: {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
      },
    })
    passwordStatus.value = { type: 'success', message: 'Password updated.' }
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (err: any) {
    passwordStatus.value = {
      type: 'error',
      message: err?.data?.message || 'Could not update password. Check your current password and try again.',
    }
  } finally {
    passwordSaving.value = false
  }
}

/* -------------------------------------------------------------------------
   APPEARANCE — dark / light mode
   Uses the same @nuxtjs/color-mode instance as the global toggle in app.vue,
   so switching it here stays in sync with that button everywhere else.
   ------------------------------------------------------------------------- */

const colorMode = useColorMode()

function setTheme(value: 'dark' | 'light') {
  colorMode.preference = value
}

/* -------------------------------------------------------------------------
   FUTURE SETTINGS
   To add another section: copy a <div class="settings-section"> block below,
   give it its own state/handler above, following the same pattern.
   ------------------------------------------------------------------------- */
</script>

<template>
  <div class="settings-page">
    <div class="page-header">
      <div>
        <div class="page-eyebrow">
          ACCOUNT
        </div>
        <h1 class="page-title">
          Settings
        </h1>
      </div>
    </div>

    <!-- Profile -->
    <div class="settings-section">
      <div class="settings-section-header">
        <span class="settings-section-title">Profile</span>
        <span class="settings-section-desc">Update your display name.</span>
      </div>

      <div class="settings-section-body">
        <label class="field">
          <span class="field-label">NAME</span>
          <input
            v-model="name"
            type="text"
            class="field-input"
            placeholder="Your name"
          >
        </label>

        <div class="field-row">
          <button
            type="button"
            class="save-button"
            :disabled="nameSaving"
            @click="saveName"
          >
            {{ nameSaving ? 'Saving...' : 'Save' }}
          </button>

          <span
            v-if="nameStatus"
            :class="['status-text', `status-${nameStatus.type}`]"
          >
            {{ nameStatus.message }}
          </span>
        </div>
      </div>
    </div>

    <!-- Security -->
    <div class="settings-section">
      <div class="settings-section-header">
        <span class="settings-section-title">Security</span>
        <span class="settings-section-desc">Change your password.</span>
      </div>

      <div class="settings-section-body">
        <label class="field">
          <span class="field-label">CURRENT PASSWORD</span>
          <input
            v-model="currentPassword"
            type="password"
            class="field-input"
            autocomplete="current-password"
          >
        </label>

        <label class="field">
          <span class="field-label">NEW PASSWORD</span>
          <input
            v-model="newPassword"
            type="password"
            class="field-input"
            autocomplete="new-password"
          >
        </label>

        <label class="field">
          <span class="field-label">CONFIRM NEW PASSWORD</span>
          <input
            v-model="confirmPassword"
            type="password"
            class="field-input"
            autocomplete="new-password"
          >
        </label>

        <div class="field-row">
          <button
            type="button"
            class="save-button"
            :disabled="passwordSaving"
            @click="savePassword"
          >
            {{ passwordSaving ? 'Saving...' : 'Update password' }}
          </button>

          <span
            v-if="passwordStatus"
            :class="['status-text', `status-${passwordStatus.type}`]"
          >
            {{ passwordStatus.message }}
          </span>
        </div>
      </div>
    </div>

    <!-- Appearance -->
    <div class="settings-section">
      <div class="settings-section-header">
        <span class="settings-section-title">Appearance</span>
        <span class="settings-section-desc">Choose how the app looks.</span>
      </div>

      <div class="settings-section-body">
        <div class="theme-toggle">
          <button
            type="button"
            :class="['theme-option', colorMode.value === 'dark' && 'theme-option--active']"
            @click="setTheme('dark')"
          >
            DARK
          </button>
          <button
            type="button"
            :class="['theme-option', colorMode.value === 'light' && 'theme-option--active']"
            @click="setTheme('light')"
          >
            LIGHT
          </button>
        </div>
      </div>
    </div>

    <!-- Placeholder for future settings sections -->
    <div class="settings-section settings-section--muted">
      <div class="settings-section-header">
        <span class="settings-section-title">More settings</span>
        <span class="settings-section-desc">Additional preferences will appear here.</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;

  gap: 2.5rem;

  max-width: 640px;
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


/* =========================================================
   SETTINGS SECTION
   ========================================================= */

.settings-section {
  display: flex;
  flex-direction: column;

  gap: 1.25rem;

  padding: 1.5rem;

  border: 1px solid var(--border-color);
}

.settings-section--muted {
  color: var(--text-muted);
}

.settings-section-header {
  display: flex;
  flex-direction: column;

  gap: 0.3rem;
}

.settings-section-title {
  color: var(--text-main);

  font-size: 0.95rem;
  font-weight: 700;
}

.settings-section-desc {
  color: var(--text-muted);

  font-size: 0.75rem;
}


/* =========================================================
   FIELDS
   ========================================================= */

.settings-section-body {
  display: flex;
  flex-direction: column;

  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;

  gap: 0.4rem;
}

.field-label {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.55rem;

  letter-spacing: 1px;
}

.field-input {
  width: 100%;

  padding: 0.6rem 0.75rem;

  color: var(--text-main);

  background-color: var(--bg-main);

  border: 1px solid var(--border-color);

  font-size: 0.8rem;

  transition: border-color 0.2s ease;
}

.field-input:focus {
  outline: none;

  border-color: var(--accent-color);
}

.field-row {
  display: flex;
  align-items: center;

  gap: 1rem;
}


/* =========================================================
   BUTTONS / STATUS
   ========================================================= */

.save-button {
  flex-shrink: 0;

  padding: 0.6rem 1.1rem;

  color: var(--bg-card);

  background-color: var(--text-main);

  border: none;

  cursor: pointer;

  font-family: monospace;

  font-size: 0.65rem;
  font-weight: 700;

  letter-spacing: 0.6px;

  transition: background-color 0.2s ease;
}

.save-button:hover:not(:disabled) {
  background-color: var(--accent-color);
}

.save-button:disabled {
  cursor: not-allowed;

  opacity: 0.6;
}

.status-text {
  font-size: 0.72rem;
}

.status-success {
  color: #3a9a5c;
}

.status-error {
  color: #c0473f;
}


/* =========================================================
   THEME TOGGLE
   ========================================================= */

.theme-toggle {
  display: inline-flex;

  border: 1px solid var(--border-color);
}

.theme-option {
  padding: 0.55rem 1.1rem;

  color: var(--text-muted);

  background-color: transparent;

  border: none;

  cursor: pointer;

  font-family: monospace;

  font-size: 0.6rem;
  font-weight: 600;

  letter-spacing: 0.8px;

  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}

.theme-option + .theme-option {
  border-left: 1px solid var(--border-color);
}

.theme-option--active {
  color: var(--bg-card);

  background-color: var(--text-main);
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 600px) {
  .settings-page {
    max-width: 100%;
  }

  .field-row {
    flex-direction: column;
    align-items: flex-start;

    gap: 0.6rem;
  }
}
</style>