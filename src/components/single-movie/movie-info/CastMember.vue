<template>
  <RouterLink to="/" class="cast-member-name"
    >{{ castMemberInfo.name }}
  </RouterLink>
</template>

<script setup lang="ts">
import type { ICastMember } from '@/types'
import { RouterLink } from 'vue-router'

interface ICastMemberProps {
  castMemberInfo: ICastMember
}

const { castMemberInfo } = defineProps<ICastMemberProps>()
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
