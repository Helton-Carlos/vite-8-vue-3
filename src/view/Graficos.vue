<script setup lang="ts">
import { ref } from "vue";
import { Chart, Grid, Line } from "vue3-charts";
import { plByMonth } from "../utils/chart";

const data = ref(plByMonth);
const margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0,
});

const axis = ref({
  primary: {
    type: "band",
    format: (val: string) => {
      if (val === "Feb") {
        return "😜";
      }
      return val;
    },
  },
  secondary: {
    domain: ["dataMin", "dataMax + 100"],
    type: "linear",
    ticks: 8,
  },
});
</script>

<template>
  <div class="flex gap-7">
    <Chart
      :size="{ width: 700, height: 250 }"
      :data="data"
      :margin="margin"
    >
      <template #layers>
        <Grid stroke-dasharray="2,2" />
        <Line :data-keys="['name', 'pl']" />
      </template>
    </Chart>

    <Chart
      :size="{ width: 700, height: 250 }"
      :data="data"
      :margin="margin"
      :axis="axis"
    >
      <template #layers>
        <Grid stroke-dasharray="2,2" />
        <Line :data-keys="['name', 'pl']" />
        <Line
          :data-keys="['name', 'avg']"
          :line-style="{ stroke: 'red' }"
          type="step"
        />
      </template>

      <template #widgets>
        <Tooltip
          border-color="#48CAE4"
          :config="{
            name: { hide: true },
            pl: { color: '#0077b6' },
            avg: { label: 'averange', color: 'red' },
            inc: { hide: true },
          }"
        />
      </template>
    </Chart>
  </div>
</template>
