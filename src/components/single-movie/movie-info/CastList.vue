<template>
  <div class="cast-list">
    <CastMember
      v-for="castMember in showedCastMembers"
      :key="castMember.id"
      :castMemberInfo="castMember"
    />
    <button @click="showAllCastMembers" v-show="endOfCastList !== castLength">
      Show all
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import CastMember from './CastMember.vue'
import type { ICastMember } from '@/types'

interface ICastListProps {
  castInfo: ICastMember[]
}
const props = defineProps<ICastListProps>()
const cast = props.castInfo

const castLength = ref(cast.length)
const endOfCastList = ref(10)

function showAllCastMembers() {
  endOfCastList.value = castLength.value
}

const showedCastMembers = computed((): ICastMember[] => {
  return cast.slice(0, endOfCastList.value)
})
</script>

<style scoped>
/* .cast-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  width: 550px;
} */
.cast-list {
  display: grid;
  gap: 0.25rem;
}
</style>
