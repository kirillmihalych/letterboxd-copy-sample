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
.cast-list {
  width: 450px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
</style>
