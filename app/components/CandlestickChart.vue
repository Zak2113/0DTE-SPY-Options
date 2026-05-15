<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup>
// IMPORT toRaw HERE
import { ref, onMounted, watch, onUnmounted, toRaw } from 'vue';
import { createChart } from 'lightweight-charts';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  }
});

const chartContainer = ref(null);
let chart = null;
let candlestickSeries = null;

onMounted(() => {
  chart = createChart(chartContainer.value, {
    width: chartContainer.value.clientWidth,
    height: 600,
    layout: {
      background: { color: '#111827' },
      textColor: '#D1D5DB',
    },
    grid: {
      vertLines: { color: '#374151' },
      horzLines: { color: '#374151' },
    },
    timeScale: {
      timeVisible: true, // Crucial for 1-minute 0DTE data
      secondsVisible: false,
    },
  });

  candlestickSeries = chart.addCandlestickSeries({
    upColor: '#10B981',
    downColor: '#EF4444',
    borderVisible: false,
    wickUpColor: '#10B981',
    wickDownColor: '#EF4444',
  });

  if (props.data && props.data.length > 0) {
    // USE toRaw() HERE
    candlestickSeries.setData(toRaw(props.data));
  }

  window.addEventListener('resize', handleResize);
});

const handleResize = () => {
  if (chartContainer.value && chart) {
    chart.applyOptions({ width: chartContainer.value.clientWidth });
  }
};

watch(() => props.data, (newData) => {
  if (candlestickSeries && newData && newData.length > 0) {
    // USE toRaw() HERE AS WELL
    candlestickSeries.setData(toRaw(newData));
    chart.timeScale().fitContent();
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (chart) chart.remove();
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}
</style>