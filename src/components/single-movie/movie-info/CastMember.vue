<template>
  <RouterLink :to="castMemberURL" class="cast-member-name"
    >{{ props.castMember.name }}
  </RouterLink>
</template>

<script setup lang="ts">
import type { ICastMember } from '@/interfaces/movie-types'
import { RouterLink } from 'vue-router'
import { ROUTE_NAMES } from '@/router'

interface ICastMemberProps {
  castMember: ICastMember
}

const props = defineProps<ICastMemberProps>()
const castMemberURL = {
  name: ROUTE_NAMES.PERSON,
  params: { id: props.castMember.id },
}
</script>

<style scoped>
.cast-member-name {
  text-decoration: none;
  background: lightgray;
  border: 1px solid black;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  padding: 0.1rem 0.2rem;
  border-radius: 0.1rem;
  color: #222;
}

.char-name {
  background: lightblue;
}
</style>
