<template>
  <RouterLink to="/" class="cast-member-name">
    <span class="char-name">{{ castMemberInfo.character }}</span> is
    {{ castMemberInfo.name }}
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
.char-name {
  background: lightblue;
}
</style>
