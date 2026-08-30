<!-- app/pages/admin/subscriptions.vue -->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

/* =========================================================
   TYPES
   ========================================================= */

type Plan = {
  id: string
  name: string
  description: string
  price: number
  interval: string
  subscribers: number
  active: boolean
  rank: number
  features: string[]
}

type SubscriptionEvent = {
  id: string
  type: 'created' | 'upgrade' | 'payment' | 'cancelled'
  event: string
  user: string
  plan: string
  amount: string
  date: string
}


/* =========================================================
   DATA
   ========================================================= */

const plans = ref<Plan[]>([
  {
    id: 'basic',
    name: 'Basic',
    description: 'Essential access for individual users.',
    price: 19,
    interval: 'month',
    subscribers: 486,
    active: true,
    rank: 1,
    features: [
      'Basic market data',
      'Standard charting',
      'Historical data access',
    ],
  },
  {
    id: 'essential',
    name: 'Essential',
    description: 'Expanded tools and market analysis.',
    price: 49,
    interval: 'month',
    subscribers: 531,
    active: true,
    rank: 2,
    features: [
      'Everything in Basic',
      'Advanced market analysis',
      'Additional indicators',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Full access to advanced trading tools.',
    price: 99,
    interval: 'month',
    subscribers: 267,
    active: true,
    rank: 3,
    features: [
      'Everything in Essential',
      'Advanced trading tools',
      'Full market analysis',
    ],
  },
])

const subscriptionEvents = ref<SubscriptionEvent[]>([
  {
    id: '1',
    type: 'created',
    event: 'Subscription created',
    user: 'dan@growth.io',
    plan: 'Pro',
    amount: '$99.00',
    date: 'Aug 29, 2026 20:32',
  },
  {
    id: '2',
    type: 'upgrade',
    event: 'Plan upgraded',
    user: 'jane@fintech.co',
    plan: 'Essential → Pro',
    amount: '+$50.00',
    date: 'Aug 29, 2026 20:12',
  },
  {
    id: '3',
    type: 'payment',
    event: 'Payment received',
    user: 'mark@user.io',
    plan: 'Essential',
    amount: '$49.00',
    date: 'Aug 29, 2026 19:50',
  },
  {
    id: '4',
    type: 'cancelled',
    event: 'Subscription cancelled',
    user: 'alex@example.com',
    plan: 'Basic',
    amount: '$19.00',
    date: 'Aug 29, 2026 19:24',
  },
  {
    id: '5',
    type: 'payment',
    event: 'Payment received',
    user: 'sam@company.io',
    plan: 'Pro',
    amount: '$99.00',
    date: 'Aug 29, 2026 18:58',
  },
])


/* =========================================================
   PLAN DIALOG
   ========================================================= */

const showPlanDialog = ref(false)
const planDialogMode = ref<'create' | 'edit'>('create')
const editingPlan = ref<Plan | null>(null)

const planName = ref('')
const planDescription = ref('')
const planPrice = ref(0)
const planInterval = ref('month')
const planActive = ref(true)
const planFeatures = ref<string[]>([])

const newFeature = ref('')


/* =========================================================
   DELETE DIALOG
   ========================================================= */

const showDeleteDialog = ref(false)
const planToDelete = ref<Plan | null>(null)


/* =========================================================
   COMPUTED
   ========================================================= */

const sortedPlans = computed(() => {
  return [...plans.value].sort((a, b) => a.rank - b.rank)
})

const activePlans = computed(() => {
  return plans.value.filter(plan => plan.active)
})

const totalSubscribers = computed(() => {
  return plans.value.reduce(
    (total, plan) => total + plan.subscribers,
    0,
  )
})

const monthlyRecurringRevenue = computed(() => {
  return plans.value.reduce(
    (total, plan) => total + plan.price * plan.subscribers,
    0,
  )
})

const newRevenue30d = computed(() => {
  return 2840
})

const lostRevenue30d = computed(() => {
  return 486
})

const averageRevenuePerUser = computed(() => {
  if (!totalSubscribers.value) return 0

  return monthlyRecurringRevenue.value / totalSubscribers.value
})

const newSubscriptions30d = computed(() => {
  return 142
})

const cancellations30d = computed(() => {
  return 27
})

const planDialogTitle = computed(() => {
  return planDialogMode.value === 'create'
    ? 'Create Subscription Plan'
    : 'Edit Subscription Plan'
})

const canSavePlan = computed(() => {
  return (
    planName.value.trim().length > 0 &&
    planDescription.value.trim().length > 0 &&
    planPrice.value >= 0 &&
    planFeatures.value.length > 0
  )
})


/* =========================================================
   HELPERS
   ========================================================= */

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value)
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

function toneClass(tone: string) {
  return `status-${tone}`
}

function eventClass(type: SubscriptionEvent['type']) {
  if (type === 'cancelled') return 'event-warning'
  if (type === 'upgrade') return 'event-admin'

  return 'event-default'
}


