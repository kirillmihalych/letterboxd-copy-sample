<template>
  <div class="login-container">
    <div v-if="isLoadingRequest || user.isLoadingAccount">
      <IconSpinner />
    </div>
    <div v-if="errorRequestToken" class="error-request-token">
      {{ errorRequestToken }}
    </div>
    <!-- <NavbarWatchlistLink /> -->
    <!-- <LogoutButton /> -->
    <button
      class="login-link"
      @click="fetchRequestToken"
      v-if="!user.accountDetails && !isLoadingRequest && !user.isLoadingAccount"
      :disabled="isLoadingRequest"
    >
      <v-icon icon="mdi-login" />
      <p>Sign In</p>
    </button>
    <div v-if="user.accountDetails" class="account-menu-wrapper">
      <IconSpinner v-show="!isAvatarReady" />
      <RouterLink to="/profile" class="avatar-container" v-show="isAvatarReady">
        <img
          :src="`https://image.tmdb.org/t/p/w45/${user.accountDetails.avatar.tmdb.avatar_path}`"
          alt="avatar"
          class="avatar"
          @load="isAvatarReady = true"
        />
        <h4>{{ user.accountDetails.username }}</h4>
        <v-icon icon="mdi-menu-down" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import LogoutButton from './LogoutButton.vue'
import getRequestToken from '@/api/authentication/getRequestToken'
import SpinnerComp from '../error-handling/SpinnerComp.vue'
import { useUserStore } from '@/stores/user'
import NavbarWatchlistLink from './NavbarWatchlistLink.vue'
import IconSpinner from '../error-handling/IconSpinner.vue'

const user = useUserStore()
const isAvatarReady = ref(false)

const requestToken = ref<string | null>(null)
const isLoadingRequest = ref(false)
const errorRequestToken = ref<string | null>(null)

const fetchRequestToken = async () => {
  errorRequestToken.value = null
  try {
    isLoadingRequest.value = true
    requestToken.value = await getRequestToken()
    approveToken()
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorRequestToken.value =
        err.message.toString() + ' ' + 'Probably, your VPN is turned off.'
    }
  } finally {
    isLoadingRequest.value = false
  }
}

const approveToken = (): void => {
  // window.location.href = `https://www.themoviedb.org/authenticate/${requestToken.value}?redirect_to=https://f1re-movie-finder.netlify.app/auth/approved`
  window.location.href = `https://www.themoviedb.org/authenticate/${requestToken.value}?redirect_to=http://localhost:5173/auth/approved`
}
</script>

<style scoped>
.avatar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: var(--radius);
  color: #222;
}

.avatar-container:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 10%);
}

.avatar {
  margin-right: 0.25rem;
}

.vpn-warning {
  color: snow;
}

.login-container {
  /* width: 190px; */
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

.login-link {
  padding: 0.25rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-weight: 800;
  border-radius: var(--radius);
}

.login-link:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 10%);
}

@media (max-width: 767px) {
  h4 {
    display: none;
  }
}
</style>
