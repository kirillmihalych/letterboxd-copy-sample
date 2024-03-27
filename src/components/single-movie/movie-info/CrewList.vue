<template>
  <!-- <CrewMember
    v-for="crewMember in crewInfo"
    :key="crewMember.id"
    :crewMember="crewMember"
  /> -->
  <div>
    <div v-for="key in reactiveMap" :key="key[0]">
      <span>{{ key[0] }}</span> ...:
      <RouterLink to="/" v-for="(name, idx) in key[1]" :key="idx">
        {{ name }}
      </RouterLink>
      <hr />
    </div>
  </div>
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

<style scoped></style>
