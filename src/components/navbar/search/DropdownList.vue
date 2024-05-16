<template>
  <div class="dropdown-list-container">
    <div v-if="props.isLoading" class="loading">
      <SpinnerComp :color="'snow'" />
    </div>
    <div v-if="props.error">
      {{ props.error }}
    </div>
    <div v-if="!props.isLoading" class="content-container">
      <section class="media-results" v-if="props.media?.length">
        <h1>Movies and TV</h1>
        <!-- [__] этот лист можно сделать переиспользуемым со слотами -->
        <div>
          <MediaCard
            v-for="media in props.media"
            :key="media.id"
            :media="media"
          />
        </div>
      </section>
      <section v-if="props.persons?.length" class="person-results">
        <h1>Persons</h1>
        <!-- [__] этот лист можно сделать переиспользуемым со слотами -->
        <div>
          <PersonCard
            v-for="person in props.persons"
            :key="person.id"
            :person="person"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMovie, IPerson, ITVShow } from '@/interfaces/movie-types'
import MediaCard from './MediaCard.vue'
import PersonCard from './PersonCard.vue'
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'

interface IDropdownList {
  persons: IPerson[] | null
  media: (IMovie | ITVShow)[] | null
  isLoading: boolean
  error: string | null
}

const props = defineProps<IDropdownList>()
</script>

<style scoped>
.dropdown-list-container {
  position: fixed;
  top: 60px;
  z-index: 100;
  background: darkgrey;
  width: 400px;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  padding: 1rem;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}
</style>
