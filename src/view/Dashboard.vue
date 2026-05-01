<script setup lang="ts">
import { ref } from 'vue';
import { Chart, Grid, Line } from 'vue3-charts';
import { Icon } from '@iconify/vue';
import BaseStatCard from '../components/base-stat-card/BaseStatCard.vue';
import BaseTable from '../components/base-table/BaseTable.vue';
import BaseBadge from '../components/base-badge/BaseBadge.vue';
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

const activityColors: Record<string, string> = {
  feeding: 'text-info',
  water: 'text-primary',
  harvest: 'text-success',
  alert: 'text-warning',
  maintenance: 'text-secondary',
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
      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-sm">Crescimento Médio (kg)</h2>
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
      </div>

      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-sm">Mortalidade Mensal</h2>
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

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-sm">Alertas de Qualidade da Água</h2>
          <div class="overflow-x-auto">
            <BaseTable :columns="alertColumns" :rows="alerts">
              <template #cell-status="{ value }">
                <BaseBadge :variant="value === 'crítico' ? 'error' : 'warning'">
                  {{ value }}
                </BaseBadge>
              </template>
            </BaseTable>
          </div>
        </div>
      </div>

      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-sm">Atividades Recentes</h2>
          <ul class="space-y-3 mt-2">
            <li
              v-for="activity in activities"
              :key="activity.id"
              class="flex items-start gap-3"
            >
              <Icon
                :icon="activityIcons[activity.type]"
                class="size-5 mt-0.5"
                :class="activityColors[activity.type]"
              />
              <div class="flex-1">
                <p class="text-sm">{{ activity.message }}</p>
                <p class="text-xs opacity-60">
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
