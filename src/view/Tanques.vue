<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import BaseTable from '../components/base-table/BaseTable.vue';
import BaseButton from '../components/base-button/BaseButton.vue';
import BaseBadge from '../components/base-badge/BaseBadge.vue';
import BaseModal from '../components/base-modal/BaseModal.vue';
import { tanksList, type Tank, type TankStatus } from '../mocks/tanks';
import { toast } from 'vue3-toastify';

const tanks = ref<Tank[]>([...tanksList]);
const filterStatus = ref<TankStatus | 'todos'>('todos');
const showForm = ref(false);

const form = ref<Partial<Tank>>({
  name: '',
  type: 'escavado',
  volumeM3: 0,
  speciesName: '',
  fishCount: 0,
  status: 'vazio',
});

const filteredTanks = computed(() => {
  if (filterStatus.value === 'todos') return tanks.value;
  return tanks.value.filter((t) => t.status === filterStatus.value);
});

const columns = [
  { name: 'name', label: 'Nome' },
  { name: 'type', label: 'Tipo' },
  { name: 'volumeM3', label: 'Volume (m³)' },
  { name: 'speciesName', label: 'Espécie' },
  { name: 'fishCount', label: 'Qtd. Peixes' },
  { name: 'densityPerM3', label: 'Densidade/m³' },
  { name: 'status', label: 'Status' },
  { name: 'lastCleaningDate', label: 'Última Limpeza' },
];

const statusVariant: Record<
  TankStatus,
  'success' | 'warning' | 'error' | 'ghost'
> = {
  ativo: 'success',
  manutenção: 'warning',
  quarentena: 'error',
  vazio: 'ghost',
};

const statusCounts = computed(() => ({
  todos: tanks.value.length,
  ativo: tanks.value.filter((t) => t.status === 'ativo').length,
  manutenção: tanks.value.filter((t) => t.status === 'manutenção').length,
  vazio: tanks.value.filter((t) => t.status === 'vazio').length,
  quarentena: tanks.value.filter((t) => t.status === 'quarentena').length,
}));

function openForm() {
  showForm.value = true;
  const modal = document.getElementById('tank-modal') as HTMLDialogElement;
  modal?.showModal();
}

function closeForm() {
  showForm.value = false;
  form.value = {
    name: '',
    type: 'escavado',
    volumeM3: 0,
    speciesName: '',
    fishCount: 0,
    status: 'vazio',
  };
}

function saveTank() {
  if (!form.value.name || !form.value.volumeM3) {
    toast.error('Preencha os campos obrigatórios', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return;
  }

  const newTank: Tank = {
    id: tanks.value.length + 1,
    name: form.value.name!,
    type: form.value.type as Tank['type'],
    volumeM3: form.value.volumeM3!,
    speciesId: 0,
    speciesName: form.value.speciesName || '-',
    fishCount: form.value.fishCount || 0,
    densityPerM3: form.value.fishCount
      ? +(form.value.fishCount / form.value.volumeM3!).toFixed(2)
      : 0,
    status: form.value.status as TankStatus,
    lastCleaningDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString().split('T')[0],
  };

  tanks.value.push(newTank);
  toast.success('Tanque cadastrado com sucesso', {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
  const modal = document.getElementById('tank-modal') as HTMLDialogElement;
  modal?.close();
  closeForm();
}

function removeTank(id: number) {
  tanks.value = tanks.value.filter((t) => t.id !== id);
  toast.success('Tanque removido', { position: toast.POSITION.BOTTOM_RIGHT });
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="(count, status) in statusCounts"
          :key="status"
          class="btn btn-sm"
          :class="filterStatus === status ? 'btn-primary' : 'btn-ghost'"
          @click="filterStatus = status as TankStatus | 'todos'"
        >
          {{
            status === 'todos'
              ? 'Todos'
              : status.charAt(0).toUpperCase() + status.slice(1)
          }}
          <span class="badge badge-sm ml-1">{{ count }}</span>
        </button>
      </div>
      <BaseButton @click="openForm">
        <Icon icon="mdi:plus" class="icon" />
        Novo Tanque
      </BaseButton>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <div
        v-for="tank in filteredTanks"
        :key="tank.id"
        class="card bg-base-200 shadow-sm"
      >
        <div class="card-body p-4">
          <div class="flex items-center justify-between">
            <h3 class="card-title text-sm">{{ tank.name }}</h3>
            <BaseBadge :variant="statusVariant[tank.status]">{{
              tank.status
            }}</BaseBadge>
          </div>
          <div class="text-xs space-y-1 mt-2 opacity-80">
            <p><span class="font-semibold">Tipo:</span> {{ tank.type }}</p>
            <p>
              <span class="font-semibold">Volume:</span> {{ tank.volumeM3 }} m³
            </p>
            <p>
              <span class="font-semibold">Espécie:</span> {{ tank.speciesName }}
            </p>
            <p>
              <span class="font-semibold">Peixes:</span>
              {{ tank.fishCount.toLocaleString('pt-BR') }}
            </p>
            <p>
              <span class="font-semibold">Densidade:</span>
              {{ tank.densityPerM3 }}/m³
            </p>
            <p>
              <span class="font-semibold">Última limpeza:</span>
              {{ tank.lastCleaningDate }}
            </p>
          </div>
          <div class="card-actions justify-end mt-2">
            <button class="btn btn-xs btn-ghost" @click="removeTank(tank.id)">
              <Icon icon="mdi:delete-outline" class="size-4 text-error" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-200 shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-sm">Visão em Tabela</h2>
        <BaseTable :columns="columns" :rows="filteredTanks" />
      </div>
    </div>

    <BaseModal id="tank-modal" title="Novo Tanque" size="md" @close="closeForm">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-control">
          <label class="label"><span class="label-text">Nome *</span></label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Ex: Tanque G1"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text">Tipo</span></label>
          <select v-model="form.type" class="select select-bordered w-full">
            <option value="escavado">Escavado</option>
            <option value="alvenaria">Alvenaria</option>
            <option value="tanque-rede">Tanque-rede</option>
            <option value="raceway">Raceway</option>
          </select>
        </div>
        <div class="form-control">
          <label class="label"
            ><span class="label-text">Volume (m³) *</span></label
          >
          <input
            v-model.number="form.volumeM3"
            type="number"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text">Espécie</span></label>
          <input
            v-model="form.speciesName"
            type="text"
            placeholder="Ex: Tilápia"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label"
            ><span class="label-text">Qtd. Peixes</span></label
          >
          <input
            v-model.number="form.fishCount"
            type="number"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text">Status</span></label>
          <select v-model="form.status" class="select select-bordered w-full">
            <option value="vazio">Vazio</option>
            <option value="ativo">Ativo</option>
            <option value="manutenção">Manutenção</option>
            <option value="quarentena">Quarentena</option>
          </select>
        </div>
      </div>
      <div class="modal-action">
        <BaseButton @click="saveTank">
          <Icon icon="mdi:content-save" class="icon" />
          Salvar
        </BaseButton>
      </div>
    </BaseModal>
  </div>
</template>
