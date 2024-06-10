<template>
  <RouterLink to="/">
    {{ crewMember.id }}
  </RouterLink>
</template>

<script setup lang="ts">
import type { ICrewMember } from '@/interfaces/movie-types'

interface ICrewMemberProps {
  crewMember: ICrewMember
}

const props = defineProps<ICrewMemberProps>()
const crewMember = props.crewMember
</script>

<style scoped></style>
