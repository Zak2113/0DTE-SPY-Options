<template>
  <div class="pricing-page">
    <section class="pricing-header">
      <div class="eyebrow">
        ACCESS // PLANS
      </div>

      <h1 class="title">
        Choose Your
        <br />
        Access Level.
      </h1>

      <p class="subtitle">
        Access historical SPY 0DTE data at the level that fits
        your workflow. Start with the archive and upgrade when
        you need more.
      </p>
    </section>

    <section class="pricing-grid">
      <div v-if="pending" style="text-align: center; grid-column: 1 / -1; padding: 2rem; color: #666;">
        Loading access plans...
      </div>

      <template v-else>
        <!-- STATIC TIER 01 - BASIC (Free) -->
        <article class="pricing-card">
          <div class="card-top">
            <div class="tier-label">
              TIER 01
            </div>

            <h2 class="tier-name">
              BASIC
            </h2>

            <p class="tier-description">
              Explore the archive and get a feel for the platform.
            </p>
          </div>

          <div class="price">
            <span class="price-amount">$0</span>
            <span class="price-period">/ MONTH</span>
          </div>

          <div class="card-divider"></div>

          <ul class="feature-list">
            <li>
              <span class="feature-marker">+</span>
              Limited historical sessions
            </li>
            <li>
              <span class="feature-marker">+</span>
              1-minute OHLCV data
            </li>
            <li>
              <span class="feature-marker">+</span>
              Basic charting
            </li>
            <li>
              <span class="feature-marker">+</span>
              SPY 0DTE archive access
            </li>
          </ul>

          <button
            @click="handleBasicSignup"
            class="plan-button secondary"
            :disabled="user?.tier === 'basic'"
            :style="user?.tier === 'basic' ? 'opacity: 0.7; cursor: not-allowed;' : ''"
          >
            {{ user?.tier === 'basic' ? 'CURRENT PLAN' : 'GET STARTED' }}
            <span v-if="user?.tier !== 'basic'">→</span>
          </button>
        </article>

        <!-- DYNAMIC TIERS 02 & 03 (Essential & Pro from Stripe) -->
        <article 
          v-for="(plan, index) in plans" 
          :key="plan.priceId"
          class="pricing-card"
          :class="{ 'featured': plan.highlighted }"
        >
          <div v-if="plan.highlighted" class="popular-label">
            RECOMMENDED
          </div>

          <div class="card-top">
            <div class="tier-label">
              <!-- Starts at 2 since Basic is 1 -->
              TIER 0{{ index + 2 }}
            </div>

            <h2 class="tier-name">
              {{ plan.name.toUpperCase() }}
            </h2>

            <p class="tier-description">
              {{ plan.description }}
            </p>
          </div>

          <div class="price">
            <span class="price-amount">{{ plan.priceFormatted }}</span>
            <span class="price-period">/ {{ plan.interval ? plan.interval.toUpperCase() : 'MONTH' }}</span>
          </div>

          <div class="card-divider"></div>

          <ul class="feature-list">
            <li v-for="feature in plan.features" :key="feature">
              <span class="feature-marker">+</span>
              {{ feature.trim() }}
            </li>
          </ul>

          <button
            @click="handleUpgrade(plan.priceId, plan.tier)"
            class="plan-button"
            :class="plan.highlighted ? 'primary' : 'secondary'"
            :disabled="user?.tier === plan.tier"
            :style="user?.tier === plan.tier ? 'opacity: 0.7; cursor: not-allowed;' : ''"
          >
            {{ user?.tier === plan.tier ? 'CURRENT PLAN' : (plan.highlighted ? `START ${plan.name.toUpperCase()}` : 'GET STARTED') }}
            <span v-if="user?.tier !== plan.tier">→</span>
          </button>
        </article>

        <!-- STATIC TIER 04 - ENTERPRISE (Coming Soon) -->
        <article class="pricing-card coming-soon">
          <div class="card-top">
            <div class="tier-label">
              <!-- Dynamically calculate the next number (usually 04) -->
              TIER 0{{ (plans?.length || 2) + 2 }}
            </div>

            <h2 class="tier-name">
              ENTERPRISE
            </h2>

            <p class="tier-description">
              Advanced access and tooling for professional teams.
            </p>
          </div>

          <div class="coming-soon-price">
            COMING SOON
          </div>

          <div class="card-divider"></div>

          <ul class="feature-list">
            <li>
              <span class="feature-marker">+</span>
              Everything in PRO
            </li>
            <li>
              <span class="feature-marker">+</span>
              Custom solutions
            </li>
          </ul>

          <button
            type="button"
            class="plan-button disabled"
            disabled
          >
            COMING SOON
          </button>
        </article>
      </template>
    </section>

    <section class="pricing-note">
      <p>
        All plans provide access to historical SPY 0DTE market data.
        Data availability and archive coverage may vary by plan.
      </p>

      <NuxtLink
        to="/faq"
        class="faq-link"
      >
        VIEW FAQ →
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
useHead({
  title: 'Pricing',
})

