<template>
  <div class="mini-calendar-wrapper">
    
    <div class="calendar-header">
      <button @click="prevMonth" class="cal-nav-btn">‹</button>
      <div class="cal-month-title">{{ monthNames[displayMonth] }} {{ displayYear }}</div>
      <button @click="nextMonth" class="cal-nav-btn">›</button>
    </div>

    <div class="calendar-grid">
      <div v-for="day in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="day" class="cal-day-header">
        {{ day }}
      </div>

      <div v-for="n in firstDayOffset" :key="`empty-${n}`" class="cal-cell empty-cell"></div>

      <button
        v-for="day in daysInMonth"
        :key="day.dateStr"
        @click="day.isAvailable && selectDate(day.dateStr)"
        class="cal-cell day-btn"
        :class="{
          'is-available': day.isAvailable,
          'is-unavailable': !day.isAvailable,
          'is-selected': modelValue === day.dateStr
        }"
        :disabled="!day.isAvailable"
      >
        {{ day.dayNum }}
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  availableDates: { type: Array, required: true },
  modelValue: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue']);

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Internal state for which month we are *looking* at
const displayMonth = ref(new Date().getMonth());
const displayYear = ref(new Date().getFullYear());

// Sync the visible calendar page with the actual selected date
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    const [y, m] = newVal.split('-');
    displayYear.value = parseInt(y);
    displayMonth.value = parseInt(m) - 1; // 0-indexed month
  }
}, { immediate: true });

const prevMonth = () => {
  if (displayMonth.value === 0) {
    displayMonth.value = 11;
    displayYear.value--;
  } else {
    displayMonth.value--;
  }
};

const nextMonth = () => {
  if (displayMonth.value === 11) {
    displayMonth.value = 0;
    displayYear.value++;
  } else {
    displayMonth.value++;
  }
};

// Math to figure out what day of the week the 1st falls on
const firstDayOffset = computed(() => {
  return new Date(displayYear.value, displayMonth.value, 1).getDay();
});

// Generate the array of days for the grid
const daysInMonth = computed(() => {
  const numDays = new Date(displayYear.value, displayMonth.value + 1, 0).getDate();
  const days = [];

  for (let i = 1; i <= numDays; i++) {
    // Format to YYYY-MM-DD so it exactly matches your backend Parquet strings
    const mm = String(displayMonth.value + 1).padStart(2, '0');
    const dd = String(i).padStart(2, '0');
    const dateStr = `${displayYear.value}-${mm}-${dd}`;

    days.push({
      dayNum: i,
      dateStr: dateStr,
      isAvailable: props.availableDates.includes(dateStr)
    });
  }
  return days;
});

const selectDate = (dateStr) => {
  emit('update:modelValue', dateStr);
};
</script>

<style scoped>
.mini-calendar-wrapper {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  user-select: none;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.cal-month-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-main);
}

.cal-nav-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 0.5rem;
  transition: color 0.2s;
}
.cal-nav-btn:hover { color: var(--text-main); }

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  text-align: center;
}

.cal-day-header {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.cal-cell {
  aspect-ratio: 1; /* Makes every button a perfect square */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 4px;
}

.day-btn {
  border: 1px solid transparent;
  background: transparent;
  transition: all 0.2s;
}

.is-available {
  color: var(--text-main);
  background-color: var(--bg-main);
  border-color: var(--border-color);
  cursor: pointer;
}
.is-available:hover {
  border-color: var(--text-muted);
  background-color: rgba(128, 128, 128, 0.1);
}

.is-unavailable {
  color: var(--text-muted);
  opacity: 0.3;
  cursor: not-allowed;
}

.is-selected {
  background-color: var(--accent-color, #3b82f6);
  color: white;
  border-color: var(--accent-color, #3b82f6);
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.is-selected:hover {
  background-color: var(--accent-color, #3b82f6); /* Overrides the hover if selected */
  opacity: 0.9;
}
</style>