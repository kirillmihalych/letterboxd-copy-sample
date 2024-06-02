<template>
  <div v-if="list && !isListLoading" class="profile-list-card-container">
    <ImagePlaceholder
      :src="posterBaseURL + posterPath"
      :title="list.name"
      :imgParams="styles"
    />
    <div class="list-info-wrapper">
      <h4>{{ list.name }}</h4>
      <p>
        {{ list.total_results }}
        <span>{{ list.total_results === 1 ? 'movie' : 'movies' }}</span>
      </p>
      <p class="details">
        <span>More details at click</span
        ><v-icon icon="mdi-information-slab-circle" />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import getListDetails from '@/api/lists/getListDetails'
import type { IList } from '@/interfaces/lists-types'
import { computed, onMounted, ref } from 'vue'
import ImagePlaceholder from '@/components/ImagePlaceholder.vue'
import { RouterLink } from 'vue-router'

interface IProfileListCard {
  list_id: number
}

const props = defineProps<IProfileListCard>()
const list = ref<IList | null>(null)
const isListLoading = ref(false)
const posterBaseURL = `https://image.tmdb.org/t/p/w92`
const posterPath = ref('')
const setPosterPath = (path: string) => {
  posterPath.value = path
}

const fetchList = async () => {
  try {
    isListLoading.value = true
    list.value = await getListDetails(props.list_id)
  } catch (error) {
    console.log(error)
  } finally {
    if (list.value) {
      setPosterPath(list.value.items[0].poster_path)
    }
    isListLoading.value = false
  }
}

onMounted(() => {
  fetchList()
})

const styles = {
  width: 92 + 'px',
  height: 138 + 'px',
}

// const poster = ref(
//   `https://image.tmdb.org/t/p/w152/${list.value?.items[0].poster_path}`
// )
</script>

<style scoped>
.profile-list-card-container {
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.details {
  display: flex;
  gap: 0.25rem;
}
</style>
