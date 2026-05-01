<script setup lang="ts">
import { ref, computed } from 'vue';
import { Chart, Grid, Line } from 'vue3-charts';
import { Icon } from '@iconify/vue';
import BaseButton from '../components/base-button/BaseButton.vue';
import BaseBadge from '../components/base-badge/BaseBadge.vue';
import BaseModal from '../components/base-modal/BaseModal.vue';
import BaseStatCard from '../components/base-stat-card/BaseStatCard.vue';
import {
  harvestRecords,
  harvestByMonth,
  type Harvest,
} from '../mocks/harvests';
import { tanksList } from '../mocks/tanks';
import { toast } from 'vue3-toastify';

const records = ref<Harvest[]>([...harvestRecords]);
const chartData = ref(harvestByMonth);
const margin = ref({ left: 0, top: 20, right: 20, bottom: 0 });

const form = ref<Partial<Harvest>>({
  tankId: undefined,
  quantityFish: 0,
  totalWeightKg: 0,
  pricePerKg: 0,
  date: new Date().toISOString().split('T')[0],
  buyer: '',
  status: 'agendada',
});

const activeTanks = tanksList.filter((t) => t.status === 'ativo');

const totalRevenue = computed(() =>
  records.value
    .filter((r) => r.status === 'concluída')
    .reduce((sum, r) => sum + r.totalRevenueRS, 0),
);

const totalWeight = computed(() =>
  records.value
    .filter((r) => r.status === 'concluída')
    .reduce((sum, r) => sum + r.totalWeightKg, 0),
);

const scheduledCount = computed(
  () => records.value.filter((r) => r.status === 'agendada').length,
);

const statusVariant: Record<string, 'success' | 'info' | 'error'> = {
  concluída: 'success',
  agendada: 'info',
  cancelada: 'error',
};

function openForm() {
  const modal = document.getElementById('harvest-modal') as HTMLDialogElement;
  modal?.showModal();
}

function closeForm() {
  form.value = {
    tankId: undefined,
    quantityFish: 0,
    totalWeightKg: 0,
    pricePerKg: 0,
    date: new Date().toISOString().split('T')[0],
    buyer: '',
    status: 'agendada',
  };
}

