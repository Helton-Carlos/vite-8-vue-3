<script setup lang="ts">
import type { TableColumn, TableRow } from "./types";

defineProps<{
  columns: TableColumn[];
  rows?: TableRow[];
}>();
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-xs">
      <thead>
        <th
          v-for="col in columns"
          :key="col.label"
        >
          {{ col.label }}
        </th>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="index"
        >
          <td
            v-for="col in columns"
            :key="col.label"
          >
            {{ row[col.name] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
