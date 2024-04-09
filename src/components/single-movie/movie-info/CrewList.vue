<template>
  <section class="crew-list-container">
    <div v-for="key in reactiveMap" :key="key[0]" class="crew-list-item">
      <span>{{ key[0] }}</span>
      <div class="crew-links-container">
        <RouterLink to="/" v-for="(name, idx) in key[1]" :key="idx">
          {{ name }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ICrewMember } from '@/types'
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'

interface ICrewListProps {
  crewInfo: ICrewMember[]
}

const props = defineProps<ICrewListProps>()
const crewInfo = props.crewInfo

const crewMap = new Map()
for (let i = 0; i < crewInfo.length; i++) {
  if (crewMap.has(crewInfo[i].department)) {
    let load = [...crewMap.get(crewInfo[i].department), crewInfo[i].name]
    crewMap.set(crewInfo[i].department, load)
  } else {
    crewMap.set(crewInfo[i].department, [crewInfo[i].name])
  }
}

const reactiveMap = reactive(crewMap)
</script>

<style scoped>
.crew-list-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 0.5rem;
}

.crew-links-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}

.crew-links-container a {
  text-decoration: none;
  background: lightgray;
  border: 1px solid black;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  padding: 0.1rem 0.2rem;
  border-radius: 0.1rem;
  color: #222;
}

.crew-links-container a:hover {
  background: snow;
  transition: all 0.1s;
}
</style>