function saveHarvest() {
  if (!form.value.tankId || !form.value.quantityFish || !form.value.buyer) {
    toast.error('Preencha os campos obrigatórios', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return;
  }

  const tank = tanksList.find((t) => t.id === form.value.tankId);
  const avgWeight =
    form.value.totalWeightKg && form.value.quantityFish
      ? +(form.value.totalWeightKg / form.value.quantityFish).toFixed(2)
      : 0;
  const revenue =
    (form.value.totalWeightKg || 0) * (form.value.pricePerKg || 0);

  const newRecord: Harvest = {
    id: records.value.length + 1,
    tankId: form.value.tankId!,
    tankName: tank?.name || '',
    speciesName: tank?.speciesName || '',
    quantityFish: form.value.quantityFish!,
    totalWeightKg: form.value.totalWeightKg || 0,
    avgWeightKg: avgWeight,
    pricePerKg: form.value.pricePerKg || 0,
    totalRevenueRS: revenue,
    date: form.value.date!,
    buyer: form.value.buyer!,
    status: form.value.status as Harvest['status'],
  };

  records.value.unshift(newRecord);
  toast.success('Colheita registrada', {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
  const modal = document.getElementById('harvest-modal') as HTMLDialogElement;
  modal?.close();
  closeForm();
}
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <BaseStatCard
        title="Receita Total"
        :value="`R$ ${totalRevenue.toLocaleString('pt-BR')}`"
        icon="mdi:cash-multiple"
        color="success"
      />
      <BaseStatCard
        title="Peso Total Colhido"
        :value="`${totalWeight.toLocaleString('pt-BR')} kg`"
        icon="mdi:weight-kilogram"
        color="primary"
      />
      <BaseStatCard
        title="Colheitas Agendadas"
        :value="scheduledCount"
        icon="mdi:calendar-clock"
        color="info"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
        <div class="card-body">
          <h2 class="card-title text-sm font-semibold">
            <Icon
              icon="mdi:weight-kilogram"
              class="size-4 text-primary"
            />
            Peso Colhido por Mês (kg)
          </h2>
          <Chart
            :size="{ width: 450, height: 200 }"
            :data="chartData"
            :margin="margin"
          >
            <template #layers>
              <Grid stroke-dasharray="2,2" />
              <Line :data-keys="['name', 'pesoKg']" />
            </template>
          </Chart>
        </div>
      </div>
      <div class="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
        <div class="card-body">
          <h2 class="card-title text-sm font-semibold">
            <Icon
              icon="mdi:cash"
              class="size-4 text-success"
            />
            Receita por Mês (R$)
          </h2>
          <Chart
            :size="{ width: 450, height: 200 }"
            :data="chartData"
            :margin="margin"
          >
            <template #layers>
              <Grid stroke-dasharray="2,2" />
              <Line
                :data-keys="['name', 'receitaRS']"
                :line-style="{ stroke: '#22c55e' }"
              />
            </template>
          </Chart>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <BaseButton @click="openForm">
        <Icon
          icon="mdi:plus"
          class="icon"
        />
        Nova Colheita
      </BaseButton>
    </div>

    <div class="card bg-base-200 shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-sm font-semibold">
          <Icon
            icon="mdi:basket"
            class="size-4 opacity-60"
          />
          Registro de Colheitas
        </h2>
        <div class="overflow-x-auto rounded-lg">
          <table class="table table-sm table-zebra">
            <thead>
              <tr class="bg-base-300/50">
                <th
                  class="text-xs uppercase tracking-wider opacity-70 font-semibold"
                >
                  Tanque
                </th>
                <th
                  class="text-xs uppercase tracking-wider opacity-70 font-semibold"
                >
                  Espécie
                </th>
                <th
                  class="text-xs uppercase tracking-wider opacity-70 font-semibold"
                >
                  Peixes
                </th>
                <th
                  class="text-xs uppercase tracking-wider opacity-70 font-semibold"
                >
                  Peso (kg)
                </th>
                <th
                  class="text-xs uppercase tracking-wider opacity-70 font-semibold"
                >
                  Médio (kg)
                </th>
                <th
                  class="text-xs uppercase tracking-wider opacity-70 font-semibold"
                >
                  R$/kg
                </th>
                <th
                  class="text-xs uppercase tracking-wider opacity-70 font-semibold"
                >
                  Receita
                </th>
                <th
                  class="text-xs uppercase tracking-wider opacity-70 font-semibold"
                >
                  Data
                </th>
                <th
                  class="text-xs uppercase tracking-wider opacity-70 font-semibold"
                >
                  Comprador
                </th>
                <th
                  class="text-xs uppercase tracking-wider opacity-70 font-semibold"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in records"
                :key="row.id"
                class="hover:bg-base-300/30 transition-colors"
              >
                <td class="font-medium">
                  {{ row.tankName }}
                </td>
                <td>{{ row.speciesName }}</td>
                <td>{{ row.quantityFish }}</td>
                <td>{{ row.totalWeightKg }}</td>
                <td>{{ row.avgWeightKg }}</td>
                <td>R$ {{ row.pricePerKg.toFixed(2) }}</td>
                <td class="font-semibold text-success">
                  R$ {{ row.totalRevenueRS.toLocaleString('pt-BR') }}
                </td>
                <td>{{ row.date }}</td>
                <td>{{ row.buyer }}</td>
                <td>
                  <BaseBadge :variant="statusVariant[row.status]">
                    {{
                      row.status
                    }}
                  </BaseBadge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <BaseModal
      id="harvest-modal"
      title="Nova Colheita"
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
          <label class="label"><span class="label-text text-xs font-medium">Comprador *</span></label>
          <input
            v-model="form.buyer"
            type="text"
            class="input input-bordered w-full"
          >
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text text-xs font-medium">Qtd. Peixes *</span></label>
          <input
            v-model.number="form.quantityFish"
            type="number"
            class="input input-bordered w-full"
          >
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text text-xs font-medium">Peso Total (kg)</span></label>
          <input
            v-model.number="form.totalWeightKg"
            type="number"
            step="0.5"
            class="input input-bordered w-full"
          >
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text text-xs font-medium">Preço por kg (R$)</span></label>
          <input
            v-model.number="form.pricePerKg"
            type="number"
            step="0.5"
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
        <div class="form-control md:col-span-2">
          <label class="label"><span class="label-text text-xs font-medium">Status</span></label>
          <select
            v-model="form.status"
            class="select select-bordered w-full"
          >
            <option value="agendada">
              Agendada
            </option>
            <option value="concluída">
              Concluída
            </option>
            <option value="cancelada">
              Cancelada
            </option>
          </select>
        </div>
      </div>
      <div class="modal-action">
        <BaseButton @click="saveHarvest">
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
