<template>
  <h1 style="text-align: center">Movie lists</h1>
  <section class="lists-container">
    <SpinnerComp v-if="loading" />
    <div v-if="error">{{ error }}</div>
    <div class="lists">
      <ListCard v-for="list in usersLists" :key="list.id" :list="list" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { loadUsersLists } from '@/api/lists'
import type { ICreatedList } from '@/interfaces/lists-types'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'
import ListCard from '@/components/user-lists/ListCard.vue'

const user = useUserStore()
const usersLists = ref<ICreatedList[] | null>(null)
const error = ref<string | null>()
const loading = ref(false)

const fetchUsersLists = async () => {
  try {
    loading.value = true
    usersLists.value = (
      await loadUsersLists(user.accountDetails?.id as number)
    ).results
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString()
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsersLists()
})
</script>

<style scoped>
.lists-container {
  /* background: red; */
  width: 950px;
}

.lists {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
