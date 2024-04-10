<template>
  <div>sign up</div>
  <button @click="fetchRequestToken">click</button>
</template>

<script setup lang="ts">
import { createRequestToken } from '@/api/user'
import { onMounted, ref } from 'vue'

const requestToken = ref<string | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const fetchRequestToken = async () => {
  try {
    loading.value = true
    requestToken.value = await createRequestToken()
    doApproveToken()
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString()
    }
  } finally {
    loading.value = false
  }
}

const doApproveToken = (): void => {
  // localStorage.setItem('auth-page-token', JSON.stringify(requestToken.value))
  window.location.href = `https://www.themoviedb.org/authenticate/${requestToken.value}?redirect_to=http://localhost:5173/auth/approved`
}

onMounted(() => {
  fetchRequestToken()
})
</script>

<style scoped></style>
