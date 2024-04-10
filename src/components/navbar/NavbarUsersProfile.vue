<template>
  <div v-show="showLogin">
    <RouterLink to="/auth" class="login-link">Log in</RouterLink>
  </div>
  <div class="avatar-container" v-show="showAvatar">
    <img :src="avatarUrl" alt="wow-wow-wow" class="avatar" />
  </div>
</template>

<script setup lang="ts">
import { getAccountDetails } from '@/api/user'
import type { IAccountDetails } from '@/interfaces/user-types'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import { computed, ref, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'

const session_id = getSessionFromLocalStorage()

const accountDetails = ref<IAccountDetails | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)
const avatarUrl = ref<string>('')
const showLogin = ref(true)
const showAvatar = ref(false)

const fetchAccountDetails = async (sessionID: string) => {
  error.value = null
  accountDetails.value = null

  try {
    loading.value = true
    accountDetails.value = await getAccountDetails(sessionID)
    if (accountDetails.value) {
      avatarUrl.value = `https://image.tmdb.org/t/p/w200${accountDetails.value.avatar.tmdb.avatar_path}`
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString()
    }
  } finally {
    loading.value = false
  }
}

const isSessionCreated = (session: string): void => {
  if (session_id) {
    showLogin.value = false
    showAvatar.value = true
  }
}

watchEffect(() => {
  fetchAccountDetails(session_id)
})

watchEffect(() => {
  isSessionCreated(session_id)
})
</script>

<style scoped>
.avatar-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 50px;
  border-radius: 50%;
  border: 2px solid snow;
}

.login-link {
  box-sizing: border-box;
  text-decoration: none;
  background: snow;
  color: black;
  padding: 0.1rem 0.2rem;
  border-radius: 0.2rem;
}

.login-link:hover {
  cursor: pointer;
  background: lightgrey;
}
</style>
