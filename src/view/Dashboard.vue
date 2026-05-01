<script setup lang="ts">
import { ref } from 'vue';
import { Chart, Grid, Line } from 'vue3-charts';
import { Icon } from '@iconify/vue';
import BaseStatCard from '../components/base-stat-card/BaseStatCard.vue';
import BaseTable from '../components/base-table/BaseTable.vue';
import {
  dashboardStats,
  mortalityByMonth,
  growthByMonth,
  recentActivities,
} from '../mocks/dashboard';
import { waterQualityRecords } from '../mocks/water-quality';

const stats = ref(dashboardStats);
const mortality = ref(mortalityByMonth);
const growth = ref(growthByMonth);
const activities = ref(recentActivities);

const alerts = ref(
  waterQualityRecords.filter(
    (r) => r.status === 'alerta' || r.status === 'crítico',
  ),
);

const margin = ref({ left: 0, top: 20, right: 20, bottom: 0 });

const activityIcons: Record<string, string> = {
  feeding: 'mdi:fish-food',
  water: 'mdi:water-check',
  harvest: 'mdi:basket',
  alert: 'mdi:alert-circle',
  maintenance: 'mdi:wrench',
};

const activityBg: Record<string, string> = {
  feeding: 'bg-info/10 text-info',
  water: 'bg-primary/10 text-primary',
  harvest: 'bg-success/10 text-success',
  alert: 'bg-warning/10 text-warning',
  maintenance: 'bg-secondary/10 text-secondary',
};

const alertColumns = [
  { name: 'tankName', label: 'Tanque' },
  { name: 'temperature', label: 'Temp (°C)' },
  { name: 'ph', label: 'pH' },
  { name: 'dissolvedOxygen', label: 'O₂ (mg/L)' },
  { name: 'ammonia', label: 'Amônia' },
  { name: 'status', label: 'Status' },
];
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <BaseStatCard
        title="Tanques Ativos"
        :value="`${stats.activeTanks}/${stats.totalTanks}`"
        icon="mdi:fishbowl-outline"
        color="primary"
        description="Em operação"
      />
      <BaseStatCard
        title="Total de Peixes"
        :value="stats.totalFish.toLocaleString('pt-BR')"
        icon="mdi:fish"
        color="info"
        :description="`${stats.totalSpecies} espécies`"
      />
      <BaseStatCard
        title="Alertas"
        :value="stats.alertsCount + stats.criticalCount"
        icon="mdi:alert-circle-outline"
        color="warning"
        :description="`${stats.criticalCount} crítico(s)`"
      />
      <BaseStatCard
        title="Receita do Mês"
        :value="`R$ ${stats.revenueMonthRS.toLocaleString('pt-BR')}`"
        icon="mdi:cash-multiple"
        color="success"
        :description="`Ração hoje: ${stats.feedTodayKg}kg`"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
        <div class="card-body">
          <h2 class="card-title text-sm font-semibold">
            <Icon icon="mdi:trending-up" class="size-4 text-success" />
            Crescimento Médio (kg)
          </h2>
          <div class="overflow-x-auto">
            <Chart
              :size="{ width: 500, height: 220 }"
              :data="growth"
              :margin="margin"
            >
              <template #layers>
                <Grid stroke-dasharray="2,2" />
                <Line :data-keys="['name', 'pesoMedio']" />
                <Line
                  :data-keys="['name', 'meta']"
                  :line-style="{ stroke: '#22c55e', strokeDasharray: '5,5' }"
                />
              </template>
            </Chart>
          </div>
          <div class="flex gap-4 text-xs opacity-60 mt-1">
            <span class="flex items-center gap-1"
              ><span class="w-3 h-0.5 bg-current inline-block" /> Real</span
            >
            <span class="flex items-center gap-1"
              ><span class="w-3 h-0.5 bg-success inline-block border-dashed" />
              Meta</span
            >
          </div>
        </div>
      </div>

      <div class="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
        <div class="card-body">
          <h2 class="card-title text-sm font-semibold">
            <Icon icon="mdi:trending-down" class="size-4 text-error" />
            Mortalidade Mensal
          </h2>
          <div class="overflow-x-auto">
            <Chart
              :size="{ width: 500, height: 220 }"
              :data="mortality"
              :margin="margin"
            >
              <template #layers>
                <Grid stroke-dasharray="2,2" />
                <Line
                  :data-keys="['name', 'mortalidade']"
                  :line-style="{ stroke: '#ef4444' }"
                />
              </template>
            </Chart>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
        <div class="card-body">
          <h2 class="card-title text-sm font-semibold">
            <Icon icon="mdi:alert-outline" class="size-4 text-warning" />
            Alertas de Qualidade da Água
          </h2>
          <BaseTable :columns="alertColumns" :rows="alerts" />
        </div>
      </div>

      <div class="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
        <div class="card-body">
          <h2 class="card-title text-sm font-semibold">
            <Icon icon="mdi:history" class="size-4 text-info" />
            Atividades Recentes
          </h2>
          <ul class="space-y-2 mt-2">
            <li
              v-for="activity in activities"
              :key="activity.id"
              class="flex items-center gap-3 p-2.5 rounded-lg bg-base-300/30 hover:bg-base-300/50 transition-colors"
            >
              <div class="rounded-lg p-2" :class="activityBg[activity.type]">
                <Icon :icon="activityIcons[activity.type]" class="size-4" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm truncate">
                  {{ activity.message }}
                </p>
                <p class="text-xs opacity-50">
                  {{ activity.date }} às {{ activity.time }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
