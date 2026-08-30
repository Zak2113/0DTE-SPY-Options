<script setup lang="ts">
const { user, fetch: refreshSession } = useUserSession()



useHead({
  title: 'Login',
})

definePageMeta({
  middleware: ['logged'],
  layout: 'auth'
})

const credentials = reactive({
  email: '',
  password: '',
})

const loading = ref(false)
const error = ref('')

async function login() {
  error.value = ''

  if (!credentials.email || !credentials.password) {
    error.value = 'Please enter your email and password.'
    return
  }

  loading.value = true

  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: credentials,
    })

    await refreshSession()
    if(response.user.role == 'admin'){
      await navigateTo('/admin')
    }
    else{
      await navigateTo('/dashboard')
    }
    
  } catch (err: any) {
    error.value =
      err?.data?.message ||
      'Invalid email or password.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="login-page">
    <div class="login-container">
      <NuxtLink to="/" class="back-link">
        ← Back
      </NuxtLink>

      <section class="login-card">
        <div class="login-header">
          <h1>Welcome back</h1>
          <p>Sign in to access your account.</p>
        </div>

        <form
          class="login-form"
          @submit.prevent="login"
        >
          <div class="form-group">
            <label for="email">Email</label>

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
            <div class="password-header">
              <label for="password">Password</label>

              <NuxtLink
                to="/forgot-password"
                class="forgot-link"
              >
                Forgot password?
              </NuxtLink>
            </div>

            <input
              id="password"
              v-model="credentials.password"
              type="password"
              name="password"
              autocomplete="current-password"
              placeholder="Enter your password"
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
            class="login-button"
            :disabled="loading"
          >
            <span
              v-if="loading"
              class="spinner"
            />

            <span>
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </span>
          </button>
        </form>

        <div class="signup-footer">
          <span>Don't have an account?</span>

          <NuxtLink to="/register">
            Create an account
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
.login-page {
  
  width: 100%;

  display: flex;
  
  justify-content: center;

  

  background-color: var(--bg-main);
  color: var(--text-main);
}

.login-container {
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

.login-card {
  background-color: var(--bg-card);

  border: 1px solid var(--border-color);
  border-radius: 6px;

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.06);
}

/* Header */

.login-header {
  padding: 2rem 2rem 1.5rem;

  border-bottom: 1px solid var(--border-color);
}

.login-header h1 {
  margin: 0 0 0.5rem;

  color: var(--text-main);

  font-size: 1.7rem;
  font-weight: 700;

  letter-spacing: -0.4px;
}

.login-header p {
  margin: 0;

  color: var(--text-muted);

  font-size: 0.9rem;
  line-height: 1.5;
}

/* Form */

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

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

.password-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.forgot-link {
  color: var(--text-muted);

  font-size: 0.8rem;

  text-decoration: none;

  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: var(--accent-color);
}

/* Inputs */

.form-group input {
  width: 100%;

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

/* Error */

.error-message {
  padding: 0.7rem 0.8rem;

  background-color: rgba(239, 68, 68, 0.07);

  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 4px;

  color: #ef4444;

  font-size: 0.85rem;
  line-height: 1.4;
}

/* Button */

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  width: 100%;
  padding: 0.85rem 1rem;

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

.login-button:hover:not(:disabled) {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

.login-button:active:not(:disabled) {
  transform: translateY(1px);
}

.login-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Spinner */

.spinner {
  width: 14px;
  height: 14px;

  border: 2px solid currentColor;
  border-top-color: transparent;

  border-radius: 50%;

  animation: spin 0.7s linear infinite;
}


@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Sign up */

.signup-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;

  padding: 1.25rem 2rem;

  border-top: 1px solid var(--border-color);

  color: var(--text-muted);

  font-size: 0.85rem;
}

.signup-footer a {
  color: var(--text-main);

  font-weight: 600;

  text-decoration: none;

  transition: color 0.2s ease;
}

.signup-footer a:hover {
  color: var(--accent-color);
}

/* Footer */

.copyright {
  margin: 1.25rem 0 0;

  color: var(--text-muted);

  text-align: center;

  font-size: 0.75rem;

  opacity: 0.7;
}

/* Mobile */

@media (max-width: 500px) {
  .login-page {
    align-items: flex-start;
    padding: 3rem 1rem 1rem;
  }

  .login-header,
  .login-form {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .signup-footer {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
