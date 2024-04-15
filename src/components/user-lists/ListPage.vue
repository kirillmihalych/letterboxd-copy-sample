<template>
  <section class="list-page-container">
    <SpinnerComp v-if="loading" />
    <div v-if="error">{{ error }}</div>
    <div class="list-container" v-if="list">
      <h1>{{ list.name }}</h1>
      <h2>
        by <span>{{ list?.created_by }}</span>
      </h2>
      <hr />
      <div class="items-container">
        <h3 v-show="list.items.length === 0">
          There is no items in a list yet
        </h3>
        <FilmCard v-for="movie in list.items" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { loadListDetails } from '@/api/lists'
import type { IList } from '@/interfaces/lists-types'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import SpinnerComp from '../error-handling/SpinnerComp.vue'
import FilmCard from '../movie-cards/FilmCard.vue'

const route = useRoute()
const id = route.params.id
const list = ref<IList | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)

const fetchListById = async (id: string) => {
  list.value = null
  error.value = null

  try {
    loading.value = true
    list.value = await loadListDetails(id)
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString()
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchListById(id as string)
})
</script>

<style scoped>
.list-page-container {
  box-sizing: border-box;
  width: 950px;
}

.items-container {
  width: 100%;
  display: flex;
  gap: 1rem;
}
</style>
