<template>
  <div class="workspace-layout">
    
    <aside class="sidebar">
      <div class="sidebar-header">
        <NuxtLink to="/" class="back-link">← Back to Home</NuxtLink>
      </div>
      
      <div class="control-panel">
        <h2 class="panel-title">Data Selection</h2>

        <div class="control-group">
          <label>Trading Date</label>
          <select v-model="selectedDate">
            <option v-for="date in availableDates" :key="date" :value="date">
              {{ date }}
            </option>
          </select>
        </div>

        <div class="control-group">
          <label>Contract Type</label>
          <select v-model="selectedRight" @change="fetchChartData">
            <option value="C">Call</option>
            <option value="P">Put</option>
          </select>
        </div>

        <div class="control-group">
          <label>Strike Price</label>
          <select v-model="selectedStrike" @change="fetchChartData">
            <option v-for="strike in availableStrikes" :key="strike" :value="strike">
              ${{ strike.toFixed(2) }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="sidebar-footer">
        <div class="status-indicator">
          <span class="status-dot"></span>
          Connected to Market Data
        </div>
      </div>
    </aside>

    <main class="main-content">
      
      <header class="dashboard-header">
        <div class="ticker-block">
          <h1 class="ticker">SPY {{ selectedStrike }}{{ selectedRight }}</h1>
          <span class="expiry">0DTE &bull; {{ formatDate(selectedDate) }}</span>
        </div>
        <div class="status-block">
          <span v-if="isLoading" class="loading-text">Loading chart data...</span>
          <span v-else-if="chartData.length > 0" class="success-text">Loaded {{ chartData.length.toLocaleString() }} ticks</span>
          <span v-else class="error-text">No data available for this selection</span>
        </div>
      </header>

      <div class="chart-container">
        <div class="chart-wrapper" v-if="chartData.length > 0 && !isLoading">
          <OptionsChart 
            :data="chartData" 
            :title="`SPY ${selectedStrike}${selectedRight}`" 
          />
        </div>
        
        <div class="empty-state" v-else>
          <div v-if="isLoading" class="spinner"></div>
          <p v-else>Please select a contract to view historical data.</p>
        </div>
      </div>

      <details class="data-table-container" v-if="chartData.length > 0">
        <summary>View Raw Data ({{ chartData.length }} Rows)</summary>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in chartData.slice(0, 100)" :key="row.time">
                <td class="time-col">{{ new Date(row.time * 1000).toLocaleTimeString('en-US', { hour12: false }) }}</td>
                <td>{{ row.open.toFixed(2) }}</td>
                <td>{{ row.high.toFixed(2) }}</td>
                <td>{{ row.low.toFixed(2) }}</td>
                <td>{{ row.close.toFixed(2) }}</td>
                <td class="vol-col">{{ row.value.toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
          <div class="table-footer" v-if="chartData.length > 100">
            Showing the first 100 rows.
          </div>
        </div>
      </details>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useDuckDb } from '~/composables/useDuckDb';
import OptionsChart from '~/components/OptionsChart.vue';

const { getContractData } = useDuckDb();
const config = useRuntimeConfig();

const isLoading = ref(false);
const chartData = ref([]);
const metadata = ref({});

const selectedDate = ref('');
const selectedRight = ref('C');
const selectedStrike = ref(null);

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { 
    year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' 
  });
};

const availableDates = computed(() => {
  return Object.keys(metadata.value).sort((a, b) => new Date(b) - new Date(a));
});

const availableStrikes = computed(() => {
  if (!metadata.value[selectedDate.value]) return [];
  return metadata.value[selectedDate.value][selectedRight.value] || [];
});

const fetchMetadata = async () => {
  try {
    const res = await $fetch('/api/metadata');
    metadata.value = res;
    if (availableDates.value.length > 0) {
      selectedDate.value = availableDates.value[0];
    }
  } catch (e) {
    console.error("Failed to fetch folder metadata", e);
  }
};

const fetchChartData = async () => {
  if (!selectedDate.value || !selectedStrike.value) return;
  
  isLoading.value = true;
  chartData.value = [];

  try {
    const fileName = `part-${selectedStrike.value}-${selectedRight.value}.parquet`;
    const baseUrl = config.public.dataBaseUrl;
    
    // Calls the secure streaming API: /api/secure-data/day_str=.../part-...parquet
    const fileUrl = `${baseUrl}/day_str=${selectedDate.value}/${fileName}`;

    chartData.value = await getContractData(fileUrl, fileName);
  } catch (error) {
    console.warn("Target contract not found.");
  } finally {
    isLoading.value = false;
  }
};

