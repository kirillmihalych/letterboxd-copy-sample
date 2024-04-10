<template>
  <div class="trailers-carousel">
    <TrailerCard
      v-for="trailer in trailers"
      :key="trailer?.key"
      :videoKey="trailer?.key"
    />
  </div>
</template>

<script setup lang="ts">
import { loadVideoById } from '@/api/movie'
import { onMounted, ref } from 'vue'
import TrailerCard from './TrailerCard.vue'

interface IMovieTrailersCarousel {
  ids: number[]
}

interface ITrailer {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  official: boolean
  published_at: string
  site: string
  size: number
  type: string
}

interface ITrailerResult {
  id: number
  results: ITrailer[]
}

const props = defineProps<IMovieTrailersCarousel>()
const ids = props.ids

const trailers = ref<ITrailer[] | null>(null)

const getTrailers = async () => {
  trailers.value = await Promise.all(ids?.map((id) => loadVideoById(id)))
  trailers.value = trailers.value.filter(
    (trailer) => typeof trailer === 'object'
  )
}

onMounted(() => {
  getTrailers()
})
</script>

<style scoped></style>
