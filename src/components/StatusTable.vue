<template>
  <v-data-table
    :headers="headers"
    :items="statuses"
    :items-per-page="5"
    class="elevation-1"
    dense
  >
    <template #item.status="{ item }">
      <v-chip :color="item.status === '✅' ? 'green' : 'red'" dark>
        {{ item.status }}
      </v-chip>
    </template>
    <template #item.url="{ item }">
      <a
        :href="item.url"
        target="_blank"
        class="text-decoration-none"
        style="color: #1976d2;"
        >{{ item.url }}</a
      >
    </template>
    <template #item.checkedAt="{ item }">
      {{ formatDate(item.checkedAt) }}
    </template>
  </v-data-table>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  statuses: {
    type: Array,
    required: true,
  },
})

const headers = [
  { text: '이름', value: 'name', width: '20%' },
  { text: 'URL', value: 'url', width: '35%' },
  { text: '상태', value: 'status', width: '10%', align: 'center' },
  { text: '응답 시간 (ms)', value: 'responseTimeMs', width: '15%', align: 'right' },
  { text: '최종 확인 시각', value: 'checkedAt', width: '20%' },
]

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleString()
}
</script>