/* =========================================================
   PLAN CREATION
   ========================================================= */

function createEmptyPlan(rank: number): Plan {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    price: 0,
    interval: 'month',
    subscribers: 0,
    active: true,
    rank,
    features: [],
  }
}

function openCreatePlanDialog() {
  planDialogMode.value = 'create'

  const plan = createEmptyPlan(plans.value.length + 1)

  editingPlan.value = plan

  planName.value = plan.name
  planDescription.value = plan.description
  planPrice.value = plan.price
  planInterval.value = plan.interval
  planActive.value = plan.active
  planFeatures.value = [...plan.features]

  newFeature.value = ''

  showPlanDialog.value = true
}


/* =========================================================
   PLAN EDITING
   ========================================================= */

function openEditPlanDialog(plan: Plan) {
  planDialogMode.value = 'edit'

  editingPlan.value = {
    ...plan,
    features: [...plan.features],
  }

  planName.value = plan.name
  planDescription.value = plan.description
  planPrice.value = plan.price
  planInterval.value = plan.interval
  planActive.value = plan.active
  planFeatures.value = [...plan.features]

  newFeature.value = ''

  showPlanDialog.value = true
}

function closePlanDialog() {
  showPlanDialog.value = false
  editingPlan.value = null
  newFeature.value = ''
}

function savePlan() {
  if (!editingPlan.value || !canSavePlan.value) return

  const updatedPlan: Plan = {
    id: editingPlan.value.id,
    name: planName.value.trim(),
    description: planDescription.value.trim(),
    price: Number(planPrice.value),
    interval: planInterval.value,
    subscribers: editingPlan.value.subscribers,
    active: planActive.value,
    rank: editingPlan.value.rank,
    features: [...planFeatures.value],
  }

  const existingIndex = plans.value.findIndex(
    plan => plan.id === updatedPlan.id,
  )

  if (existingIndex === -1) {
    plans.value.push(updatedPlan)
  } else {
    plans.value[existingIndex] = updatedPlan
  }

  normalizeRanks()

  closePlanDialog()
}


/* =========================================================
   FEATURES
   ========================================================= */

function addFeature() {
  const feature = newFeature.value.trim()

  if (!feature) return

  planFeatures.value.push(feature)
  newFeature.value = ''
}

function removeFeature(index: number) {
  planFeatures.value.splice(index, 1)
}

function handleFeatureKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
    addFeature()
  }
}


/* =========================================================
   PLAN STATUS
   ========================================================= */

function togglePlanStatus(plan: Plan) {
  plan.active = !plan.active

  // Connect this to your subscription-plan API when ready.
  console.log('Updated plan status:', {
    id: plan.id,
    active: plan.active,
  })
}


/* =========================================================
   PLAN HIERARCHY
   ========================================================= */

function normalizeRanks() {
  const ordered = [...plans.value].sort(
    (a, b) => a.rank - b.rank,
  )

  ordered.forEach((plan, index) => {
    plan.rank = index + 1
  })
}

function movePlanUp(plan: Plan) {
  const ordered = sortedPlans.value
  const index = ordered.findIndex(item => item.id === plan.id)

  if (index <= 0) return

  const previousPlan = ordered[index - 1]

  const currentRank = plan.rank
  plan.rank = previousPlan!.rank
  previousPlan!.rank = currentRank

  normalizeRanks()

  console.log('Moved plan up:', plan.name)
}

function movePlanDown(plan: Plan) {
  const ordered = sortedPlans.value
  const index = ordered.findIndex(item => item.id === plan.id)

  if (index === -1 || index >= ordered.length - 1) return

  const nextPlan = ordered[index + 1]

  const currentRank = plan.rank
  plan.rank = nextPlan!.rank
  nextPlan!.rank = currentRank

  normalizeRanks()

  console.log('Moved plan down:', plan.name)
}


/* =========================================================
   PLAN DELETE
   ========================================================= */

function openDeleteDialog(plan: Plan) {
  planToDelete.value = plan
  showDeleteDialog.value = true
}

function closeDeleteDialog() {
  showDeleteDialog.value = false
  planToDelete.value = null
}

function deletePlan() {
  if (!planToDelete.value) return

  const planId = planToDelete.value.id

  plans.value = plans.value.filter(
    plan => plan.id !== planId,
  )

  normalizeRanks()

  closeDeleteDialog()
}


/* =========================================================
   OTHER ACTIONS
   ========================================================= */

function manageUsers() {
  navigateTo('/admin/users')
}

function viewPayments() {
  console.log('View subscription payments')
}

function viewActivity() {
  console.log('View subscription activity')
}
</script>

