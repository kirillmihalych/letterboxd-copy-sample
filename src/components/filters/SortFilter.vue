<template>
  <FilterWrapper :isClosed="isClosed">
    <template #filter-heading>Sort by</template>
    <template #filter-name>Sort by</template>
    <template #filter-options>
      <div
        class="option"
        v-for="option in options"
        :key="option.name"
        @click="selectOptionHandler(option.value)"
      >
        <p>{{ option.name }}</p>
        <v-icon icon="mdi-radiobox-blank" v-if="store.sort !== option.value" />
        <v-icon
          icon="mdi-radiobox-marked"
          v-else="store.sort === option.value"
        />
      </div>
    </template>
  </FilterWrapper>
</template>

<script setup lang="ts">
import { useFilterStore } from '@/stores/filters'
import { ref } from 'vue'
import FilterWrapper from './FilterWrapper.vue'

const isClosed = ref(false)

const options = [
  {
    name: 'Most popular',
    value: 'popularity.desc',
  },
  {
    name: 'Newest',
    value: 'primary_release_date.desc',
  },
  {
    name: 'A to Z',
    value: 'title.asc',
  },
  {
    name: 'Rating (heighest)',
    value: 'vote_average.desc',
  },
  {
    name: 'Rating (lowest)',
    value: 'vote_average.asc',
  },
]

const store = useFilterStore()

const selectOptionHandler = (selectedSortOption: string) => {
  store.sort = selectedSortOption
  isClosed.value = !isClosed.value
}
</script>

<style scoped>
.option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 1.15rem;
}

.option:hover {
  color: var(--light-grey);
}
</style>
