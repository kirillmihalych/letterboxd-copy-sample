<template>
  <!-- <div>sign up</div> -->
  <div class="auth-page-container">
    <SpinnerComp v-if="loading" />
    <div v-if="error">
      <p class="error">
        {{ error }}.<br />
        Probably, a VPN is turned off.<br />
      </p>
    </div>
    <button @click="fetchRequestToken" class="create-session-btn">
      Approve your user's token.
    </button>
  </div>
</template>

<script setup lang="ts">
import { createRequestToken } from '@/api/user'
import { ref } from 'vue'
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'

const requestToken = ref<string | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const fetchRequestToken = async () => {
  error.value = null

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
  window.location.href = `https://www.themoviedb.org/authenticate/${requestToken.value}?redirect_to=http://localhost:5173/auth/approved`
}
</script>

<style scoped>
.create-session-btn {
  text-align: center;
  background: snow;
  border-radius: 0.2rem;
  margin-top: 0.75rem;
  font-size: 1.5rem;
}

.create-session-btn:hover {
  background: lightgray;
  cursor: pointer;
  /* transition: all 0.1s smooth; */
}

.error {
  font-size: 1.25rem;
  text-align: center;
}

.auth-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