<template>
  <div class="admin-page">
    <!-- =====================================================
         PAGE HEADER
         ====================================================== -->

    <header class="page-header">
      <div>
        <div class="eyebrow">
          SUBSCRIPTIONS
        </div>

        <h1>
          Subscriptions
        </h1>

        <p>
          Manage subscription plans, pricing, tier hierarchy, recurring revenue, and billing activity.
        </p>
      </div>

      <button
        class="primary-button header-action"
        type="button"
        @click="openCreatePlanDialog"
      >
        Create Plan
      </button>
    </header>


    <!-- =====================================================
         SUBSCRIPTION OVERVIEW
         ====================================================== -->

    <section class="section">
      <div class="stats-grid">
        <article class="stat-card">
          <div class="stat-label">
            Active Subscriptions
          </div>

          <div class="stat-value status-neutral">
            {{ formatNumber(totalSubscribers) }}
          </div>

          <div class="stat-description">
            Currently active paid accounts
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-label">
            Monthly Recurring Revenue
          </div>

          <div class="stat-value status-success">
            {{ formatCurrency(monthlyRecurringRevenue) }}
          </div>

          <div class="stat-description">
            Current subscription revenue
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-label">
            New Subscriptions (30d)
          </div>

          <div class="stat-value status-success">
            {{ formatNumber(newSubscriptions30d) }}
          </div>

          <div class="stat-description">
            New subscriptions this month
          </div>
        </article>

        <article class="stat-card">
          <div class="stat-label">
            Cancellations (30d)
          </div>

          <div class="stat-value status-warning">
            {{ formatNumber(cancellations30d) }}
          </div>

          <div class="stat-description">
            Subscriptions cancelled this month
          </div>
        </article>
      </div>
    </section>


    <!-- =====================================================
         PLANS + HIERARCHY
         ====================================================== -->

    <section class="section">
      <div class="two-column">
        <!-- Plans -->

        <article class="panel">
          <div class="panel-header">
            <div>
              <div class="panel-label">
                PRODUCT
              </div>

              <h2>
                Subscription Plans
              </h2>

              <p>
                Configure pricing, features, status, and customer access.
              </p>
            </div>

            <button
              class="secondary-button"
              type="button"
              @click="openCreatePlanDialog"
            >
              Add Plan
            </button>
          </div>

          <div class="plan-list">
            <div
              v-for="plan in sortedPlans"
              :key="plan.id"
              class="plan-row"
            >
              <div class="plan-rank">
                <span>
                  {{ plan.rank }}
                </span>
              </div>

              <div class="plan-content">
                <div class="plan-title-row">
                  <div class="plan-title">
                    {{ plan.name }}
                  </div>

                  <span
                    class="status-badge"
                    :class="plan.active ? 'status-success' : 'status-neutral'"
                  >
                    {{ plan.active ? 'Active' : 'Inactive' }}
                  </span>
                </div>

                <div class="plan-description">
                  {{ plan.description }}
                </div>

                <div class="plan-feature-summary">
                  {{ plan.features.length }} features
                  ·
                  {{ formatNumber(plan.subscribers) }} subscribers
                </div>
              </div>

              <div class="plan-meta">
                <div class="plan-price">
                  {{ formatCurrency(plan.price) }}
                  <span>
                    / {{ plan.interval }}
                  </span>
                </div>
              </div>

              <div class="plan-actions">
                <button
                  class="icon-button"
                  type="button"
                  title="Move plan up"
                  :disabled="plan.rank === 1"
                  @click="movePlanUp(plan)"
                >
                  ↑
                </button>

                <button
                  class="icon-button"
                  type="button"
                  title="Move plan down"
                  :disabled="plan.rank === sortedPlans.length"
                  @click="movePlanDown(plan)"
                >
                  ↓
                </button>

                <button
                  class="small-button"
                  type="button"
                  @click="openEditPlanDialog(plan)"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div
            v-if="sortedPlans.length === 0"
            class="empty-state"
          >
            <div class="empty-title">
              No subscription plans
            </div>

            <div class="empty-description">
              Create your first subscription tier to get started.
            </div>

            <button
              class="primary-button"
              type="button"
              @click="openCreatePlanDialog"
            >
              Create Plan
            </button>
          </div>
        </article>


        <!-- Tier Hierarchy -->

        <article class="panel">
          <div class="panel-header">
            <div>
              <div class="panel-label">
                TIER STRUCTURE
              </div>

              <h2>
                Plan Hierarchy
              </h2>

              <p>
                The order below determines the progression from entry-level to highest tier.
              </p>
            </div>
          </div>

          <div class="hierarchy-list">
            <div
              v-for="(plan, index) in sortedPlans"
              :key="plan.id"
              class="hierarchy-row"
            >
              <div class="hierarchy-number">
                {{ index + 1 }}
              </div>

              <div class="hierarchy-content">
                <div class="hierarchy-title">
                  {{ plan.name }}
                </div>

                <div class="hierarchy-description">
                  {{ formatCurrency(plan.price) }}
                  / {{ plan.interval }}
                </div>
              </div>

              <span
                class="hierarchy-status"
                :class="plan.active ? 'enabled' : 'disabled'"
              >
                {{ plan.active ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>

          <div class="hierarchy-footer">
            <div>
              <strong>
                {{ activePlans.length }}
              </strong>

              active tiers
            </div>

            <div>
              Use the ↑ and ↓ controls to change tier order.
            </div>
          </div>
        </article>
      </div>
    </section>


    <!-- =====================================================
         SUBSCRIPTION MANAGEMENT + REVENUE
         ====================================================== -->

    <section class="section">
      <div class="two-column">
        <!-- Management -->

        <article class="panel">
          <div class="panel-header">
            <div>
              <div class="panel-label">
                ADMINISTRATION
              </div>

              <h2>
                Subscription Management
              </h2>

              <p>
                Administrative tools for managing customer subscriptions.
              </p>
            </div>
          </div>

          <div class="action-list">
            <div class="action-row">
              <div>
                <div class="action-title">
                  Manage Customer Subscription
                </div>

                <div class="action-description">
                  View, change, cancel, or restore a subscription for a selected account.
                </div>
              </div>

              <button
                class="action-button"
                type="button"
                @click="manageUsers"
              >
                Manage Users
              </button>
            </div>

            <div class="action-row">
              <div>
                <div class="action-title">
                  Review Failed Payments
                </div>

                <div class="action-description">
                  Review accounts with failed or unresolved subscription payments.
                </div>
              </div>

              <button
                class="action-button"
                type="button"
                @click="viewPayments"
              >
                View Payments
              </button>
            </div>

            <div class="action-row">
              <div>
                <div class="action-title">
                  Subscription Activity
                </div>

                <div class="action-description">
                  Review recent subscription creation, changes, cancellations, and payments.
                </div>
              </div>

              <button
                class="action-button"
                type="button"
                @click="viewActivity"
              >
                View Activity
              </button>
            </div>
          </div>
        </article>


        <!-- Revenue -->

        <article class="panel">
          <div class="panel-header">
            <div>
              <div class="panel-label">
                REVENUE
              </div>

              <h2>
                Revenue Summary
              </h2>

              <p>
                Current subscription revenue distribution.
              </p>
            </div>
          </div>

          <div class="revenue-list">
            <div class="revenue-row">
              <div>
                <div class="revenue-title">
                  Monthly Recurring Revenue
                </div>

                <div class="revenue-description">
                  Current recurring subscription revenue.
                </div>
              </div>

              <strong>
                {{ formatCurrency(monthlyRecurringRevenue) }}
              </strong>
            </div>

            <div class="revenue-row">
              <div>
                <div class="revenue-title">
                  Average Revenue Per User
                </div>

                <div class="revenue-description">
                  Average monthly revenue per active subscriber.
                </div>
              </div>

              <strong>
                {{ formatCurrency(averageRevenuePerUser) }}
              </strong>
            </div>

            <div class="revenue-row">
              <div>
                <div class="revenue-title">
                  New Revenue (30d)
                </div>

                <div class="revenue-description">
                  Recurring revenue added from new subscriptions.
                </div>
              </div>

              <strong class="positive">
                +{{ formatCurrency(newRevenue30d) }}
              </strong>
            </div>

            <div class="revenue-row">
              <div>
                <div class="revenue-title">
                  Lost Revenue (30d)
                </div>

                <div class="revenue-description">
                  Recurring revenue lost from cancellations.
                </div>
              </div>

              <strong class="negative">
                -{{ formatCurrency(lostRevenue30d) }}
              </strong>
            </div>
          </div>
        </article>
      </div>
    </section>


    <!-- =====================================================
         EVENTS
         ====================================================== -->

    <section class="section">
      <article class="panel">
        <div class="panel-header">
          <div>
            <div class="panel-label">
              BILLING ACTIVITY
            </div>

            <h2>
              Subscription Event Log
            </h2>

            <p>
              Recent subscription and payment activity.
            </p>
          </div>

          <button
            class="secondary-button"
            type="button"
            @click="viewActivity"
          >
            View All
          </button>
        </div>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>
                  Event
                </th>

                <th>
                  User
                </th>

                <th>
                  Plan
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Timestamp
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="event in subscriptionEvents"
                :key="event.id"
              >
                <td>
                  <div class="event-cell">
                    <span
                      class="event-marker"
                      :class="eventClass(event.type)"
                    ></span>

                    <span class="event-name">
                      {{ event.event }}
                    </span>
                  </div>
                </td>

                <td>
                  <span class="table-primary">
                    {{ event.user }}
                  </span>
                </td>

                <td>
                  <span class="table-primary">
                    {{ event.plan }}
                  </span>
                </td>

                <td>
                  <span
                    class="table-primary"
                    :class="{
                      positive:
                        event.type === 'payment' ||
                        event.type === 'created' ||
                        event.type === 'upgrade',
                      negative:
                        event.type === 'cancelled',
                    }"
                  >
                    {{ event.amount }}
                  </span>
                </td>

                <td>
                  <span class="table-muted timestamp">
                    {{ event.date }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </section>


    <!-- =====================================================
         PLAN DIALOG
         ====================================================== -->

    <Teleport to="body">
      <div
        v-if="showPlanDialog"
        class="dialog-overlay"
        @click.self="closePlanDialog"
      >
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="plan-dialog-title"
        >
          <div class="dialog-header">
            <div>
              <div class="panel-label">
                {{ planDialogMode === 'create' ? 'NEW PRODUCT' : 'PRODUCT CONFIGURATION' }}
              </div>

              <h2 id="plan-dialog-title">
                {{ planDialogTitle }}
              </h2>

              <p>
                Configure the pricing, access, and features for this subscription tier.
              </p>
            </div>

            <button
              class="dialog-close"
              type="button"
              aria-label="Close dialog"
              @click="closePlanDialog"
            >
              ×
            </button>
          </div>

          <div class="dialog-body">
            <div class="form-grid">
              <div class="form-group">
                <label for="plan-name">
                  Plan Name
                </label>

                <input
                  id="plan-name"
                  v-model="planName"
                  type="text"
                  placeholder="e.g. Pro"
                />
              </div>

              <div class="form-group">
                <label for="plan-price">
                  Price
                </label>

                <div class="input-with-prefix">
                  <span>$</span>

                  <input
                    id="plan-price"
                    v-model.number="planPrice"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="99"
                  />
                </div>
              </div>
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label for="plan-interval">
                  Billing Interval
                </label>

                <select
                  id="plan-interval"
                  v-model="planInterval"
                >
                  <option value="month">
                    Month
                  </option>

                  <option value="year">
                    Year
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label>
                  Plan Status
                </label>

                <button
                  class="dialog-status-toggle"
                  :class="{ enabled: planActive }"
                  type="button"
                  @click="planActive = !planActive"
                >
                  <span
                    class="switch"
                    :class="{ enabled: planActive }"
                  >
                    <span></span>
                  </span>

                  <span>
                    {{ planActive ? 'Active' : 'Inactive' }}
                  </span>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="plan-description">
                Description
              </label>

              <textarea
                id="plan-description"
                v-model="planDescription"
                rows="3"
                placeholder="Describe what this plan provides..."
              ></textarea>
            </div>

            <div class="form-group">
              <label>
                Features
              </label>

              <div class="feature-editor">
                <div
                  v-for="(feature, index) in planFeatures"
                  :key="`${feature}-${index}`"
                  class="feature-editor-row"
                >
                  <span class="feature-bullet">
                    •
                  </span>

                  <span class="feature-editor-text">
                    {{ feature }}
                  </span>

                  <button
                    class="remove-feature"
                    type="button"
                    title="Remove feature"
                    @click="removeFeature(index)"
                  >
                    ×
                  </button>
                </div>

                <div class="add-feature">
                  <input
                    v-model="newFeature"
                    type="text"
                    placeholder="Add a feature..."
                    @keydown="handleFeatureKeydown"
                  />

                  <button
                    class="secondary-button"
                    type="button"
                    @click="addFeature"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div class="form-hint">
                Press Enter or click Add to add a feature.
              </div>
            </div>

            <div
              v-if="planDialogMode === 'edit' && editingPlan"
              class="plan-metadata"
            >
              <div>
                <span>
                  Plan ID
                </span>

                <strong>
                  {{ editingPlan.id }}
                </strong>
              </div>

              <div>
                <span>
                  Subscribers
                </span>

                <strong>
                  {{ formatNumber(editingPlan.subscribers) }}
                </strong>
              </div>

              <div>
                <span>
                  Tier Rank
                </span>

                <strong>
                  {{ editingPlan.rank }}
                </strong>
              </div>
            </div>
          </div>

          <div class="dialog-footer">
            <button
              v-if="planDialogMode === 'edit'"
              class="danger-button"
              type="button"
              @click="
                editingPlan &&
                (closePlanDialog(), openDeleteDialog(editingPlan))
              "
            >
              Delete Plan
            </button>

            <div class="dialog-footer-spacer"></div>

            <button
              class="secondary-button"
              type="button"
              @click="closePlanDialog"
            >
              Cancel
            </button>

            <button
              class="primary-button"
              type="button"
              :disabled="!canSavePlan"
              @click="savePlan"
            >
              {{ planDialogMode === 'create' ? 'Create Plan' : 'Save Changes' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>


    <!-- =====================================================
         DELETE DIALOG
         ====================================================== -->

    <Teleport to="body">
      <div
        v-if="showDeleteDialog"
        class="dialog-overlay"
        @click.self="closeDeleteDialog"
      >
        <div
          class="dialog dialog-small"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <div class="dialog-header">
            <div>
              <div class="panel-label">
                DANGER ZONE
              </div>

              <h2 id="delete-dialog-title">
                Delete Plan
              </h2>

              <p>
                This action cannot be undone.
              </p>
            </div>

            <button
              class="dialog-close"
              type="button"
              aria-label="Close dialog"
              @click="closeDeleteDialog"
            >
              ×
            </button>
          </div>

          <div class="dialog-body">
            <div class="delete-warning">
              <div class="delete-warning-title">
                Delete "{{ planToDelete?.name }}"?
              </div>

              <div class="delete-warning-description">
                The plan will be removed from your subscription configuration.
                Existing subscribers should be migrated before deleting a live plan.
              </div>
            </div>
          </div>

          <div class="dialog-footer">
            <div class="dialog-footer-spacer"></div>

            <button
              class="secondary-button"
              type="button"
              @click="closeDeleteDialog"
            >
              Cancel
            </button>

            <button
              class="danger-button danger-filled"
              type="button"
              @click="deletePlan"
            >
              Delete Plan
            </button>
          </div>
        </div>
      </div>
    </Teleport>
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
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.eyebrow,
.panel-label {
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
  max-width: 700px;
  margin: 0.35rem 0 0;
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1.45;
}


/* =========================================================
   SECTIONS
   ========================================================= */

.section {
  margin-bottom: 1.5rem;
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
  font-size: 0.75rem;
  font-weight: 500;
}

.stat-value {
  margin-top: 0.4rem;
  font-size: 1.65rem;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.status-success {
  color: #16a34a;
}

.status-warning {
  color: #d97706;
}

.status-danger {
  color: #dc2626;
}

.status-neutral {
  color: var(--text-main);
}

.stat-description {
  margin-top: 0.45rem;
  color: var(--text-muted);
  font-size: 0.72rem;
}


/* =========================================================
   GRID
   ========================================================= */

.two-column {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 1.25rem;
}


/* =========================================================
   PANELS
   ========================================================= */

.panel {
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 6px;
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.15rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.panel-header h2 {
  margin: 0.3rem 0 0;
  color: var(--text-main);
  font-size: 0.95rem;
  font-weight: 600;
}

.panel-header p {
  max-width: 600px;
  margin: 0.3rem 0 0;
  color: var(--text-muted);
  font-size: 0.76rem;
  line-height: 1.4;
}


/* =========================================================
   PLANS
   ========================================================= */

.plan-list {
  display: flex;
  flex-direction: column;
}

.plan-row {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 0.9rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.plan-row:last-child {
  border-bottom: none;
}

.plan-rank {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-muted);
  font-family: monospace;
  font-size: 0.68rem;
  font-weight: 600;
}

.plan-content {
  min-width: 0;
}

.plan-title-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.plan-title {
  color: var(--text-main);
  font-size: 0.82rem;
  font-weight: 600;
}

.plan-description {
  max-width: 420px;
  margin-top: 0.25rem;
  color: var(--text-muted);
  font-size: 0.73rem;
  line-height: 1.45;
}

.plan-feature-summary {
  margin-top: 0.35rem;
  color: var(--text-muted);
  font-size: 0.66rem;
}

.plan-meta {
  min-width: 100px;
  text-align: right;
}

.plan-price {
  color: var(--text-main);
  font-family: monospace;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
}

.plan-price span {
  color: var(--text-muted);
  font-size: 0.64rem;
  font-weight: 400;
}

.plan-actions {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.status-badge {
  flex-shrink: 0;
  padding: 0.25rem 0.45rem;
  border: 1px solid currentColor;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.59rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}


/* =========================================================
   HIERARCHY
   ========================================================= */

.hierarchy-list {
  display: flex;
  flex-direction: column;
}

.hierarchy-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.9rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.hierarchy-row:last-child {
  border-bottom: none;
}

.hierarchy-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 4px;
  background: var(--bg-main);
  color: var(--text-muted);
  font-family: monospace;
  font-size: 0.68rem;
  font-weight: 600;
}

.hierarchy-content {
  min-width: 0;
  flex: 1;
}

.hierarchy-title {
  color: var(--text-main);
  font-size: 0.8rem;
  font-weight: 600;
}

.hierarchy-description {
  margin-top: 0.2rem;
  color: var(--text-muted);
  font-family: monospace;
  font-size: 0.67rem;
}

.hierarchy-status {
  flex-shrink: 0;
  font-family: monospace;
  font-size: 0.61rem;
  font-weight: 600;
  text-transform: uppercase;
}

.hierarchy-status.enabled {
  color: #16a34a;
}

.hierarchy-status.disabled {
  color: var(--text-muted);
}

.hierarchy-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1.25rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-muted);
  font-size: 0.68rem;
}

.hierarchy-footer strong {
  color: var(--text-main);
}


/* =========================================================
   BUTTONS
   ========================================================= */

.primary-button,
.secondary-button,
.action-button,
.small-button,
.icon-button,
.danger-button {
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    opacity 0.15s ease;
}

.primary-button {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--accent-color);
  background: var(--accent-color);
  color: #fff;
}

.primary-button:hover:not(:disabled) {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
}

.primary-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.secondary-button,
.action-button,
.small-button {
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--border-color);
  background: var(--bg-main);
  color: var(--text-main);
}

.secondary-button:hover,
.action-button:hover,
.small-button:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.header-action {
  flex-shrink: 0;
}

.icon-button {
  width: 26px;
  height: 26px;
  padding: 0;
  border: 1px solid var(--border-color);
  background: var(--bg-main);
  color: var(--text-muted);
}

.icon-button:hover:not(:disabled) {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.icon-button:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}


/* =========================================================
   STATUS
   ========================================================= */

.status-success {
  color: #16a34a;
}

.status-neutral {
  color: var(--text-muted);
}


/* =========================================================
   ACTIONS
   ========================================================= */

.action-list {
  display: flex;
  flex-direction: column;
}

.action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.action-row:last-child {
  border-bottom: none;
}

.action-row > div:first-child {
  min-width: 0;
}

.action-title {
  color: var(--text-main);
  font-size: 0.82rem;
  font-weight: 600;
}

.action-description {
  max-width: 500px;
  margin-top: 0.25rem;
  color: var(--text-muted);
  font-size: 0.73rem;
  line-height: 1.45;
}

.action-button {
  flex-shrink: 0;
}


/* =========================================================
   REVENUE
   ========================================================= */

.revenue-list {
  display: flex;
  flex-direction: column;
}

.revenue-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.revenue-row:last-child {
  border-bottom: none;
}

.revenue-row > div {
  min-width: 0;
}

.revenue-title {
  color: var(--text-main);
  font-size: 0.82rem;
  font-weight: 600;
}

.revenue-description {
  max-width: 500px;
  margin-top: 0.25rem;
  color: var(--text-muted);
  font-size: 0.73rem;
  line-height: 1.45;
}

.revenue-row strong {
  flex-shrink: 0;
  color: var(--text-main);
  font-family: monospace;
  font-size: 0.78rem;
  white-space: nowrap;
}

.positive {
  color: #16a34a !important;
}

.negative {
  color: #dc2626 !important;
}


/* =========================================================
   TABLE
   ========================================================= */

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.78rem;
}

thead {
  background: var(--bg-main);
  border-bottom: 1px solid var(--border-color);
}

th {
  padding: 0.7rem 1.25rem;
  color: var(--text-muted);
  font-family: monospace;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  white-space: nowrap;
}

td {
  padding: 0.85rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  vertical-align: middle;
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr {
  transition: background-color 0.15s ease;
}

tbody tr:hover {
  background: color-mix(
    in srgb,
    var(--bg-main) 65%,
    transparent
  );
}

.event-cell {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  white-space: nowrap;
}

.event-marker {
  width: 5px;
  height: 16px;
  flex-shrink: 0;
}

.event-default {
  background: var(--border-color);
}

.event-admin {
  background: var(--accent-color);
}

.event-warning {
  background: #d97706;
}

.event-name {
  color: var(--text-main);
  font-weight: 600;
}

.table-primary {
  color: var(--text-main);
  white-space: nowrap;
}

.table-muted {
  color: var(--text-muted);
  white-space: nowrap;
}

.timestamp {
  font-variant-numeric: tabular-nums;
}


/* =========================================================
   EMPTY STATE
   ========================================================= */

.empty-state {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2.5rem 1.25rem;
  text-align: center;
}

.empty-title {
  color: var(--text-main);
  font-size: 0.85rem;
  font-weight: 600;
}

.empty-description {
  margin-bottom: 0.5rem;
  color: var(--text-muted);
  font-size: 0.73rem;
}


/* =========================================================
   DIALOG
   ========================================================= */

.dialog-overlay {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
}

.dialog {
  width: min(680px, 100%);
  max-height: calc(100vh - 3rem);
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 7px;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.2),
    0 5px 15px rgba(0, 0, 0, 0.08);
}

.dialog-small {
  width: min(480px, 100%);
}

.dialog-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.dialog-header h2 {
  margin: 0.3rem 0 0;
  color: var(--text-main);
  font-size: 1rem;
  font-weight: 600;
}

.dialog-header p {
  max-width: 520px;
  margin: 0.3rem 0 0;
  color: var(--text-muted);
  font-size: 0.75rem;
  line-height: 1.45;
}

.dialog-close {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-main);
  color: var(--text-muted);
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
}

