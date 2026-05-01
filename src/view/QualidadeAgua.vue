<script setup lang="ts">
import { ref, computed } from "vue"
import { Chart, Grid, Line } from "vue3-charts"
import { Icon } from "@iconify/vue"
import BaseTable from "../components/base-table/BaseTable.vue"
import BaseButton from "../components/base-button/BaseButton.vue"
import BaseBadge from "../components/base-badge/BaseBadge.vue"
import BaseModal from "../components/base-modal/BaseModal.vue"
import BaseStatCard from "../components/base-stat-card/BaseStatCard.vue"
import {
  waterQualityRecords,
  waterQualityHistory,
  type WaterQualityRecord,
} from "../mocks/water-quality"
import { tanksList } from "../mocks/tanks"
import { toast } from "vue3-toastify"

const records = ref<WaterQualityRecord[]>([...waterQualityRecords])
const historyData = ref(waterQualityHistory)
const margin = ref({ left: 0, top: 20, right: 20, bottom: 0 })

const form = ref<Partial<WaterQualityRecord>>({
  tankId: undefined,
  temperature: 27,
  ph: 7.0,
  dissolvedOxygen: 5.5,
  ammonia: 0.02,
  nitrite: 0.01,
  transparency: 30,
  date: new Date().toISOString().split("T")[0],
  time: "06:00",
})

const activeTanks = tanksList.filter((t) => t.status !== "vazio")

const normalCount = computed(() => records.value.filter((r) => r.status === "normal").length)
const alertCount = computed(() => records.value.filter((r) => r.status === "alerta").length)
const criticalCount = computed(() => records.value.filter((r) => r.status === "crítico").length)

const columns = [
  { name: "tankName", label: "Tanque" },
  { name: "temperature", label: "Temp (°C)" },
  { name: "ph", label: "pH" },
  { name: "dissolvedOxygen", label: "O₂ (mg/L)" },
  { name: "ammonia", label: "Amônia (mg/L)" },
  { name: "nitrite", label: "Nitrito (mg/L)" },
  { name: "transparency", label: "Transp. (cm)" },
  { name: "date", label: "Data" },
  { name: "time", label: "Hora" },
  { name: "status", label: "Status" },
]

const statusVariant: Record<string, "success" | "warning" | "error"> = {
  normal: "success",
  alerta: "warning",
  crítico: "error",
}

function evaluateStatus(record: Partial<WaterQualityRecord>): "normal" | "alerta" | "crítico" {
  if (
    (record.ammonia && record.ammonia > 0.1) ||
    (record.dissolvedOxygen && record.dissolvedOxygen < 4) ||
    (record.nitrite && record.nitrite > 0.07)
  ) return "crítico"
  if (
    (record.ammonia && record.ammonia > 0.05) ||
    (record.dissolvedOxygen && record.dissolvedOxygen < 5) ||
    (record.ph && (record.ph < 6.5 || record.ph > 8.5))
  ) return "alerta"
  return "normal"
}

function openForm() {
  const modal = document.getElementById("water-modal") as HTMLDialogElement
  modal?.showModal()
}

function closeForm() {
  form.value = {
    tankId: undefined, temperature: 27, ph: 7.0, dissolvedOxygen: 5.5,
    ammonia: 0.02, nitrite: 0.01, transparency: 30,
    date: new Date().toISOString().split("T")[0], time: "06:00",
  }
}

