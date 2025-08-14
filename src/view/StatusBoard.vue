<template>
  <v-container class="pa-6" max-width="900">
    <v-row justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h1 class="text-h4 font-weight-bold">Status Board</h1>
      </v-col>
    </v-row>

    <!-- ✅ 최근 등록된 항목 보여주기 -->
<v-row>
  <v-col cols="12">
    <h2 class="text-h6 font-weight-bold">🆕 최근 등록한 항목</h2>
    <ul>
      <li v-for="url in recentlyRegistered" :key="url.url">
        {{ url.name }} - {{ url.url }}
      </li>
    </ul>
  </v-col>
</v-row>

    <!-- 등록 폼 -->
    <v-row class="mb-6" align="center" dense>
      <v-col cols="5">
        <v-text-field
          v-model="newUrl.name"
          label="사이트 이름"
          outlined
          dense
          clearable
          required
        />
      </v-col>
      <v-col cols="5">
        <v-text-field
          v-model="newUrl.url"
          label="URL (https://example.com)"
          outlined
          dense
          clearable
          required
          type="url"
        />
      </v-col>
      <v-col cols="2">
        <v-btn color="primary" class="ma-0" @click="registerUrl" block>
          등록
        </v-btn>
      </v-col>
    </v-row>

    <!-- 상태 테이블 -->
    <StatusTable :statuses="statuses" />

    <v-row justify="center" v-if="loading" class="mt-6">
      <v-progress-circular indeterminate color="primary" />
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import StatusTable from '../components/StatusTable.vue'

const statuses = ref([])
const loading = ref(false)

const newUrl = ref({ name: '', url: '' })

const fetchStatuses = async () => {
  loading.value = true
  try {
    const res = await fetch('/api/monitor') // 백엔드와 맞는 경로 확인
    if (!res.ok) throw new Error('서버 에러')
    const data = await res.json()
    console.log('받은 데이터:', data)  // 여기서 데이터가 제대로 찍히는지 확인
    statuses.value = data
  } catch (e) {
    alert('상태 불러오기 실패ㅠㅠ')
    console.error(e)
  } finally {
    loading.value = false
  }
}

const recentlyRegistered = ref([])

const registerUrl = async () => {
  if (!newUrl.value.name || !newUrl.value.url) return

  try {
    const res = await fetch('/api/monitor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUrl.value),
    })
    if (!res.ok) throw new Error('등록 실패')

    recentlyRegistered.value.push({ ...newUrl.value })
    await fetchStatuses()
    newUrl.value.name = ''
    newUrl.value.url = ''
  } catch {
    alert('URL 등록 실패ㅠㅠ')
  }
}

onMounted(fetchStatuses)
</script>
