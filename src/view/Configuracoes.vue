<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import BaseButton from '../components/base-button/BaseButton.vue';
import BaseBadge from '../components/base-badge/BaseBadge.vue';
import BaseModal from '../components/base-modal/BaseModal.vue';
import { useStore } from '../stores/useStore';
import { usersList, timezones, type User, type UserRole } from '../mocks/users';
import { toast } from 'vue3-toastify';

const store = useStore();
const users = ref<User[]>([...usersList]);

const themes = [
  {
    value: 'aqua',
    label: 'Aqua',
    icon: 'mdi:weather-sunny',
    preview: 'bg-[#09ecf3]',
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: 'mdi:weather-night',
    preview: 'bg-[#1d232a]',
  },
  {
    value: 'light',
    label: 'Light',
    icon: 'mdi:white-balance-sunny',
    preview: 'bg-[#ffffff]',
  },
  {
    value: 'dracula',
    label: 'Dracula',
    icon: 'mdi:vampire',
    preview: 'bg-[#ff79c6]',
  },
  {
    value: 'forest',
    label: 'Forest',
    icon: 'mdi:tree',
    preview: 'bg-[#1eb854]',
  },
  {
    value: 'night',
    label: 'Night',
    icon: 'mdi:moon-waning-crescent',
    preview: 'bg-[#0d1b2a]',
  },
];

const form = ref<Partial<User>>({
  name: '',
  email: '',
  role: 'operador',
  active: true,
});

const roleVariant: Record<UserRole, 'primary' | 'info' | 'ghost'> = {
  admin: 'primary',
  operador: 'info',
  visualizador: 'ghost',
};

const activeUsers = computed(() => users.value.filter((u) => u.active).length);

function openUserForm() {
  form.value = { name: '', email: '', role: 'operador', active: true };
  const modal = document.getElementById('user-modal') as HTMLDialogElement;
  modal?.showModal();
}

function closeUserForm() {
  form.value = { name: '', email: '', role: 'operador', active: true };
}

