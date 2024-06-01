<template>
  <div>
    <div v-if="isLoading">...</div>
    <div v-if="error">{{ error }}</div>
    <button v-if="!isLoading && !error" @click="logoutHandler" class="logout">
      <v-icon icon="mdi-logout" />
      <p>logout</p>
    </button>
  </div>
</template>

<script setup lang="ts">
import doLogout from '@/api/account/doLogout'
import { ACCOUNT_ID, SESSION, TOKEN_KEY } from '@/local-storage/keys'
import { ref } from 'vue'

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

<style scoped>
.logout {
  width: 100%;
  border-radius: var(--radius);
  background: none;
  color: var(--snow-white);
  font-weight: 800;
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  text-transform: capitalize;
}

.logout:hover {
  cursor: pointer;
  background-color: rgba(236, 236, 236, 25%);
}
</style>
