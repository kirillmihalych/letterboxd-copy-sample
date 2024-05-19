<template>
  <div>
    <div v-if="isLoading">...</div>
    <div v-if="error">{{ error }}</div>
    <button v-if="!isLoading && !error" @click="logoutHandler">logout</button>
  </div>
</template>

<script setup lang="ts">
import doLogout from '@/api/account/doLogout'
import { ACCOUNT_ID, SESSION, TOKEN_KEY } from '@/local-storage/keys'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSuccess = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)

const logoutHandler = async () => {
  error.value = null
  isLoading.value = true
  try {
    isSuccess.value = (await doLogout()).success
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString()
    }
  } finally {
    isLoading.value = false
    if (isSuccess.value) {
      localStorage.removeItem(SESSION)
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(ACCOUNT_ID)
      window.location.href = 'http://localhost:5173/base-layout'
    }
  }
}
</script>

<style scoped></style>
