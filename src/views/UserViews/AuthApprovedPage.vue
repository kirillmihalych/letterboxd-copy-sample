<template>
  <div class="approved-page-container">
    <div v-if="isTokenApproved">
      Congrats! Your token was approved. Enjoy the app.
    </div>
    <div v-if="error">
      Something went wrong <br />
      You will be redirected to the home page.
    </div>
  </div>
</template>

<script setup lang="ts">
import createSession from '@/api/authentication/getSessionId'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()
const curr_location = window.location.search
const url = new URLSearchParams(curr_location)
const isTokenApproved = url.get('approved')
const error = ref(false)

const redirectToHome = () => {
  router.push({ name: 'Home' })
}

onMounted(() => {
  if (isTokenApproved) {
    createSession()
  } else {
    error.value = true
    setTimeout(redirectToHome, 5000)
  }
})
</script>

<style scoped>
.approved-page-container {
  display: grid;
  place-items: center;
  gap: 1rem;
}
</style>