// Fetch plans from our cached Stripe API endpoint
const { data: plans, pending } = await useFetch('/api/billing/plans')

// Use session to see if user is logged in and what tier they are currently on
const { user, loggedIn } = useUserSession()

// Handler for the free tier
function handleBasicSignup() {
  if (!loggedIn.value) {
    return navigateTo('/register')
  }
  // If they are already logged in but on a different plan (or already on Basic)
  return navigateTo('/dashboard')
}

// Handler for the paid Stripe tiers
async function handleUpgrade(priceId: string, planTier: string) {
  // 1. Unauthenticated users are redirected to register with the intended priceId
  if (!loggedIn.value) {
    return navigateTo(`/register?priceId=${priceId}`)
  }

  // 2. Authenticated users going for a paid tier -> Call our Nitro endpoint
  try {
    
    
  } catch (error) {
    console.error('Failed to start checkout:', error)
    alert('Failed to connect to checkout. Please try again.')
  }
}
</script>

<style scoped>
/* =========================================================
   PAGE
   ========================================================= */

.pricing-page {
  width: 100%;

  display: flex;
  flex-direction: column;

  padding-top: 4.5rem;
  padding-bottom: 7rem;
}


/* =========================================================
   HEADER
   ========================================================= */

.pricing-header {
  max-width: 700px;

  margin-bottom: 4rem;
}

.eyebrow {
  margin-bottom: 1rem;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.8rem;

  letter-spacing: 1.5px;
}

.title {
  margin: 0 0 1.5rem;

  color: var(--text-main);

  font-size: 3.5rem;

  font-weight: 700;

  line-height: 1.1;

  letter-spacing: -1px;
}

.subtitle {
  max-width: 650px;

  margin: 0;

  color: var(--text-muted);

  font-size: 1.1rem;

  line-height: 1.6;
}


/* =========================================================
   PRICING GRID
   ========================================================= */

.pricing-grid {
  width: 100%;

  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: 1rem;

  align-items: stretch;
}


/* =========================================================
   PRICING CARD
   ========================================================= */

.pricing-card {
  position: relative;

  display: flex;
  flex-direction: column;

  min-width: 0;

  min-height: 530px;

  padding: 1.5rem;

  background-color: var(--bg-main);

  border: 1px solid var(--border-color);

  border-radius: 2px;

  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}

.pricing-card:hover {
  border-color: var(--text-muted);

  transform: translateY(-3px);
}

.pricing-card.featured {
  border-color: var(--text-main);
}

.pricing-card.featured:hover {
  border-color: var(--text-main);
}


/* =========================================================
   RECOMMENDED LABEL
   ========================================================= */

.popular-label {
  position: absolute;

  top: -1px;
  right: -1px;

  padding: 0.45rem 0.7rem;

  background-color: var(--text-main);

  color: var(--bg-main);

  font-family: monospace;

  font-size: 0.65rem;

  font-weight: 700;

  letter-spacing: 1px;
}


/* =========================================================
   CARD HEADER
   ========================================================= */

.card-top {
  min-height: 130px;
}

.tier-label {
  margin-bottom: 0.75rem;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.7rem;

  letter-spacing: 1px;
}

.tier-name {
  margin: 0 0 0.5rem;

  color: var(--text-main);

  font-size: 1.5rem;

  font-weight: 600;

  letter-spacing: -0.3px;
}

.tier-description {
  margin: 0;

  color: var(--text-muted);

  font-size: 0.85rem;

  line-height: 1.5;
}


