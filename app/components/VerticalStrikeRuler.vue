<template>
  <div class="vertical-ruler-wrapper">
    
    <div class="ruler-header">
      <div class="toggle-group">
        <button 
          @click="selectedType = 'C'"
          class="toggle-btn"
          :class="selectedType === 'C' ? 'active-call' : 'inactive-btn'"
        >
          Calls
        </button>
        <button 
          @click="selectedType = 'P'"
          class="toggle-btn"
          :class="selectedType === 'P' ? 'active-put' : 'inactive-btn'"
        >
          Puts
        </button>
      </div>
    </div>

    <div 
      ref="rulerContainer"
      class="ruler-canvas no-scrollbar"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
    >
      <div class="ticks-column">
        <div
          v-for="tick in rulerTicks"
          :key="tick.value"
          :ref="(el) => setTickRef(el, tick.value)"
          class="tick-row"
        >
          <div class="tick-label-container">
             <div
              @click="tick.isAvailable && selectStrike(tick.value)"
              class="tick-label"
              :class="[
                tick.isAvailable ? 'label-available' : 'label-unavailable',
                selectedStrike === tick.value ? 'label-selected' : '',
                !tick.isMajor ? 'label-minor' : ''
              ]"
            >
              {{ tick.value }}
            </div>
          </div>

          <div class="tick-mark-container">
            <div class="tick-mark" :class="tick.isMajor ? 'tick-major' : 'tick-minor'"></div>
            <div v-if="selectedStrike === tick.value" class="selected-indicator-arrow"></div>
          </div>

          <div class="tick-data-container">
            <div
              v-if="selectedStrike === tick.value"
              class="badge"
              :class="selectedType === 'C' ? 'bg-call' : 'bg-put'"
            >
              <div class="badge-arrow" :class="selectedType === 'C' ? 'border-call' : 'border-put'"></div>
              {{ tick.value }}{{ selectedType }}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';

// We now pass the currentDate down from the main page!
const props = defineProps<{
  metadata: Record<string, { C: number[], P: number[] }>,
  currentDate: string
}>();

const emit = defineEmits(['load-contract']);

const selectedType = ref<'C' | 'P'>('C');
const selectedStrike = ref<number | null>(null);

const rulerContainer = ref<HTMLElement | null>(null);
const activeTickEl = ref<HTMLElement | null>(null);
let isDragging = false; let startY = 0; let scrollTop = 0;

const setTickRef = (el: any, tickValue: number) => {
  if (tickValue === selectedStrike.value) { activeTickEl.value = el as HTMLElement; }
};

const activeStrikes = computed(() => {
  if (!props.currentDate || !props.metadata[props.currentDate]) return [];
  return props.metadata[props.currentDate]![selectedType.value] || [];
});

const rulerTicks = computed(() => {
  const strikes = activeStrikes.value;
  if (strikes.length === 0) return [];
  const minStrike = Math.min(...strikes);
  const maxStrike = Math.max(...strikes); 

  const ticks = [];
  for (let val = maxStrike; val >= minStrike; val--) {
    ticks.push({
      value: val,
      isMajor: val % 5 === 0, 
      isAvailable: strikes.includes(val) 
    });
  }
  return ticks;
});

const selectStrike = (strike: number) => {
  selectedStrike.value = strike;
  const fileName = `part-${strike}-${selectedType.value}.parquet`;
  
  emit('load-contract', {
    date: props.currentDate,
    strike,
    right: selectedType.value,
    fileName
  });
  scrollToCenter();
};

const scrollToCenter = async () => {
  await nextTick();
  if (rulerContainer.value && activeTickEl.value) {
    const container = rulerContainer.value;
    const scrollPos = activeTickEl.value.offsetTop - (container.clientHeight / 2) + (activeTickEl.value.clientHeight / 2);
    container.scrollTo({ top: scrollPos, behavior: 'smooth' });
  }
};

// Auto-select and auto-center when date or type changes
watch(rulerTicks, async (ticks) => {
  if (ticks.length > 0 && !selectedStrike.value) {
    const available = ticks.filter(t => t.isAvailable);
    if (available.length > 0) {
      selectStrike(available[Math.floor(available.length / 2)]!.value);
    }
  }
});