watch(availableStrikes, (newStrikes) => {
  if (newStrikes.length > 0 && !newStrikes.includes(selectedStrike.value)) {
    const midIdx = Math.floor(newStrikes.length / 2);
    selectedStrike.value = newStrikes[midIdx];
  }
});

watch([selectedDate, selectedRight, selectedStrike], () => {
  if (selectedDate.value && selectedStrike.value) {
    fetchChartData();
  }
});

onMounted(async () => {
  await fetchMetadata();
});
</script>

<style scoped>
/* --- Global Workspace Layout --- */
.workspace-layout {
  display: flex;
  height: 100vh; /* Changed from min-height */
  width: 100vw;
  overflow: hidden;
  background-color: var(--bg-main);
  color: var(--text-main);
}

/* --- Left Sidebar --- */
.sidebar {
  width: 320px;
  background-color: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.sidebar-header {
  margin-bottom: 2.5rem;
}

.back-link {
  color: var(--text-muted);
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link:hover { color: var(--text-main); }

.panel-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 1.5rem;
}

.control-group { margin-bottom: 1.5rem; }

.control-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

select {
  width: 100%;
  padding: 0.65rem 0.75rem;
  background-color: var(--bg-main);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  border-radius: 6px; /* Softened edges */
  font-size: 0.95rem;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
}

select:focus, select:hover { 
  border-color: var(--accent-color); 
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1); /* Subtle focus ring */
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.status-indicator { 
  display: flex; 
  align-items: center; 
  gap: 0.5rem; 
  color: var(--text-muted); 
  font-size: 0.85rem; 
  font-weight: 500;
}
.status-dot { 
  width: 8px; 
  height: 8px; 
  background-color: #10B981; 
  border-radius: 50%; 
}

/* --- Main Dashboard Area --- */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  height: 100%; /* Changed from 100vh */
  overflow-y: auto; /* Now ONLY the main dashboard area scrolls if the table gets too long */
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.ticker {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  letter-spacing: -0.5px;
  color: var(--text-main);
}

.expiry {
  color: var(--text-muted);
  font-size: 1rem;
  font-weight: 500;
}

.status-block { font-size: 0.95rem; font-weight: 500; }
.loading-text { color: var(--text-muted); }
.success-text { color: var(--text-muted); }
.error-text { color: #ef4444; }

/* --- Chart Area --- */
.chart-container {
  flex: 1;
  min-height: 500px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 2rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.chart-wrapper { width: 100%; height: 100%; padding: 1rem; }

.empty-state {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-weight: 500;
}

.spinner {
  width: 24px; height: 24px;
  border: 2px solid var(--border-color);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* --- Raw Data Table --- */
.data-table-container {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.data-table-container summary {
  padding: 1rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-main);
  cursor: pointer;
  user-select: none;
  background-color: var(--bg-main);
  border-bottom: 1px solid transparent;
}

.data-table-container[open] summary { 
  border-bottom-color: var(--border-color); 
}

.table-scroll {
  max-height: 400px;
  overflow-y: auto;
  padding: 0;
}

table { 
  width: 100%; 
  border-collapse: collapse; 
}

th { 
  text-align: right; 
  padding: 0.75rem 1.5rem; 
  color: var(--text-muted); 
  font-weight: 600; 
  font-size: 0.85rem;
  border-bottom: 1px solid var(--border-color); 
  background-color: var(--bg-main);
  position: sticky;
  top: 0;
}
th:first-child { text-align: left; }

td { 
  text-align: right; 
  padding: 0.75rem 1.5rem; 
  color: var(--text-main); 
  border-bottom: 1px solid var(--border-color); 
  /* Forces numbers to perfectly align vertically */
  font-variant-numeric: tabular-nums; 
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9rem;
}
td:first-child { text-align: left; }

.table-footer { 
  padding: 1rem 1.5rem; 
  font-size: 0.85rem; 
  color: var(--text-muted); 
  background-color: var(--bg-main);
}

/* Animations */
@keyframes spin { to { transform: rotate(360deg); } }
</style>