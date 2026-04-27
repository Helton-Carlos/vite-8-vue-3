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
</script>

<template>
  <div>
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
    >
      <template #layers>
        <Grid stroke-dasharray="2,2" />
        <Line :data-keys="['name', 'pl']" />
      </template>
    </Chart>
  </div>
</template>