// Drag to scroll logic
const startDrag = (e: MouseEvent) => { if (!rulerContainer.value) return; isDragging = true; startY = e.pageY - rulerContainer.value.offsetTop; scrollTop = rulerContainer.value.scrollTop; };
const stopDrag = () => { isDragging = false; };
const onDrag = (e: MouseEvent) => { if (!isDragging || !rulerContainer.value) return; e.preventDefault(); const y = e.pageY - rulerContainer.value.offsetTop; const walk = (y - startY) * 1.5; rulerContainer.value.scrollTop = scrollTop - walk; };
</script>

<style scoped>
.vertical-ruler-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px; 
  height: 500px;    
  background-color: var(--bg-card); 
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  user-select: none;
}

.ruler-header {
  display: flex;
  justify-content: center;
  padding: 0.75rem;
  background-color: var(--bg-main);
  border-bottom: 1px solid var(--border-color);
  z-index: 20;
}

.toggle-group {
  display: flex;
  background-color: rgba(128, 128, 128, 0.08); 
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.25rem; 
  gap: 0.25rem;
  width: 100%;
}

.toggle-btn {
  flex: 1; /* Makes buttons fill the whole header evenly */
  padding: 0.45rem 1.25rem; 
  font-size: 0.85rem;
  font-weight: 600;
  border: none;
  border-radius: 4px; 
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
}
.active-call { background-color: #10B981; color: white; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
.active-put { background-color: #EF4444; color: white; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
.inactive-btn { color: var(--text-muted); }
.inactive-btn:hover { color: var(--text-main); background-color: rgba(128,128,128,0.1); }

/* Canvas and Ticks */
.ruler-canvas { position: relative; flex: 1; overflow-y: auto; display: flex; justify-content: center; cursor: grab; background-color: var(--bg-card); }
.ruler-canvas:active { cursor: grabbing; }
.ticks-column { position: relative; z-index: 10; padding-top: 1rem; padding-bottom: 1rem; width: 100%; }
.tick-row { display: flex; height: 1.75rem; width: 100%; }

.tick-label-container { flex: 1; display: flex; justify-content: flex-end; align-items: center; padding-right: 1.5rem; }
.tick-mark-container { width: 20px; display: flex; justify-content: center; align-items: center; position: relative; }
.tick-mark-container::before { content: ''; position: absolute; top: 0; bottom: 0; left: 50%; transform: translateX(-50%); width: 1px; background-color: var(--border-color); z-index: -1; }
.tick-data-container { flex: 1; padding-left: 1.5rem; display: flex; align-items: center; }

.tick-mark { height: 1px; background-color: var(--text-muted); }
.tick-major { width: 14px; background-color: var(--text-main); }
.tick-minor { width: 8px; opacity: 0.5; }

.tick-label { font-size: 13px; font-family: ui-monospace, monospace; transition: all 0.2s; cursor: pointer; }
.label-minor { font-size: 11px; opacity: 0.75; }
.label-available { color: var(--text-main); }
.label-available:hover { color: var(--accent-color); font-weight: bold; opacity: 1; }
.label-unavailable { color: var(--text-muted); opacity: 0.3; cursor: not-allowed; }
.label-selected { font-weight: 700; color: var(--text-main); font-size: 14px; opacity: 1; }

.selected-indicator-arrow { position: absolute; left: -2px; top: 50%; transform: translateY(-50%); width: 0; height: 0; border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-left: 6px solid var(--text-main); }

.badge { position: relative; display: inline-flex; align-items: center; padding: 0.15rem 0.6rem; border-radius: 4px; color: white; font-weight: 700; font-size: 0.85rem; font-family: ui-monospace, monospace; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2); }
.bg-call { background-color: #10B981; }
.bg-put { background-color: #EF4444; }
.badge-arrow { position: absolute; left: -5px; width: 0; height: 0; border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-right: 5px solid; }
.border-call { border-right-color: #10B981; }
.border-put { border-right-color: #EF4444; }

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>