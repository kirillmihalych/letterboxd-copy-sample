<template>
  <select class="sort-by" @change="(e) => setSelectedSortOption(e)">
    <option disabled value="">Sort by</option>
    <option
      v-for="option in sortOptions"
      :key="option.name"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: 'set-sort-option', option: string): void
}>()

const sortOptions = [
  {
    name: 'Popularity',
    value: 'popularity.desc',
  },
  {
    name: 'Rating',
    value: 'vote_average.desc',
  },
  {
    name: 'Votes',
    value: 'vote_count.desc',
  },
  {
    name: 'Release',
    value: 'primary_release_date.desc',
  },
]

const setSelectedSortOption = (e: Event) => {
  const option = (e.target as HTMLInputElement).value
  emits('set-sort-option', option)
}
</script>

<style scoped>
.sort-by {
  width: 75px;
}

.sort-by {
  font-weight: bold;
}

.sort-by option {
  text-transform: capitalize;
}
</style>
