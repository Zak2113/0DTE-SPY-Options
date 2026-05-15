<template>
  <div class="charts-wrapper">
    <div ref="candleChart" class="plotly-chart"></div>
    <div ref="volChart" class="plotly-chart mt-4"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, toRaw } from 'vue';
import { useColorMode } from '#imports';

const props = defineProps({
  data: { type: Array, required: true },
  title: { type: String, default: 'Option Data' }
});

const candleChart = ref(null);
const volChart = ref(null);
const colorMode = useColorMode();
let Plotly = null;

// Dynamic Theme Colors for Plotly
const getLayoutColors = () => {
  return colorMode.value === 'dark' 
    ? { bg: '#0E1117', text: '#FAFAFA', grid: '#262730' }
    : { bg: '#ffffff', text: '#111827', grid: '#e5e7eb' };
};

const renderCharts = (rawData) => {
  if (!Plotly || !rawData || rawData.length === 0) return;

  const times = rawData.map(d => new Date(d.time * 1000));
  const opens = rawData.map(d => d.open);
  const highs = rawData.map(d => d.high);
  const lows = rawData.map(d => d.low);
  const closes = rawData.map(d => d.close);
  const volumes = rawData.map(d => d.value); 
  const colors = rawData.map(d => d.color);

  const theme = getLayoutColors();

  // CANDLESTICK TRACE
  const candleTrace = {
    x: times, open: opens, high: highs, low: lows, close: closes,
    type: 'candlestick', name: props.title,
    increasing: { line: { color: '#10B981' } },
    decreasing: { line: { color: '#EF4444' } }
  };

  const candleLayout = {
    title: `${props.title} - OHLC`,
    paper_bgcolor: theme.bg, plot_bgcolor: theme.bg, font: { color: theme.text },
    xaxis: { rangeslider: { visible: false }, type: 'date', gridcolor: theme.grid },
    yaxis: { title: 'Price ($)', gridcolor: theme.grid },
    margin: { t: 50, l: 50, r: 20, b: 40 }, height: 400
  };

  // VOLUME TRACE
  const volTrace = {
    x: times, y: volumes, type: 'bar', name: 'Volume', marker: { color: colors }
  };

  const volLayout = {
    title: `1-Minute Volume Intervals`,
    paper_bgcolor: theme.bg, plot_bgcolor: theme.bg, font: { color: theme.text },
    xaxis: { type: 'date', gridcolor: theme.grid },
    yaxis: { title: 'Volume', gridcolor: theme.grid },
    margin: { t: 50, l: 50, r: 20, b: 40 }, height: 250
  };

  Plotly.newPlot(candleChart.value, [candleTrace], candleLayout, { responsive: true });
  Plotly.newPlot(volChart.value, [volTrace], volLayout, { responsive: true });
};

onMounted(async () => {
  const plotlyModule = await import('plotly.js-dist-min');
  Plotly = plotlyModule.default;
  if (props.data.length > 0) renderCharts(toRaw(props.data));
});

// Watch Data Changes
watch(() => props.data, (newData) => {
  if (newData.length > 0) renderCharts(toRaw(newData));
}, { deep: true });

// Watch Theme Changes
watch(() => colorMode.value, () => {
  if (props.data.length > 0) renderCharts(toRaw(props.data));
});
</script>

<style scoped>
.charts-wrapper { width: 100%; display: flex; flex-direction: column; gap: 1rem; }
.plotly-chart { width: 100%; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; background: var(--bg-card); }
.mt-4 { margin-top: 1rem; }
</style>