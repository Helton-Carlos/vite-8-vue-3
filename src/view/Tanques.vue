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

const statusIcon: Record<TankStatus, string> = {
  ativo: 'mdi:check-circle',
  manutenção: 'mdi:wrench',
  quarentena: 'mdi:shield-alert',
  vazio: 'mdi:circle-outline',
};

const statusCounts = computed(() => ({
  todos: tanks.value.length,
  ativo: tanks.value.filter((t) => t.status === 'ativo').length,
  manutenção: tanks.value.filter((t) => t.status === 'manutenção').length,
  vazio: tanks.value.filter((t) => t.status === 'vazio').length,
  quarentena: tanks.value.filter((t) => t.status === 'quarentena').length,
}));

function openForm() {
  const modal = document.getElementById('tank-modal') as HTMLDialogElement;
  modal?.showModal();
}

function closeForm() {
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

const deleteTargetId = ref<number | null>(null);

function openDeleteConfirm(id: number) {
  deleteTargetId.value = id;
  const modal = document.getElementById(
    'delete-confirm-modal',
  ) as HTMLDialogElement;
  modal?.showModal();
}

function confirmDelete() {
  if (deleteTargetId.value !== null) {
    tanks.value = tanks.value.filter((t) => t.id !== deleteTargetId.value);
    toast.success('Tanque removido', { position: toast.POSITION.BOTTOM_RIGHT });
    deleteTargetId.value = null;
  }
  const modal = document.getElementById(
    'delete-confirm-modal',
  ) as HTMLDialogElement;
  modal?.close();
}

function cancelDelete() {
  deleteTargetId.value = null;
  const modal = document.getElementById(
    'delete-confirm-modal',
  ) as HTMLDialogElement;
  modal?.close();
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="(count, status) in statusCounts"
          :key="status"
          class="text-base btn btn-sm gap-2 px-4 transition-all rounded-4xl"
          :class="
            filterStatus === status ? 'btn-primary shadow-md' : 'btn-ghost'
          "
          @click="filterStatus = status as TankStatus | 'todos'"
        >
          {{
            status === 'todos'
              ? 'Todos'
              : status.charAt(0).toUpperCase() + status.slice(1)
          }}
          <span
            class="badge badge-xs"
            :class="filterStatus === status ? 'badge-primary-content' : ''"
            >{{ count }}</span
          >
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
        class="card bg-base-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
      >
        <div class="card-body p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Icon
                :icon="statusIcon[tank.status]"
                class="size-4"
                :class="`text-${statusVariant[tank.status]}`"
              />
              <h3 class="font-semibold text-sm">
                {{ tank.name }}
              </h3>
            </div>
            <BaseBadge :variant="statusVariant[tank.status]">
              {{ tank.status }}
            </BaseBadge>
          </div>

          <div class="divider my-1" />

          <div class="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
            <div class="flex items-center gap-2 opacity-70">
              <Icon icon="mdi:cube-outline" class="size-5" />
              <span>{{ tank.type }}</span>
            </div>
            <div class="flex items-center gap-2 opacity-70">
              <Icon icon="mdi:water" class="size-5" />
              <span>{{ tank.volumeM3 }} m³</span>
            </div>
            <div class="flex items-center gap-2 opacity-70">
              <Icon icon="mdi:fish" class="size-5" />
              <span>{{ tank.speciesName }}</span>
            </div>
            <div class="flex items-center gap-2 opacity-70">
              <Icon icon="mdi:counter" class="size-5" />
              <span>{{ tank.fishCount.toLocaleString('pt-BR') }}</span>
            </div>
            <div class="flex items-center gap-2 opacity-70">
              <Icon icon="mdi:ruler-square" class="size-5" />
              <span>{{ tank.densityPerM3 }}/m³</span>
            </div>
            <div class="flex items-center gap-2 opacity-70">
              <Icon icon="mdi:broom" class="size-5" />
              <span>{{ tank.lastCleaningDate }}</span>
            </div>
          </div>

          <div class="card-actions justify-end mt-2">
            <button
              class="btn btn-xs btn-ghost opacity-50 hover:opacity-100"
              @click="openDeleteConfirm(tank.id)"
            >
              <Icon icon="mdi:delete-outline" class="size-4 text-error" />

              <p class="text-base text-error">excluir</p>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-200 shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-sm font-semibold">
          <Icon icon="mdi:table" class="size-4 opacity-60" />
          Visão em Tabela
        </h2>
        <BaseTable :columns="columns" :rows="filteredTanks" />
      </div>
    </div>

    <BaseModal id="tank-modal" title="Novo Tanque" size="md" @close="closeForm">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-control">
          <label class="label"
            ><span class="label-text text-xs font-medium">Nome *</span></label
          >
          <input
            v-model="form.name"
            type="text"
            placeholder="Ex: Tanque G1"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label"
            ><span class="label-text text-xs font-medium">Tipo</span></label
          >
          <select v-model="form.type" class="select select-bordered w-full">
            <option value="escavado">Escavado</option>
            <option value="alvenaria">Alvenaria</option>
            <option value="tanque-rede">Tanque-rede</option>
            <option value="raceway">Raceway</option>
          </select>
        </div>
        <div class="form-control">
          <label class="label"
            ><span class="label-text text-xs font-medium"
              >Volume (m³) *</span
            ></label
          >
          <input
            v-model.number="form.volumeM3"
            type="number"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label"
            ><span class="label-text text-xs font-medium">Espécie</span></label
          >
          <input
            v-model="form.speciesName"
            type="text"
            placeholder="Ex: Tilápia"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label"
            ><span class="label-text text-xs font-medium"
              >Qtd. Peixes</span
            ></label
          >
          <input
            v-model.number="form.fishCount"
            type="number"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label"
            ><span class="label-text text-xs font-medium">Status</span></label
          >
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

    <dialog
      id="delete-confirm-modal"
      class="modal modal-bottom sm:modal-middle"
    >
      <div class="modal-box bg-base-200">
        <h3 class="text-lg font-bold mb-2">Confirmar exclusão</h3>
        <p class="text-sm opacity-70">
          Tem certeza que deseja excluir este tanque? Esta ação não pode ser
          desfeita.
        </p>
        <div class="modal-action">
          <button class="btn btn-ghost" @click="cancelDelete">Cancelar</button>
          <button class="btn btn-error" @click="confirmDelete">
            <Icon icon="mdi:delete-outline" class="size-4" />
            Excluir
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="cancelDelete">close</button>
      </form>
    </dialog>
  </div>
</template>
