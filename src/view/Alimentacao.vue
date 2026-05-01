<script setup lang="ts">
import { ref, computed } from 'vue';
import { Chart, Grid, Line } from 'vue3-charts';
import { Icon } from '@iconify/vue';
import BaseTable from '../components/base-table/BaseTable.vue';
import BaseButton from '../components/base-button/BaseButton.vue';
import BaseModal from '../components/base-modal/BaseModal.vue';
import BaseStatCard from '../components/base-stat-card/BaseStatCard.vue';
import {
  feedingRecords,
  feedingSummaryByMonth,
  type FeedingRecord,
} from '../mocks/feeding';
import { tanksList } from '../mocks/tanks';
import { toast } from 'vue3-toastify';

const records = ref<FeedingRecord[]>([...feedingRecords]);
const chartData = ref(feedingSummaryByMonth);
const margin = ref({ left: 0, top: 20, right: 20, bottom: 0 });

const form = ref<Partial<FeedingRecord>>({
  tankId: undefined,
  feedType: '',
  quantityKg: 0,
  date: new Date().toISOString().split('T')[0],
  time: '07:00',
  responsible: '',
  observations: '',
});

const activeTanks = tanksList.filter(
  (t) => t.status === 'ativo' || t.status === 'quarentena',
);

const todayTotal = computed(() =>
  records.value
    .filter((r) => r.date === new Date().toISOString().split('T')[0])
    .reduce((sum, r) => sum + r.quantityKg, 0),
);

const todayFeedings = computed(
  () =>
    records.value.filter(
      (r) => r.date === new Date().toISOString().split('T')[0],
    ).length,
);

const columns = [
  { name: 'tankName', label: 'Tanque' },
  { name: 'speciesName', label: 'Espécie' },
  { name: 'feedType', label: 'Ração' },
  { name: 'quantityKg', label: 'Qtd (kg)' },
  { name: 'date', label: 'Data' },
  { name: 'time', label: 'Hora' },
  { name: 'responsible', label: 'Responsável' },
  { name: 'observations', label: 'Observações' },
];

function openForm() {
  const modal = document.getElementById('feeding-modal') as HTMLDialogElement;
  modal?.showModal();
}

function closeForm() {
  form.value = {
    tankId: undefined,
    feedType: '',
    quantityKg: 0,
    date: new Date().toISOString().split('T')[0],
    time: '07:00',
    responsible: '',
    observations: '',
  };
}

function saveFeeding() {
  if (!form.value.tankId || !form.value.quantityKg || !form.value.responsible) {
    toast.error('Preencha os campos obrigatórios', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return;
  }

  const tank = tanksList.find((t) => t.id === form.value.tankId);

  const newRecord: FeedingRecord = {
    id: records.value.length + 1,
    tankId: form.value.tankId!,
    tankName: tank?.name || '',
    speciesName: tank?.speciesName || '',
    feedType: form.value.feedType || '',
    quantityKg: form.value.quantityKg!,
    date: form.value.date!,
    time: form.value.time!,
    responsible: form.value.responsible!,
    observations: form.value.observations || '',
  };

  records.value.unshift(newRecord);
  toast.success('Alimentação registrada', {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
  const modal = document.getElementById('feeding-modal') as HTMLDialogElement;
  modal?.close();
  closeForm();
}
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <BaseStatCard
        title="Ração Hoje"
        :value="`${todayTotal} kg`"
        icon="mdi:fish-food"
        color="info"
      />
      <BaseStatCard
        title="Alimentações Hoje"
        :value="todayFeedings"
        icon="mdi:clock-check-outline"
        color="primary"
      />
      <BaseStatCard
        title="Custo Mensal Est."
        :value="`R$ ${chartData[chartData.length - 1].custoRS.toLocaleString('pt-BR')}`"
        icon="mdi:cash"
        color="warning"
      />
    </div>

    <div class="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
      <div class="card-body">
        <h2 class="card-title text-sm font-semibold">
          <Icon
            icon="mdi:chart-line"
            class="size-4 text-info"
          />
          Consumo de Ração Mensal (kg)
        </h2>
        <Chart
          :size="{ width: 700, height: 220 }"
          :data="chartData"
          :margin="margin"
        >
          <template #layers>
            <Grid stroke-dasharray="2,2" />
            <Line :data-keys="['name', 'totalKg']" />
          </template>
        </Chart>
      </div>
    </div>

    <div class="flex justify-end">
      <BaseButton @click="openForm">
        <Icon
          icon="mdi:plus"
          class="icon"
        />
        Registrar Alimentação
      </BaseButton>
    </div>

    <div class="card bg-base-200 shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-sm font-semibold">
          <Icon
            icon="mdi:history"
            class="size-4 opacity-60"
          />
          Histórico de Alimentação
        </h2>
        <BaseTable
          :columns="columns"
          :rows="records"
        />
      </div>
    </div>

    <BaseModal
      id="feeding-modal"
      title="Registrar Alimentação"
      size="md"
      @close="closeForm"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-control">
          <label class="label"><span class="label-text text-xs font-medium">Tanque *</span></label>
          <select
            v-model.number="form.tankId"
            class="select select-bordered w-full"
          >
            <option
              disabled
              :value="undefined"
            >
              Selecione
            </option>
            <option
              v-for="tank in activeTanks"
              :key="tank.id"
              :value="tank.id"
            >
              {{ tank.name }} ({{ tank.speciesName }})
            </option>
          </select>
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text text-xs font-medium">Tipo de Ração</span></label>
          <input
            v-model="form.feedType"
            type="text"
            placeholder="Ex: Ração extrusada 32%"
            class="input input-bordered w-full"
          >
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text text-xs font-medium">Quantidade (kg) *</span></label>
          <input
            v-model.number="form.quantityKg"
            type="number"
            step="0.5"
            class="input input-bordered w-full"
          >
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text text-xs font-medium">Responsável *</span></label>
          <input
            v-model="form.responsible"
            type="text"
            placeholder="Nome"
            class="input input-bordered w-full"
          >
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text text-xs font-medium">Data</span></label>
          <input
            v-model="form.date"
            type="date"
            class="input input-bordered w-full"
          >
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text text-xs font-medium">Hora</span></label>
          <input
            v-model="form.time"
            type="time"
            class="input input-bordered w-full"
          >
        </div>
        <div class="form-control md:col-span-2">
          <label class="label"><span class="label-text text-xs font-medium">Observações</span></label>
          <textarea
            v-model="form.observations"
            class="textarea textarea-bordered w-full"
            rows="2"
          />
        </div>
      </div>
      <div class="modal-action">
        <BaseButton @click="saveFeeding">
          <Icon
            icon="mdi:content-save"
            class="icon"
          />
          Salvar
        </BaseButton>
      </div>
    </BaseModal>
  </div>
</template>
