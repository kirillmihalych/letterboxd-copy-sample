<template>
  <FilterWrapper :isClosed="isClosed">
    <template #filter-heading>Decade</template>
    <template #filter-name>Decade</template>
    <template #filter-options>
      <div
        v-for="decade in decades"
        :key="decade"
        class="decade"
        @click="selectDecadeHandler(decade)"
      >
        <p>{{ decade }}s</p>
        <v-icon
          v-if="Number(store.releaseDateFrom.slice(0, 4)) === decade"
          icon="mdi-check-bold"
        />
      </div>
    </template>
  </FilterWrapper>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FilterWrapper from './FilterWrapper.vue'
import { useFilterStore } from '@/stores/filters'

const store = useFilterStore()

const start = 1900
const year = 2020

const decades = ref<number[]>([])
const generateDecades = () => {
  for (let i = year; i >= start; i = i - 10) {
    decades.value.push(i)
  }
}

const isClosed = ref(false)

const selectDecadeHandler = (decade: number) => {
  let start = decade
  let finish = decade + 10
  store.releaseDateFrom = `${start}-01-01`
  store.releaseDateTo = `${finish}-01-01`
  isClosed.value = !isClosed.value
}

onMounted(() => {
  generateDecades()
})
</script>

<style scoped>
.number-input {
  border: 2px dotted blue;
  outline: none;
  font-size: 1.25rem;
  padding: 0.25rem 0.5rem;
}

.decade {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.decade:hover {
  cursor: pointer;
  color: var(--light-grey);
}

.decade p {
  letter-spacing: 0.1rem;
  width: 65px;
}
</style>
