<template>
  <section class="crew-list-container">
    <div
      v-for="[department, departmentMembers] in crewMemberListMap"
      :key="department"
      class="crew-list-item"
    >
      <span>{{ department }}</span>
      <div class="crew-links-container">
        <RouterLink
          v-for="departmentMember in departmentMembers"
          :key="departmentMember.id"
          :to="constructCrewMemberURL(departmentMember.id)"
        >
          {{ departmentMember.name }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ICrewMember } from '@/interfaces/movie-types'
import { ROUTE_NAMES } from '@/router'
import { RouterLink } from 'vue-router'

interface ICrewListProps {
  crewMemberList: ICrewMember[]
}

const props = defineProps<ICrewListProps>()

const crewMemberListMap = new Map()

const createCrewMemberListMap = () => {
  for (let i = 0; i < props.crewMemberList.length; i++) {
    const isDepartmentAdded = crewMemberListMap.has(
      props.crewMemberList[i].department
    )

    const crewMemberObject = {
      id: props.crewMemberList[i].id,
      name: props.crewMemberList[i].name,
    }

    const addMemberToExistingDepartment = () => {
      crewMemberListMap.set(props.crewMemberList[i].department, [
        ...crewMemberListMap.get(props.crewMemberList[i].department),
        crewMemberObject,
      ])
    }

    const addNewDepartment = () =>
      crewMemberListMap.set(props.crewMemberList[i].department, [
        crewMemberObject,
      ])

    if (isDepartmentAdded) {
      addMemberToExistingDepartment()
    } else if (!isDepartmentAdded) {
      addNewDepartment()
    }
  }
}

createCrewMemberListMap()

const constructCrewMemberURL = (id: string) => {
  const crewMemberURL = { name: ROUTE_NAMES.PERSON, params: { id } }
  return crewMemberURL
}
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
