<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import BaseTable from '../components/base-table/BaseTable.vue';
import BaseButton from '../components/base-button/BaseButton.vue';
import BaseBadge from '../components/base-badge/BaseBadge.vue';
import BaseModal from '../components/base-modal/BaseModal.vue';
import { speciesList, type Species } from '../mocks/species';
import { toast } from 'vue3-toastify';

const species = ref<Species[]>([...speciesList]);
const showForm = ref(false);

const form = ref<Partial<Species>>({
  name: '',
  scientificName: '',
  idealTempMin: 25,
  idealTempMax: 30,
  idealPhMin: 6.5,
  idealPhMax: 7.5,
  growthTimeDays: 180,
  avgWeightKg: 1,
  feedType: '',
  status: 'ativo',
});

const columns = [
  { name: 'name', label: 'Nome' },
  { name: 'scientificName', label: 'Nome Científico' },
  { name: 'idealTempMin', label: 'Temp Min (°C)' },
  { name: 'idealTempMax', label: 'Temp Max (°C)' },
  { name: 'idealPhMin', label: 'pH Min' },
  { name: 'idealPhMax', label: 'pH Max' },
  { name: 'growthTimeDays', label: 'Tempo Crescimento (dias)' },
  { name: 'avgWeightKg', label: 'Peso Médio (kg)' },
  { name: 'feedType', label: 'Tipo de Ração' },
  { name: 'status', label: 'Status' },
];

function openForm() {
  showForm.value = true;
  const modal = document.getElementById('species-modal') as HTMLDialogElement;
  modal?.showModal();
}

function closeForm() {
  showForm.value = false;
  form.value = {
    name: '',
    scientificName: '',
    idealTempMin: 25,
    idealTempMax: 30,
    idealPhMin: 6.5,
    idealPhMax: 7.5,
    growthTimeDays: 180,
    avgWeightKg: 1,
    feedType: '',
    status: 'ativo',
  };
}

function saveSpecies() {
  if (!form.value.name || !form.value.scientificName) {
    toast.error('Preencha os campos obrigatórios', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return;
  }

  const newSpecies: Species = {
    id: species.value.length + 1,
    name: form.value.name!,
    scientificName: form.value.scientificName!,
    idealTempMin: form.value.idealTempMin!,
    idealTempMax: form.value.idealTempMax!,
    idealPhMin: form.value.idealPhMin!,
    idealPhMax: form.value.idealPhMax!,
    growthTimeDays: form.value.growthTimeDays!,
    avgWeightKg: form.value.avgWeightKg!,
    feedType: form.value.feedType || '',
    status: form.value.status as 'ativo' | 'inativo',
  };

  species.value.push(newSpecies);
  toast.success('Espécie cadastrada com sucesso', {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
  const modal = document.getElementById('species-modal') as HTMLDialogElement;
  modal?.close();
  closeForm();
}

function removeSpecies(id: number) {
  species.value = species.value.filter((s) => s.id !== id);
  toast.success('Espécie removida', { position: toast.POSITION.BOTTOM_RIGHT });
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-end">
      <BaseButton @click="openForm">
        <Icon icon="mdi:plus" class="icon" />
        Nova Espécie
      </BaseButton>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <div
        v-for="sp in species"
        :key="sp.id"
        class="card bg-base-200 shadow-sm"
      >
        <div class="card-body p-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="card-title text-sm">{{ sp.name }}</h3>
              <p class="text-xs italic opacity-60">{{ sp.scientificName }}</p>
            </div>
            <BaseBadge :variant="sp.status === 'ativo' ? 'success' : 'ghost'">{{
              sp.status
            }}</BaseBadge>
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs mt-3 opacity-80">
            <p>
              <Icon icon="mdi:thermometer" class="inline size-3" />
              {{ sp.idealTempMin }}–{{ sp.idealTempMax }}°C
            </p>
            <p>
              <Icon icon="mdi:ph" class="inline size-3" /> pH
              {{ sp.idealPhMin }}–{{ sp.idealPhMax }}
            </p>
            <p>
              <Icon icon="mdi:clock-outline" class="inline size-3" />
              {{ sp.growthTimeDays }} dias
            </p>
            <p>
              <Icon icon="mdi:weight-kilogram" class="inline size-3" />
              {{ sp.avgWeightKg }} kg
            </p>
          </div>
          <p class="text-xs mt-1 opacity-70">
            <Icon icon="mdi:food-drumstick" class="inline size-3" />
            {{ sp.feedType }}
          </p>
          <div class="card-actions justify-end mt-2">
            <button class="btn btn-xs btn-ghost" @click="removeSpecies(sp.id)">
              <Icon icon="mdi:delete-outline" class="size-4 text-error" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-200 shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-sm">Todas as Espécies</h2>
        <BaseTable :columns="columns" :rows="species" />
      </div>
    </div>

    <BaseModal
      id="species-modal"
      title="Nova Espécie"
      size="lg"
      @close="closeForm"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-control">
          <label class="label"><span class="label-text">Nome *</span></label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Ex: Tilápia"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label"
            ><span class="label-text">Nome Científico *</span></label
          >
          <input
            v-model="form.scientificName"
            type="text"
            placeholder="Ex: Oreochromis niloticus"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label"
            ><span class="label-text">Temp. Mínima (°C)</span></label
          >
          <input
            v-model.number="form.idealTempMin"
            type="number"
            step="0.5"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label"
            ><span class="label-text">Temp. Máxima (°C)</span></label
          >
          <input
            v-model.number="form.idealTempMax"
            type="number"
            step="0.5"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text">pH Mínimo</span></label>
          <input
            v-model.number="form.idealPhMin"
            type="number"
            step="0.1"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text">pH Máximo</span></label>
          <input
            v-model.number="form.idealPhMax"
            type="number"
            step="0.1"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label"
            ><span class="label-text">Tempo de Crescimento (dias)</span></label
          >
          <input
            v-model.number="form.growthTimeDays"
            type="number"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label"
            ><span class="label-text">Peso Médio (kg)</span></label
          >
          <input
            v-model.number="form.avgWeightKg"
            type="number"
            step="0.1"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control md:col-span-2">
          <label class="label"
            ><span class="label-text">Tipo de Ração</span></label
          >
          <input
            v-model="form.feedType"
            type="text"
            placeholder="Ex: Ração extrusada 32%"
            class="input input-bordered w-full"
          />
        </div>
      </div>
      <div class="modal-action">
        <BaseButton @click="saveSpecies">
          <Icon icon="mdi:content-save" class="icon" />
          Salvar
        </BaseButton>
      </div>
    </BaseModal>
  </div>
</template>
