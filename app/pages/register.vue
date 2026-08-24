<script setup lang="ts">
const { fetch: refreshSession } = useUserSession()

useHead({
  title: 'Create Account',
})

const credentials = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const loading = ref(false)
const error = ref('')

async function register() {
  error.value = ''

  if (
    !credentials.name ||
    !credentials.email ||
    !credentials.password ||
    !credentials.confirmPassword
  ) {
    error.value = 'Please fill in all fields.'
    return
  }

  if (credentials.password !== credentials.confirmPassword) {
    error.value = 'Passwords do not match.'
    return
  }

  loading.value = true

  try {
    await $fetch('/api/register', {
      method: 'POST',
      body: {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      },
    })

    await refreshSession()
    await navigateTo('/dashboard')
  } catch (err: any) {
    error.value =
      err?.data?.message ||
      'Unable to create your account.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="register-page">
    <div class="register-container">
      <NuxtLink to="/" class="back-link">
        ← Back
      </NuxtLink>

      <section class="register-card">
        <div class="register-header">
          <h1>Create your account</h1>
          <p>
            Get started with your 0DTE SPY Options account.
          </p>
        </div>

        <form
          class="register-form"
          @submit.prevent="register"
        >
          <div class="form-group">
            <label for="name">
              Name
            </label>

            <input
              id="name"
              v-model="credentials.name"
              type="text"
              name="name"
              autocomplete="name"
              placeholder="John Doe"
              required
            >
          </div>

          <div class="form-group">
            <label for="email">
              Email
            </label>

            <input
              id="email"
              v-model="credentials.email"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="you@example.com"
              required
            >
          </div>

          <div class="form-group">
            <label for="password">
              Password
            </label>

            <input
              id="password"
              v-model="credentials.password"
              type="password"
              name="password"
              autocomplete="new-password"
              placeholder="Create a password"
              minlength="8"
              required
            >

            <span class="field-hint">
              Must be at least 8 characters.
            </span>
          </div>

          <div class="form-group">
            <label for="confirm-password">
              Confirm password
            </label>

            <input
              id="confirm-password"
              v-model="credentials.confirmPassword"
              type="password"
              name="confirm-password"
              autocomplete="new-password"
              placeholder="Enter your password again"
              minlength="8"
              required
            >
          </div>

          <div
            v-if="error"
            class="error-message"
            role="alert"
          >
            {{ error }}
          </div>

          <button
            type="submit"
            class="register-button"
            :disabled="loading"
          >
            <span
              v-if="loading"
              class="button-spinner"
            />

            <span>
              {{ loading ? 'Creating account...' : 'Create account' }}
            </span>
          </button>
        </form>

        <div class="register-footer">
          <span>Already have an account?</span>

          <NuxtLink to="/login">
            Sign in
          </NuxtLink>
        </div>
      </section>

      <p class="copyright">
        © {{ new Date().getFullYear() }} SPY_0DTE // ARCHIVE
      </p>
    </div>
  </main>
</template>

<style scoped>
.register-page {
  min-height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2rem;

  background-color: var(--bg-main);
  color: var(--text-main);
}

.register-container {
  width: 100%;
  max-width: 400px;
}

/* Back link */

.back-link {
  display: inline-block;

  margin-bottom: 1rem;

  color: var(--text-muted);

  font-size: 0.9rem;
  font-weight: 500;

  text-decoration: none;

  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--text-main);
}

/* Card */

.register-card {
  background-color: var(--bg-card);

  border: 1px solid var(--border-color);
  border-radius: 6px;

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.06);
}

/* Header */

.register-header {
  padding: 2rem 2rem 1.5rem;

  border-bottom: 1px solid var(--border-color);
}

.register-header h1 {
  margin: 0 0 0.5rem;

  color: var(--text-main);

  font-size: 1.7rem;
  font-weight: 700;

  letter-spacing: -0.4px;
}

.register-header p {
  margin: 0;

  color: var(--text-muted);

  font-size: 0.9rem;
  line-height: 1.5;
}

/* Form */

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;

  padding: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: var(--text-main);

  font-size: 0.85rem;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  box-sizing: border-box;

  padding: 0.75rem 0.85rem;

  background-color: var(--bg-main);
  color: var(--text-main);

  border: 1px solid var(--border-color);
  border-radius: 4px;

  outline: none;

  font-family: inherit;
  font-size: 0.9rem;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-group input::placeholder {
  color: var(--text-muted);
  opacity: 0.7;
}

.form-group input:hover {
  border-color: var(--text-muted);
}

.form-group input:focus {
  border-color: var(--accent-color);

  box-shadow:
    0 0 0 2px rgba(37, 99, 235, 0.12);
}

.field-hint {
  color: var(--text-muted);

  font-size: 0.75rem;
}

/* Error */

.error-message {
  margin: 0;
  padding: 0.7rem 0.8rem;

  background-color: rgba(239, 68, 68, 0.07);

  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 4px;

  color: #ef4444;

  font-size: 0.85rem;
  line-height: 1.4;
}

/* Button */

.register-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  width: 100%;

  padding: 0.85rem 1rem;

  margin-top: 0.25rem;

  background-color: var(--text-main);
  color: var(--bg-main);

  border: 1px solid var(--text-main);
  border-radius: 2px;

  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;

  cursor: pointer;

  transition: all 0.2s ease;
}

.register-button:hover:not(:disabled) {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

.register-button:active:not(:disabled) {
  transform: translateY(1px);
}

.register-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Spinner */

.button-spinner {
  width: 14px;
  height: 14px;

  border: 2px solid currentColor;
  border-top-color: transparent;

  border-radius: 50%;

  animation: spin 0.7s linear infinite;
}

/* Footer */

.register-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;

  padding: 1.25rem 2rem;

  border-top: 1px solid var(--border-color);

  color: var(--text-muted);

  font-size: 0.85rem;
}

.register-footer a {
  color: var(--text-main);

  font-weight: 600;

  text-decoration: none;

  transition: color 0.2s ease;
}

.register-footer a:hover {
  color: var(--accent-color);
}

/* Copyright */

.copyright {
  margin: 1.25rem 0 0;

  color: var(--text-muted);

  text-align: center;

  font-size: 0.75rem;

  opacity: 0.7;
}

/* Animation */

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Mobile */

@media (max-width: 500px) {
  .register-page {
    align-items: flex-start;
    padding: 3rem 1rem 1rem;
  }

  .register-header,
  .register-form {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .register-footer {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
