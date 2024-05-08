<template>
  <div class="fetch-handle-container" v-if="loadingPeopleList">
    <SpinnerComp />
  </div>
  <div v-if="errorPeopleList">{{ errorPeopleList }}</div>
  <div v-if="peopleList">
    <CarouselComponent :generic-list="peopleList" />
  </div>
</template>

<script setup lang="ts">
import { loadPopularPeople } from '@/api/people'
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'
import CarouselComponent from '@/components/generic-carousel/CarouselComponent.vue'

import type { IPerson } from '@/interfaces/movie-types'
import { onMounted, ref } from 'vue'

const peopleList = ref<IPerson[] | null>(null)
const errorPeopleList = ref<string | null>(null)
const loadingPeopleList = ref(false)

onMounted(() => fetchTrendMovies())

const fetchTrendMovies = async () => {
  errorPeopleList.value = null
  peopleList.value = null
  loadingPeopleList.value = true

  try {
    peopleList.value = await loadPopularPeople()
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorPeopleList.value =
        err.message.toString() + ' Возможно, у Вас выключен VPN.'
    }
  } finally {
    loadingPeopleList.value = false
  }
}
</script>

<style scoped></style>
