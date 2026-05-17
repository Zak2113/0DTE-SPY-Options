<template>
  <div class="workspace-layout">
    
    <aside class="sidebar">
      <div class="sidebar-header">
        <NuxtLink to="/" class="back-link">← Back to Home</NuxtLink>
      </div>
      
      <div class="control-panel flex-1 flex flex-col min-h-0">
        
        <div class="calendar-container mb-4">
          <h2 class="panel-title">Trading Date</h2>
          <MiniCalendar 
            v-model="selectedDate" 
            :availableDates="availableDates" 
          />
        </div>
        <br></br>
        <div class="ruler-container flex-1 overflow-hidden mt-4">
          <VerticalStrikeRuler 
            v-if="selectedDate"
            :metadata="metadata" 
            :currentDate="selectedDate"
            @load-contract="handleContractLoad" 
          />
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
          <h1 class="ticker">
            {{ selectedStrike ? `SPY ${selectedStrike}${selectedRight}` : 'Select a Contract' }}
          </h1>
          <span class="expiry" v-if="selectedDate">0DTE &bull; {{ formatDate(selectedDate) }}</span>
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
          <p v-else>Please select a contract from the sidebar to view history.</p>
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
import { ref, computed, onMounted } from 'vue';
import { useDuckDb } from '~/composables/useDuckDb';
import OptionsChart from '~/components/OptionsChart.vue';
import VerticalStrikeRuler from '~/components/VerticalStrikeRuler.vue'; // <-- UPDATED IMPORT

const { getContractData } = useDuckDb();
const config = useRuntimeConfig();

const isLoading = ref(false);
const chartData = ref([]);
const metadata = ref({});

// Global selection state
const selectedDate = ref('');
const selectedRight = ref('');
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

const fetchMetadata = async () => {
  try {
    const res = await $fetch('/api/metadata');
    metadata.value = res;
    if (availableDates.value.length > 0) {
      selectedDate.value = availableDates.value[0]; // Auto-select latest date
    }
  } catch (e) {
    console.error("Failed to fetch folder metadata", e);
  }
};

const handleContractLoad = async (payload) => {
  selectedDate.value = payload.date;
  selectedStrike.value = payload.strike;
  selectedRight.value = payload.right;
  
  isLoading.value = true;
  chartData.value = [];

  try {
    const baseUrl = config.public.dataBaseUrl;
    const fileUrl = `${baseUrl}/day_str=${payload.date}/${payload.fileName}`;
    chartData.value = await getContractData(fileUrl, payload.fileName);
  } catch (error) {
    console.warn("Target contract not found.");
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchMetadata();
});
</script>

<style scoped>
/* --- Global Workspace Layout --- */
.workspace-layout {
  display: flex;
  height: 100vh; 
  width: 100vw;
  overflow: hidden;
  background-color: var(--bg-main);
  color: var(--text-main);
}

/* --- Left Sidebar --- */
.sidebar {
  width: 340px; /* Widened slightly to give the ladder breathing room */
  background-color: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem; /* Adjusted padding */
}

.sidebar-header { margin-bottom: 2rem; }
.back-link { color: var(--text-muted); font-size: 0.95rem; font-weight: 500; transition: color 0.2s; text-decoration: none;}
.back-link:hover { color: var(--text-main); }

.control-panel {
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevents sidebar from breaking bounds */
}

.panel-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 0.75rem;
}

/* --- THE NEW DATE STRIP --- */
.date-strip-container {
  margin-bottom: 1rem;
}

.date-strip {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

/* Hide scrollbar visually but keep functionality */
.date-strip::-webkit-scrollbar { height: 4px; }
.date-strip::-webkit-scrollbar-track { background: transparent; }
.date-strip::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }

.date-pill {
  white-space: nowrap;
  padding: 0.4rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 999px; 
  border: 1px solid var(--border-color);
  background-color: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.date-pill:hover {
  color: var(--text-main);
  border-color: var(--text-muted);
}

.date-pill-active {
  background-color: var(--accent-color, #3b82f6); 
  color: white;
  border-color: var(--accent-color, #3b82f6);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* --- Ruler Container Wrapper --- */
.ruler-container {
  /* This ensures the vertical ladder fills exactly the remaining height of the sidebar */
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; 
}

/* ... (Keep all your existing Main Content, Dashboard Header, Chart, and Table CSS below here exactly as they were) ... */

.sidebar-footer {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}
.status-indicator { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.85rem; font-weight: 500;}
.status-dot { width: 8px; height: 8px; background-color: #10B981; border-radius: 50%; }
.main-content { flex: 1; display: flex; flex-direction: column; padding: 2.5rem; height: 100%; overflow-y: auto; }
.dashboard-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color); }
.ticker { font-size: 2.2rem; font-weight: 700; margin: 0 0 0.25rem 0; letter-spacing: -0.5px; color: var(--text-main); }
.expiry { color: var(--text-muted); font-size: 1rem; font-weight: 500; }
.status-block { font-size: 0.95rem; font-weight: 500; }
.loading-text { color: var(--text-muted); }
.success-text { color: var(--text-muted); }
.error-text { color: #ef4444; }
.chart-container { flex: 1; min-height: 500px; background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; display: flex; flex-direction: column; position: relative; margin-bottom: 2rem; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
.chart-wrapper { width: 100%; height: 100%; padding: 1rem; }
.empty-state { position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-weight: 500; }
.spinner { width: 24px; height: 24px; border: 2px solid var(--border-color); border-top-color: var(--accent-color); border-radius: 50%; animation: spin 0.8s linear infinite; }
.data-table-container { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; }
.data-table-container summary { padding: 1rem 1.5rem; font-size: 0.95rem; font-weight: 600; color: var(--text-main); cursor: pointer; user-select: none; background-color: var(--bg-main); border-bottom: 1px solid transparent; }
.data-table-container[open] summary { border-bottom-color: var(--border-color); }
.table-scroll { max-height: 400px; overflow-y: auto; padding: 0; }
table { width: 100%; border-collapse: collapse; }
th { text-align: right; padding: 0.75rem 1.5rem; color: var(--text-muted); font-weight: 600; font-size: 0.85rem; border-bottom: 1px solid var(--border-color); background-color: var(--bg-main); position: sticky; top: 0; }
th:first-child { text-align: left; }
td { text-align: right; padding: 0.75rem 1.5rem; color: var(--text-main); border-bottom: 1px solid var(--border-color); font-variant-numeric: tabular-nums; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.9rem; }
td:first-child { text-align: left; }
.table-footer { padding: 1rem 1.5rem; font-size: 0.85rem; color: var(--text-muted); background-color: var(--bg-main); }
@keyframes spin { to { transform: rotate(360deg); } }
</style>