<template>
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
      v-if="!user.accountDetails"
      :disabled="loadingRequestToken"
    >
      Log in
    </button>
    <div v-if="user.accountDetails">
      <RouterLink to="/profile" class="avatar-container">
        <SpinnerComp v-show="!isAvatarReady" />
        <img
          :src="`https://image.tmdb.org/t/p/w200/${user.accountDetails.avatar.tmdb.avatar_path}`"
          alt="avatar"
          class="avatar"
          @load="isAvatarReady = true"
          v-show="isAvatarReady"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import getRequestToken from '@/api/authentication/getRequestToken'
import SpinnerComp from '../error-handling/SpinnerComp.vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const isAvatarReady = ref(false)

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

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid snow;
}

.avatar:hover {
  cursor: pointer;
  border: 2px solid darkgrey;
  transition: 0.05s;
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