.dialog-close:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.dialog-body {
  max-height: calc(100vh - 12rem);
  overflow-y: auto;
  padding: 0.25rem 0 1.25rem;
}

.dialog-footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--border-color);
}

.dialog-footer-spacer {
  flex: 1;
}


/* =========================================================
   FORMS
   ========================================================= */

.form-group {
  margin: 1rem 1.25rem 0;
}

.dialog-body > .form-group:first-child {
  margin-top: 1.25rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.4rem;
  color: var(--text-main);
  font-size: 0.73rem;
  font-weight: 600;
}

input,
textarea,
select {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  outline: none;
  background: var(--bg-main);
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.8rem;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

input {
  height: 36px;
  padding: 0 0.65rem;
}

textarea {
  min-height: 80px;
  padding: 0.7rem;
  resize: vertical;
}

select {
  height: 36px;
  padding: 0 0.65rem;
}

input::placeholder,
textarea::placeholder {
  color: var(--text-muted);
  opacity: 0.75;
}

input:focus,
textarea:focus,
select:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px color-mix(
    in srgb,
    var(--accent-color) 10%,
    transparent
  );
}

.input-with-prefix {
  position: relative;
}

.input-with-prefix > span {
  position: absolute;
  top: 50%;
  left: 0.65rem;
  z-index: 1;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-family: monospace;
  font-size: 0.75rem;
  pointer-events: none;
}

