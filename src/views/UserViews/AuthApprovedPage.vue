<template>
  <div class="approved-page-container">
    <div v-if="isTokenApproved">Your token was approved.</div>
    <div v-if="!isTokenApproved">Something went wrong.</div>
    <button @click="createSession()">Create an authorized session.</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { API_KEY } from '@/keys'

const TOKEN_KEY = 'token-tmdb'
const setTokenToLocalStorage = (payload: string): void => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(payload))
}

const SESSION_KEY = 'session-id'
const setSessionIdToLocalStorage = (payload: string): void => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload))
}

const curr_location = window.location.search
const url = new URLSearchParams(curr_location)
const isTokenApproved = url.get('approved')
const token = {
  request_token: url.get('request_token'),
}

const postOptions = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: API_KEY,
  },
  body: JSON.stringify(token ? token : localStorage.getItem(TOKEN_KEY)),
}

const createSession = async () => {
  const response = await (
    await fetch(
      'https://api.themoviedb.org/3/authentication/session/new',
      postOptions
    )
  ).json()
  setSessionIdToLocalStorage(response.session_id)
  console.log('is it worked?')
  window.location.replace('http://localhost:5173/films')
  return response.session_id
}

onMounted(() => {
  if (isTokenApproved === 'true') {
    setTokenToLocalStorage(token.request_token as string)
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
