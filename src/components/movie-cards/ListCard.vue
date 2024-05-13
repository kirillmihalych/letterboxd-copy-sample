<template>
  <div class="list-container">
    <div class="checkbox-container">
      <input
        type="checkbox"
        id="checkbox"
        :checked="list_status"
        @change="(e) => toggleStatusHandler(e)"
      />
      <label for="checkbox">{{ list.name }}</label>
    </div>
    <p class="list-info">
      {{
        isDetailsLoading
          ? '...'
          : list_details?.item_count
          ? list_details.item_count
          : list.item_count
      }}
      films
    </p>
  </div>
</template>

<script setup lang="ts">
import addMovie from '@/api/lists/addMovie'
import getListDetails from '@/api/lists/getListDetails'
import getListStatus from '@/api/lists/getListStatus'
import removieMovie from '@/api/lists/removeMovie'
import type { IList } from '@/interfaces/lists-types'
import { ref, watchEffect } from 'vue'

interface IListCard {
  list: IList
  movie_id?: number
}

const props = defineProps<IListCard>()
const list_status = ref()
const list_details = ref<IList | null>(null)
const isDetailsLoading = ref(false)

const toggleStatusHandler = async (e: Event) => {
  const event = (e.target as HTMLInputElement).checked
  try {
    if (event === false) {
      await removieMovie(props.movie_id as number, props.list.id)
    } else {
      await addMovie(props.movie_id as number, props.list.id)
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message.toString())
    }
  } finally {
    getListDetailsHandler()
  }
}

const isMoviePresent = async (list_id: number, movie_id: number) => {
  list_status.value = await getListStatus(list_id, movie_id)
}

const getListDetailsHandler = async () => {
  try {
    isDetailsLoading.value = true
    list_details.value = await getListDetails(props.list.id)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message.toString())
    }
  } finally {
    isDetailsLoading.value = false
  }
}

watchEffect(() => {
  if (props.list && props.movie_id) {
    isMoviePresent(props.list.id, props.movie_id)
  }
})
</script>

<style scoped>
.list-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 350px;
  background: lightgrey;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.list-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
}
</style>