.input-with-prefix input {
  padding-left: 1.35rem;
}

.form-hint {
  margin-top: 0.4rem;
  color: var(--text-muted);
  font-size: 0.65rem;
}


/* =========================================================
   DIALOG STATUS
   ========================================================= */

.dialog-status-toggle {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  height: 36px;
  padding: 0 0.65rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-main);
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.75rem;
  text-align: left;
  cursor: pointer;
}


/* =========================================================
   TOGGLE
   ========================================================= */

.switch {
  position: relative;
  display: inline-block;
  width: 38px;
  height: 21px;
  flex-shrink: 0;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--bg-main);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.switch > span {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--text-muted);
  transition:
    transform 0.15s ease,
    background-color 0.15s ease;
}

.switch.enabled {
  border-color: var(--accent-color);
  background: var(--accent-color);
}

.switch.enabled > span {
  background: #fff;
  transform: translateX(17px);
}


/* =========================================================
   FEATURE EDITOR
   ========================================================= */

.feature-editor {
  overflow: hidden;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.feature-editor-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 36px;
  padding: 0.45rem 0.65rem;
  border-bottom: 1px solid var(--border-color);
}

.feature-bullet {
  color: var(--accent-color);
  font-size: 0.85rem;
}

.feature-editor-text {
  min-width: 0;
  flex: 1;
  color: var(--text-main);
  font-size: 0.75rem;
}

