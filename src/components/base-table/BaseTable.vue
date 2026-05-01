<script setup lang="ts">
import type { TableColumn, TableRow } from './types';

defineProps<{
  columns: TableColumn[];
  rows?: TableRow[];
  striped?: boolean;
  hoverable?: boolean;
}>();
</script>

<template>
  <div class="overflow-x-auto rounded-lg">
    <table
      class="table table-sm"
      :class="{ 'table-zebra': striped !== false }"
    >
      <thead>
        <tr class="bg-base-300/50">
          <th
            v-for="col in columns"
            :key="col.label"
            class="text-xs uppercase tracking-wider opacity-70 font-semibold"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="index"
          class="transition-colors duration-100"
          :class="{ 'hover:bg-base-300/30': hoverable !== false }"
        >
          <td
            v-for="col in columns"
            :key="col.label"
            class="text-sm"
          >
            {{ row[col.name] }}
          </td>
        </tr>
        <tr v-if="!rows || rows.length === 0">
          <td
            :colspan="columns.length"
            class="text-center py-8 opacity-40"
          >
            Nenhum registro encontrado
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