/* =========================================================
   PRICE
   ========================================================= */

.price {
  display: flex;

  align-items: baseline;

  gap: 0.4rem;

  min-height: 75px;
}

.price-amount {
  color: var(--text-main);

  font-size: 2.5rem;

  font-weight: 700;

  letter-spacing: -1px;

  font-variant-numeric: tabular-nums;
}

.price-period {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.7rem;

  letter-spacing: 0.5px;
}

.coming-soon-price {
  display: flex;

  align-items: center;

  min-height: 75px;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 1.15rem;

  font-weight: 600;

  letter-spacing: 1px;
}


/* =========================================================
   DIVIDER
   ========================================================= */

.card-divider {
  width: 100%;

  height: 1px;

  margin: 0.5rem 0 1.25rem;

  background-color: var(--border-color);
}


/* =========================================================
   FEATURES
   ========================================================= */

.feature-list {
  display: flex;

  flex-direction: column;

  gap: 0.85rem;

  flex: 1;

  padding: 0;
  margin: 0;

  list-style: none;
}

.feature-list li {
  display: flex;

  align-items: flex-start;

  gap: 0.6rem;

  color: var(--text-muted);

  font-size: 0.82rem;

  line-height: 1.4;
}

.feature-marker {
  flex-shrink: 0;

  color: var(--text-main);

  font-family: monospace;

  font-size: 0.8rem;
}


/* =========================================================
   BUTTONS
   ========================================================= */

.plan-button {
  width: 100%;

  min-height: 46px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 0.5rem;

  margin-top: 2rem;

  font-family: monospace;

  font-size: 0.8rem;

  font-weight: 600;

  letter-spacing: 1px;

  text-decoration: none;

  border-radius: 2px;

  cursor: pointer;

  transition: all 0.2s ease;
}


/* Primary */

.plan-button.primary {
  background-color: var(--text-main);

  color: var(--bg-main);

  border: 1px solid var(--text-main);
}

.plan-button.primary:hover {
  background-color: var(--accent-color);

  border-color: var(--accent-color);

  color: white;
}


/* Secondary */

.plan-button.secondary {
  background-color: transparent;

  color: var(--text-main);

  border: 1px solid var(--border-color);
}

.plan-button.secondary:hover {
  background-color: var(--text-main);

  color: var(--bg-main);

  border-color: var(--text-main);
}


/* Disabled */

.pricing-card.coming-soon {
  opacity: 0.5;

  cursor: not-allowed;
}

.pricing-card.coming-soon:hover {
  border-color: var(--border-color);

  transform: none;
}

.plan-button.disabled {
  background-color: transparent;

  color: var(--text-muted);

  border: 1px solid var(--border-color);

  cursor: not-allowed;
}

.plan-button.disabled:hover {
  background-color: transparent;

  color: var(--text-muted);

  border-color: var(--border-color);
}


/* =========================================================
   BOTTOM NOTE
   ========================================================= */

.pricing-note {
  width: 100%;

  display: grid;

  grid-template-columns: 1fr auto;

  gap: 2rem;

  align-items: center;

  margin-top: 3rem;

  padding-top: 1.5rem;

  border-top: 1px solid var(--border-color);
}

.pricing-note p {
  max-width: 700px;

  margin: 0;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.72rem;

  line-height: 1.6;
}

.faq-link {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.75rem;

  letter-spacing: 1px;

  text-decoration: none;

  white-space: nowrap;

  transition: color 0.2s ease;
}

.faq-link:hover {
  color: var(--text-main);
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1200px) {
  .pricing-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}


@media (max-width: 1100px) {
  .pricing-page {
    padding-top: 3.5rem;

    padding-bottom: 5rem;
  }
}


@media (max-width: 700px) {
  .pricing-page {
    padding-top: 3rem;

    padding-bottom: 4rem;
  }

  .pricing-header {
    margin-bottom: 3rem;
  }

  .title {
    font-size: 2.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .pricing-grid {
    grid-template-columns: 1fr;

    gap: 1rem;
  }

  .pricing-card {
    min-height: auto;
  }

  .card-top {
    min-height: auto;
  }

  .pricing-note {
    grid-template-columns: 1fr;

    gap: 1rem;

    margin-top: 2.5rem;
  }
}
</style>
