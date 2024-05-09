<template>
  <!-- <div v-show="!isAvatarReady && isCreated" class="vpn-warning">
    <p>
      You are an authorized<br />
      but we still can't' get your data<br />
      try to turn on a VPN, please.
    </p>
  </div> -->
  <div class="login-container">
    <div v-show="loadingRequestToken">
      <SpinnerComp />
    </div>
    <div v-if="errorRequestToken" class="error-request-token">
      {{ errorRequestToken }}
    </div>
    <button
      class="login-link"
      @click="fetchRequestToken"
      :disabled="loadingRequestToken"
    >
      Log in
    </button>
  </div>
  <!-- <RouterLink to="/profile" class="avatar-container" v-show="showAvatar">
    <img
      :src="avatarUrl"
      alt="wow-wow-wow"
      class="avatar"
      v-show="isAvatarReady"
      @load="isAvatarReady = true"
    />
  </RouterLink> -->
</template>

<script setup lang="ts">
import { getAccountDetails } from '@/api/user'
import type { IAccountDetails } from '@/interfaces/user-types'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import { ref, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
import getRequestToken from '@/api/authentication/getRequestToken'
import createSession from '@/api/authentication/getSessionId'
import SpinnerComp from '../error-handling/SpinnerComp.vue'

// const session_id = ref(getSessionFromLocalStorage())

// const accountDetails = ref<IAccountDetails | null>(null)
// const error = ref<string | null>(null)
// const loading = ref(false)
// const avatarUrl = ref<string>('')
// const showLogin = ref(true)
// const showAvatar = ref(false)
// const isAvatarReady = ref(false)
// const isCreated = ref(false)

// const fetchAccountDetails = async (sessionID: string) => {
//   error.value = null
//   accountDetails.value = null

//   try {
//     loading.value = true
//     accountDetails.value = await getAccountDetails(sessionID)
//     if (accountDetails.value) {
//       avatarUrl.value = `https://image.tmdb.org/t/p/w200${accountDetails.value.avatar.tmdb.avatar_path}`
//     }
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       error.value = err.message.toString()
//     }
//   } finally {
//     loading.value = false
//   }
// }

// const isSessionCreated = (session: string): void => {
//   if (session) {
//     showLogin.value = false
//     showAvatar.value = true
//     isCreated.value = true
//   }
// }

// watchEffect(() => {
//   fetchAccountDetails(session_id.value)
// })

// watchEffect(() => {
//   isSessionCreated(session_id.value)
// })

// LOGIN
const requestToken = ref<string | null>(null)
const loadingRequestToken = ref(false)
const errorRequestToken = ref<string | null>(null)

const fetchRequestToken = async () => {
  errorRequestToken.value = null
  try {
    loadingRequestToken.value = true
    requestToken.value = await getRequestToken()
    approveToken()
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorRequestToken.value =
        err.message.toString() + ' ' + 'Probably, your VPN is turned off.'
    }
  } finally {
    loadingRequestToken.value = false
  }
}

const approveToken = (): void => {
  // window.location.href = `https://www.themoviedb.org/authenticate/${requestToken.value}?redirect_to=https://f1re-movie-finder.netlify.app/auth/approved`
  window.location.href = `https://www.themoviedb.org/authenticate/${requestToken.value}?redirect_to=http://localhost:5173/auth/approved`
}
//
//
//
//
//
//
//
</script>

<style scoped>
.avatar-container {
  width: 60px;
  height: 60px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-container:hover {
  cursor: pointer;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid snow;
}

/* .login-link {
  box-sizing: border-box;
  text-decoration: none;
  background: snow;
  color: black;
  padding: 0.1rem 0.2rem;
  border-radius: 0.2rem;
} */

.login-btn:hover {
  cursor: pointer;
  /* background: lightgrey; */
}

.vpn-warning {
  color: snow;
}

.login-container {
  width: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.error-request-token {
  width: 135px;
  background: snow;
  padding: 0px 5px;
  border: 1px solid darkgrey;
}
</style>