.remove-feature {
  width: 22px;
  height: 22px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 1rem;
  cursor: pointer;
}

.remove-feature:hover {
  color: #dc2626;
}

.add-feature {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--bg-main);
}

.add-feature input {
  height: 32px;
}

.add-feature .secondary-button {
  flex-shrink: 0;
}


/* =========================================================
   PLAN METADATA
   ========================================================= */

.plan-metadata {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin: 1rem 1.25rem 0;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-main);
}

.plan-metadata > div {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.plan-metadata span {
  color: var(--text-muted);
  font-size: 0.63rem;
  text-transform: uppercase;
}

.plan-metadata strong {
  overflow: hidden;
  color: var(--text-main);
  font-family: monospace;
  font-size: 0.68rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}


/* =========================================================
   DANGER
   ========================================================= */

.danger-button {
  padding: 0.5rem 0.7rem;
  border: 1px solid #fecaca;
  background: transparent;
  color: #dc2626;
}

.danger-button:hover {
  border-color: #dc2626;
  background: #fef2f2;
}

.danger-filled {
  border-color: #dc2626;
  background: #dc2626;
  color: #fff;
}

.danger-filled:hover {
  background: #b91c1c;
  border-color: #b91c1c;
}

.delete-warning {
  margin: 1.25rem;
  padding: 0.9rem;
  border: 1px solid #fecaca;
  border-radius: 4px;
  background: #fef2f2;
}

.delete-warning-title {
  color: #991b1b;
  font-size: 0.82rem;
  font-weight: 600;
}

.delete-warning-description {
  margin-top: 0.35rem;
  color: #b91c1c;
  font-size: 0.72rem;
  line-height: 1.5;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .two-column {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .plan-row {
    grid-template-columns: 28px minmax(0, 1fr) auto;
  }

  .plan-meta {
    grid-column: 2;
    text-align: left;
  }

  .plan-actions {
    grid-column: 3;
    grid-row: 1 / span 2;
  }
}

@media (max-width: 700px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .header-action {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .panel-header {
    flex-direction: column;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .plan-row {
    grid-template-columns: 28px minmax(0, 1fr);
    align-items: start;
  }

  .plan-meta {
    grid-column: 2;
    grid-row: 2;
  }

  .plan-actions {
    grid-column: 2;
    grid-row: 3;
    justify-content: flex-start;
  }

  .plan-title-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.35rem;
  }

  .action-row,
  .revenue-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .action-button {
    width: 100%;
    text-align: center;
  }

  .hierarchy-footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .dialog-overlay {
    align-items: flex-end;
    padding: 0;
  }

  .dialog {
    width: 100%;
    max-height: 92vh;
    border-radius: 7px 7px 0 0;
  }

  .plan-metadata {
    grid-template-columns: 1fr;
  }

  .dialog-footer {
    flex-wrap: wrap;
  }
}
</style>
