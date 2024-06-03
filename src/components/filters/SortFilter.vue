<template>
  <div>
    <select v-model="store.sort" class="select-input">
      <DropdownList :is-dropdown-shown="true">
        <template #dropdown-list>
          <option disabled>Sort by</option>
          <option v-for="option in sortOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </template>
      </DropdownList>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useFilterStore } from '@/stores/filters'
import DropdownList from '../dropdown-list/DropdownList.vue'

const sortOptions = {
  mostPopular: 'popularity.desc',
  newest: 'primary_release_date.desc',
  aToZ: 'tilte.asc',
  heighestRating: 'vote_average.desc',
  lowestRating: 'vote_average.asc',
}

const store = useFilterStore()
</script>

<style scoped>
.select-input {
  border: 2px dotted blue;
}
</style>