function saveRecord() {
  if (!form.value.tankId) {
    toast.error("Selecione um tanque", { position: toast.POSITION.BOTTOM_RIGHT })
    return
  }

  const tank = tanksList.find((t) => t.id === form.value.tankId)
  const status = evaluateStatus(form.value)

  const newRecord: WaterQualityRecord = {
    id: records.value.length + 1,
    tankId: form.value.tankId!,
    tankName: tank?.name || "",
    temperature: form.value.temperature!,
    ph: form.value.ph!,
    dissolvedOxygen: form.value.dissolvedOxygen!,
    ammonia: form.value.ammonia!,
    nitrite: form.value.nitrite!,
    transparency: form.value.transparency!,
    date: form.value.date!,
    time: form.value.time!,
    status,
  }

  records.value.unshift(newRecord)

  if (status === "crítico") {
    toast.error(`Atenção: parâmetros críticos no ${tank?.name}`, { position: toast.POSITION.BOTTOM_RIGHT })
  } else {
    toast.success("Medição registrada", { position: toast.POSITION.BOTTOM_RIGHT })
  }

  const modal = document.getElementById("water-modal") as HTMLDialogElement
  modal?.close()
  closeForm()
}
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <BaseStatCard title="Normal" :value="normalCount" icon="mdi:check-circle-outline" color="success" />
      <BaseStatCard title="Alerta" :value="alertCount" icon="mdi:alert-outline" color="warning" />
      <BaseStatCard title="Crítico" :value="criticalCount" icon="mdi:alert-circle" color="error" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-sm">Temperatura & pH (Semana)</h2>
          <Chart :size="{ width: 450, height: 200 }" :data="historyData" :margin="margin">
            <template #layers>
              <Grid stroke-dasharray="2,2" />
              <Line :data-keys="['name', 'temp']" />
              <Line :data-keys="['name', 'ph']" :line-style="{ stroke: '#22c55e' }" />
            </template>
          </Chart>
        </div>
      </div>
      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-sm">Oxigênio Dissolvido (Semana)</h2>
          <Chart :size="{ width: 450, height: 200 }" :data="historyData" :margin="margin">
            <template #layers>
              <Grid stroke-dasharray="2,2" />
              <Line :data-keys="['name', 'oxigenio']" :line-style="{ stroke: '#3b82f6' }" />
            </template>
          </Chart>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <BaseButton @click="openForm">
        <Icon icon="mdi:plus" class="icon" />
        Nova Medição
      </BaseButton>
    </div>

    <div class="card bg-base-200 shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-sm">Histórico de Medições</h2>
        <div class="overflow-x-auto">
          <table class="table table-xs">
            <thead>
              <tr>
                <th v-for="col in columns" :key="col.name">{{ col.label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in records" :key="row.id">
                <td>{{ row.tankName }}</td>
                <td>{{ row.temperature }}</td>
                <td>{{ row.ph }}</td>
                <td>{{ row.dissolvedOxygen }}</td>
                <td>{{ row.ammonia }}</td>
                <td>{{ row.nitrite }}</td>
                <td>{{ row.transparency }}</td>
                <td>{{ row.date }}</td>
                <td>{{ row.time }}</td>
                <td>
                  <BaseBadge :variant="statusVariant[row.status]">{{ row.status }}</BaseBadge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <BaseModal id="water-modal" title="Nova Medição de Água" size="lg" @close="closeForm">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="form-control md:col-span-3">
          <label class="label"><span class="label-text">Tanque *</span></label>
          <select v-model.number="form.tankId" class="select select-bordered w-full">
            <option disabled :value="undefined">Selecione</option>
            <option v-for="tank in activeTanks" :key="tank.id" :value="tank.id">
              {{ tank.name }}
            </option>
          </select>
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text">Temperatura (°C)</span></label>
          <input v-model.number="form.temperature" type="number" step="0.1" class="input input-bordered w-full" />
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text">pH</span></label>
          <input v-model.number="form.ph" type="number" step="0.1" class="input input-bordered w-full" />
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text">O₂ Dissolvido (mg/L)</span></label>
          <input v-model.number="form.dissolvedOxygen" type="number" step="0.1" class="input input-bordered w-full" />
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text">Amônia (mg/L)</span></label>
          <input v-model.number="form.ammonia" type="number" step="0.01" class="input input-bordered w-full" />
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text">Nitrito (mg/L)</span></label>
          <input v-model.number="form.nitrite" type="number" step="0.01" class="input input-bordered w-full" />
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text">Transparência (cm)</span></label>
          <input v-model.number="form.transparency" type="number" class="input input-bordered w-full" />
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text">Data</span></label>
          <input v-model="form.date" type="date" class="input input-bordered w-full" />
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text">Hora</span></label>
          <input v-model="form.time" type="time" class="input input-bordered w-full" />
        </div>
      </div>
      <div class="modal-action">
        <BaseButton @click="saveRecord">
          <Icon icon="mdi:content-save" class="icon" />
          Salvar
        </BaseButton>
      </div>
    </BaseModal>
  </div>
</template>
