<template>
  <FilterWrapper :isClosed="true">
    <template #filter-heading>Rating</template>
    <template #filter-name>Rating</template>
    <template #filter-options>
      <div class="rating-values-wrapper">
        <div
          v-for="n in max"
          :key="n"
          class="rating-value"
          @click="ratingHandler(n)"
          :class="{ active: String(n) === store.rating }"
        >
          {{ n }}
        </div>
      </div>
    </template>
  </FilterWrapper>
</template>

<script setup lang="ts">
import { useFilterStore } from '@/stores/filters'
import { ref } from 'vue'
import FilterWrapper from './FilterWrapper.vue'
import _ from 'lodash'

const store = useFilterStore()

const min = ref(1)
const max = ref(10)

const ratingHandler = (rating: number) => {
  const str = String(rating)
  store.rating = str
}
</script>

<style scoped>
.rating-values-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rating-value {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid transparent;
}

.rating-value:hover {
  border: 2px solid var(--light-grey);
}

.active {
  border: 2px solid orange;
}
</style>