function saveUser() {
  if (!form.value.name || !form.value.email) {
    toast.error('Preencha nome e e-mail', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return;
  }

  const exists = users.value.some((u) => u.email === form.value.email);
  if (exists) {
    toast.error('E-mail já cadastrado', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return;
  }

  const newUser: User = {
    id: users.value.length + 1,
    name: form.value.name!,
    email: form.value.email!,
    role: form.value.role as UserRole,
    active: form.value.active ?? true,
    createdAt: new Date().toISOString().split('T')[0],
  };

  users.value.push(newUser);
  toast.success('Usuário cadastrado', {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
  const modal = document.getElementById('user-modal') as HTMLDialogElement;
  modal?.close();
  closeUserForm();
}

function toggleUserActive(id: number) {
  const user = users.value.find((u) => u.id === id);
  if (user) {
    user.active = !user.active;
    toast.success(
      user.active ? `${user.name} ativado` : `${user.name} desativado`,
      { position: toast.POSITION.BOTTOM_RIGHT },
    );
  }
}

function removeUser(id: number) {
  users.value = users.value.filter((u) => u.id !== id);
  toast.success('Usuário removido', { position: toast.POSITION.BOTTOM_RIGHT });
}
</script>

<template>
  <div class="space-y-8 max-w-4xl">
    <div class="card bg-base-200 shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-sm font-semibold">
          <Icon
            icon="mdi:palette-outline"
            class="size-5 text-primary"
          />
          Tema
        </h2>
        <p class="text-xs opacity-50 mb-4">
          Escolha a aparência do sistema
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <button
            v-for="t in themes"
            :key="t.value"
            class="flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-150 hover:scale-105"
            :class="
              store.theme === t.value
                ? 'border-primary bg-primary/10 shadow-md'
                : 'border-base-300 hover:border-base-content/20'
            "
            @click="store.setTheme(t.value)"
          >
            <div
              class="w-10 h-10 rounded-full border-2 border-base-300 flex items-center justify-center"
              :class="t.preview"
            >
              <Icon
                :icon="t.icon"
                class="size-5 text-white mix-blend-difference"
              />
            </div>
            <span class="text-xs font-medium">{{ t.label }}</span>
            <Icon
              v-if="store.theme === t.value"
              icon="mdi:check-circle"
              class="size-4 text-primary"
            />
          </button>
        </div>
      </div>
    </div>

    <div class="card bg-base-200 shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-sm font-semibold">
          <Icon
            icon="mdi:clock-outline"
            class="size-5 text-info"
          />
          Fuso Horário
        </h2>
        <p class="text-xs opacity-50 mb-4">
          Define o horário exibido no sistema
        </p>

        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <select
            :value="store.timezone"
            class="select select-bordered w-full sm:w-80"
            @change="
              store.setTimezone(($event.target as HTMLSelectElement).value)
            "
          >
            <option
              v-for="tz in timezones"
              :key="tz.value"
              :value="tz.value"
            >
              {{ tz.label }}
            </option>
          </select>

          <div class="flex items-center gap-2 text-sm opacity-60">
            <Icon
              icon="mdi:information-outline"
              class="size-4"
            />
            <span>Atual: {{ store.timezone }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-200 shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-sm font-semibold">
          <Icon
            icon="mdi:account-circle-outline"
            class="size-5 text-secondary"
          />
          Seu Perfil
        </h2>
        <p class="text-xs opacity-50 mb-4">
          Configurações da sua conta
        </p>

        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div class="form-control">
            <label class="label">
              <span class="label-text text-xs font-medium mr-2">Papel no sistema</span>
            </label>
            <select
              :value="store.userRole"
              class="select select-bordered w-full sm:w-60"
              @change="
                store.setUserRole(
                  ($event.target as HTMLSelectElement).value as UserRole,
                )
              "
            >
              <option value="admin">
                Administrador
              </option>
              <option value="operador">
                Operador
              </option>
              <option value="visualizador">
                Visualizador
              </option>
            </select>
          </div>

          <div class="mt-4 sm:mt-6">
            <BaseBadge
              :variant="roleVariant[store.userRole]"
              size="md"
            >
              <Icon
                :icon="store.isAdmin ? 'mdi:shield-crown' : 'mdi:account'"
                class="size-3.5"
              />
              {{ store.userRole }}
            </BaseBadge>
          </div>
        </div>

        <div
          v-if="!store.isAdmin"
          class="alert alert-info mt-4"
        >
          <Icon
            icon="mdi:information"
            class="size-5"
          />
          <span class="text-sm">Apenas administradores podem gerenciar usuários.</span>
        </div>
      </div>
    </div>

    <div
      v-if="store.isAdmin"
      class="card bg-base-200 shadow-sm"
    >
      <div class="card-body">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h2 class="card-title text-sm font-semibold">
              <Icon
                icon="mdi:account-group"
                class="size-5 text-warning"
              />
              Gerenciar Usuários
            </h2>
            <p class="text-xs opacity-50 mt-1">
              {{ activeUsers }} ativo(s) de {{ users.length }} cadastrado(s)
            </p>
          </div>
          <BaseButton
            size="sm"
            @click="openUserForm"
          >
            <Icon
              icon="mdi:account-plus"
              class="icon"
            />
            Novo Usuário
          </BaseButton>
        </div>

        <div class="overflow-x-auto rounded-lg mt-2">
          <table class="table table-sm table-zebra">
            <thead>
              <tr class="bg-base-300/50">
                <th
                  class="text-xs uppercase tracking-wider opacity-70 font-semibold"
                >
                  Nome
                </th>
                <th
                  class="text-xs uppercase tracking-wider opacity-70 font-semibold"
                >
                  E-mail
                </th>
                <th
                  class="text-xs uppercase tracking-wider opacity-70 font-semibold"
                >
                  Papel
                </th>
                <th
                  class="text-xs uppercase tracking-wider opacity-70 font-semibold"
                >
                  Status
                </th>
                <th
                  class="text-xs uppercase tracking-wider opacity-70 font-semibold"
                >
                  Criado em
                </th>
                <th
                  class="text-xs uppercase tracking-wider opacity-70 font-semibold"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="u in users"
                :key="u.id"
                class="hover:bg-base-300/30 transition-colors"
              >
                <td class="font-medium">
                  <div class="flex items-center gap-2">
                    <div class="avatar placeholder">
                      <div
                        class="w-7 rounded-full text-xs"
                        :class="
                          u.active
                            ? 'bg-primary text-primary-content'
                            : 'bg-base-300 text-base-content/40'
                        "
                      >
                        <span>{{ u.name.charAt(0) }}</span>
                      </div>
                    </div>
                    {{ u.name }}
                  </div>
                </td>
                <td class="opacity-70">
                  {{ u.email }}
                </td>
                <td>
                  <BaseBadge :variant="roleVariant[u.role]">
                    {{ u.role }}
                  </BaseBadge>
                </td>
                <td>
                  <BaseBadge :variant="u.active ? 'success' : 'ghost'">
                    {{ u.active ? 'ativo' : 'inativo' }}
                  </BaseBadge>
                </td>
                <td class="opacity-60">
                  {{ u.createdAt }}
                </td>
                <td>
                  <div class="flex gap-1">
                    <button
                      class="btn btn-xs btn-ghost opacity-50 hover:opacity-100"
                      :title="u.active ? 'Desativar' : 'Ativar'"
                      @click="toggleUserActive(u.id)"
                    >
                      <Icon
                        :icon="
                          u.active ? 'mdi:account-off' : 'mdi:account-check'
                        "
                        class="size-4"
                        :class="u.active ? 'text-warning' : 'text-success'"
                      />
                    </button>
                    <button
                      class="btn btn-xs btn-ghost opacity-50 hover:opacity-100"
                      title="Remover"
                      @click="removeUser(u.id)"
                    >
                      <Icon
                        icon="mdi:delete-outline"
                        class="size-4 text-error"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <BaseModal
      id="user-modal"
      title="Novo Usuário"
      size="md"
      @close="closeUserForm"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text text-xs font-medium">Nome *</span>
          </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Nome completo"
            class="input input-bordered w-full"
          >
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text text-xs font-medium">E-mail *</span>
          </label>
          <input
            v-model="form.email"
            type="email"
            placeholder="email@exemplo.com"
            class="input input-bordered w-full"
          >
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text text-xs font-medium">Papel</span>
          </label>
          <select
            v-model="form.role"
            class="select select-bordered w-full"
          >
            <option value="admin">
              Administrador
            </option>
            <option value="operador">
              Operador
            </option>
            <option value="visualizador">
              Visualizador
            </option>
          </select>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text text-xs font-medium">Status</span>
          </label>
          <label class="label cursor-pointer justify-start gap-3">
            <input
              v-model="form.active"
              type="checkbox"
              class="toggle toggle-primary"
            >
            <span class="label-text">{{
              form.active ? 'Ativo' : 'Inativo'
            }}</span>
          </label>
        </div>
      </div>
      <div class="modal-action">
        <BaseButton @click="saveUser">
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
