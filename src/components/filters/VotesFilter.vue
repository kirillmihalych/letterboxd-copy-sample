<template>
  <FilterWrapper :isClosed="true">
    <template #filter-heading>Votes</template>
    <template #filter-name>Votes</template>
    <template #filter-options>
      <div class="votes-values-wrapper">
        <input
          type="number"
          v-model="currValue"
          min="0"
          placeholder="Votes number"
        />
        <button @click="votesHandler(currValue)" class="apply-btn">
          Apply
        </button>
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
const currValue = ref<number | null>(null)

const votesHandler = (votes: number | null) => {
  if (votes) {
    const str = String(votes)
    store.votes = str
  }
}
</script>

<style scoped>
.votes-values-wrapper {
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: center;
  flex-direction: column;
}

.votes-values-wrapper input {
  font-size: 1.25rem;
  padding: 0.25rem 0.5rem;
  width: 100%;
  letter-spacing: 0.05rem;
}

.votes-valuer:hover {
  border: 2px solid var(--light-grey);
}

.active {
  border: 2px solid orange;
}

.apply-btn {
  padding: 0.25rem 0.5rem;
  margin-top: 1rem;
  border-radius: var(--radius);
  background-color: orange;
}

.apply-btn:hover {
  cursor: pointer;
  color: var(--snow-white);
}
</style>
