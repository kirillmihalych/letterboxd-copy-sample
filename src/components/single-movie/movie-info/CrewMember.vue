<template>
  <RouterLink to="/">
    {{ crewMember.name }}
  </RouterLink>
</template>

<script setup lang="ts">
import type { ICrewMember } from '@/types'

interface ICrewMemberProps {
  crewMember: ICrewMember
}

const props = defineProps<ICrewMemberProps>()
const crewMember = props.crewMember
</script>

<style scoped></style>
