<script setup lang="ts">
useHead({
  title: 'Pricing',
})

const plans = [
  {
    name: 'Basic',
    slug: 'basic',
    price: 0,
    description: 'Essential tools for getting started.',
    features: [
      { name: 'Market data', included: true },
      { name: 'Options chains', included: true },
      { name: 'Saved watchlists', included: true },
      { name: 'Advanced analytics', included: false },
      { name: 'Real-time alerts', included: false },
    ],
  },
  {
    name: 'Pro',
    slug: 'pro',
    price: 19,
    description: 'More tools for active traders.',
    popular: true,
    features: [
      { name: 'Market data', included: true },
      { name: 'Options chains', included: true },
      { name: 'Saved watchlists', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Real-time alerts', included: true },
    ],
  },
  {
    name: 'Premium',
    slug: 'premium',
    price: 49,
    description: 'The complete trading workspace.',
    features: [
      { name: 'Market data', included: true },
      { name: 'Options chains', included: true },
      { name: 'Unlimited watchlists', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Real-time alerts', included: true },
    ],
  },
]
</script>

<template>
  <div class="pricing-page">
    <header class="pricing-header">
      <div>
        <NuxtLink to="/" class="back-link">
          ← Back
        </NuxtLink>

        <h1>Pricing</h1>
        <p>
          Choose the level of access that fits your trading.
        </p>
      </div>
    </header>

    <main class="pricing-content">
      <div class="pricing-grid">
        <article
          v-for="plan in plans"
          :key="plan.slug"
          class="pricing-card"
          :class="{ 'pricing-card-popular': plan.popular }"
        >
          <div v-if="plan.popular" class="popular-badge">
            Most Popular
          </div>

          <div class="plan-header">
            <h2>{{ plan.name }}</h2>

            <p class="plan-description">
              {{ plan.description }}
            </p>

            <div class="price">
              <span class="price-amount">${{ plan.price }}</span>
              <span class="price-period">/ month</span>
            </div>
          </div>

          <div class="plan-divider" />

          <ul class="feature-list">
            <li
              v-for="feature in plan.features"
              :key="feature.name"
              :class="{ 'feature-disabled': !feature.included }"
            >
              <span
                class="feature-icon"
                :class="{ included: feature.included }"
              >
                {{ feature.included ? '✓' : '—' }}
              </span>

              <span>{{ feature.name }}</span>
            </li>
          </ul>

          <button
            class="plan-button"
            :class="{ 'plan-button-primary': plan.popular }"
          >
            {{ plan.price === 0 ? 'Get Started' : `Choose ${plan.name}` }}
          </button>
        </article>
      </div>

      <section class="pricing-footer">
        <h3>Every plan includes</h3>

        <div class="included-grid">
          <div class="included-item">
            <span class="included-icon">✓</span>
            <div>
              <strong>Secure account</strong>
              <p>Your account and data stay protected.</p>
            </div>
          </div>

          <div class="included-item">
            <span class="included-icon">✓</span>
            <div>
              <strong>Market access</strong>
              <p>Access the tools you need to analyze markets.</p>
            </div>
          </div>

          <div class="included-item">
            <span class="included-icon">✓</span>
            <div>
              <strong>No contracts</strong>
              <p>Cancel your subscription whenever you want.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.pricing-page {
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-main);
  color: var(--text-main);
  padding: 2.5rem;
  overflow-y: auto;
}

.pricing-header {
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.back-link {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--text-main);
}

.pricing-header h1 {
  margin: 0 0 0.5rem;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.pricing-header p {
  margin: 0;
  color: var(--text-muted);
  font-size: 1rem;
}

.pricing-content {
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.pricing-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 520px;
  padding: 1.75rem;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.08),
    0 2px 4px -1px rgba(0, 0, 0, 0.04);
}

.pricing-card-popular {
  border-color: var(--accent-color, #3b82f6);
}

.popular-badge {
  position: absolute;
  top: 0;
  right: 1.25rem;
  transform: translateY(-50%);
  padding: 0.3rem 0.7rem;
  background-color: var(--accent-color, #3b82f6);
  color: white;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.plan-header h2 {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.plan-description {
  min-height: 42px;
  margin: 0;
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1.5;
}

.price {
  display: flex;
  align-items: baseline;
  margin-top: 1.75rem;
}

.price-amount {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -1px;
}

.price-period {
  margin-left: 0.35rem;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.plan-divider {
  height: 1px;
  margin: 1.75rem 0;
  background-color: var(--border-color);
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--text-main);
  font-size: 0.9rem;
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.feature-icon.included {
  color: #10b981;
  font-weight: 700;
}

.feature-disabled {
  color: var(--text-muted) !important;
  opacity: 0.55;
}

.plan-button {
  width: 100%;
  margin-top: auto;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: var(--bg-main);
  color: var(--text-main);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.plan-button:hover {
  border-color: var(--text-muted);
  background-color: var(--bg-sidebar);
}

.plan-button-primary {
  border-color: var(--accent-color, #3b82f6);
  background-color: var(--accent-color, #3b82f6);
  color: white;
}

.plan-button-primary:hover {
  border-color: var(--accent-color, #3b82f6);
  background-color: var(--accent-color, #2563eb);
}

.pricing-footer {
  margin-top: 3rem;
  padding: 1.75rem;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.pricing-footer h3 {
  margin: 0 0 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
}

.included-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.included-item {
  display: flex;
  gap: 0.75rem;
}

.included-icon {
  color: #10b981;
  font-weight: 700;
}

.included-item strong {
  display: block;
  margin-bottom: 0.2rem;
  font-size: 0.85rem;
}

.included-item p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.8rem;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }

  .pricing-card {
    min-height: auto;
  }

  .included-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .pricing-page {
    padding: 1.5rem;
  }

  .pricing-header {
    margin-bottom: 2rem;
  }

  .pricing-header h1 {
    font-size: 1.8rem;
  }
}
</style>
