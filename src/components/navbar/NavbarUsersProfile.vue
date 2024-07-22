<template>
  <div class="login-container">
    <div v-if="isLoadingRequest || user.isLoadingAccount">
      <IconSpinner />
    </div>
    <div v-if="errorRequestToken">
      {{ errorRequestToken }}
    </div>
    <!-- <div v-if="isUserAuthorized && !isAvatarReady && !isLoadingRequest">
      You are authorized <br />
      Turn on a vpn and refresh the page.
    </div> -->
    <button
      class="login-link"
      @click="fetchRequestToken"
      v-if="!isUserAuthorized && !isLoadingRequest"
      :disabled="isLoadingRequest"
    >
      <v-icon icon="mdi-login" />
      <p class="sign-in-text">Sign In</p>
    </button>
    <div
      v-if="user.accountDetails"
      class="account-menu-wrapper"
      @click="toggleMenu"
      @mouseleave="closeMenu"
    >
      <IconSpinner v-show="!isAvatarReady" />
      <div to="/profile" class="avatar-container" v-show="isAvatarReady">
        <img
          :src="`https://image.tmdb.org/t/p/w45/${user.accountDetails.avatar.tmdb.avatar_path}`"
          alt="avatar"
          class="avatar"
          @load="isAvatarReady = true"
        />
        <h4>{{ user.accountDetails.username }}</h4>
        <v-icon icon="mdi-menu-down" />
        <DropdownList
          :is-dropdown-shown="isMenuOpen"
          :styles="menuCssProperties"
        >
          <template #dropdown-list>
            <WatchlistLink
              :isLoading="user.isLoading"
              :titles="user.watchlistTitles"
            />
            <FavoriteLink
              :isLoading="user.isLoading"
              :titles="user.favoriteTitles"
            />
            <RatedLink :isLoading="user.isLoading" :titles="user.ratedTitles" />
            <ListsLink :isLoading="user.isLoading" :titles="user.lists" />
            <LogoutButton />
          </template>
        </DropdownList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type CSSProperties } from 'vue'
import LogoutButton from './LogoutButton.vue'
import getRequestToken from '@/api/authentication/getRequestToken'
import { useUserStore } from '@/stores/user'
import WatchlistLink from './WatchlistLink.vue'
import IconSpinner from '../error-handling/IconSpinner.vue'
import DropdownList from '../dropdown-list/DropdownList.vue'
import FavoriteLink from './FavoriteLink.vue'
import RatedLink from './RatedLink.vue'
import ListsLink from './ListsLink.vue'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'

const user = useUserStore()
const isAvatarReady = ref(false)
const isUserAuthorized = getSessionFromLocalStorage()

const isMenuOpen = ref(false)
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)
const closeMenu = () => (isMenuOpen.value = false)

const menuCssProperties: CSSProperties = {
  width: 240 + 'px',
  top: 45 + 'px',
  right: 0,
  overflow: 'hidden',
}

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
  window.location.href = `https://www.themoviedb.org/authenticate/${requestToken.value}?redirect_to=https://f1re-movie-finder.netlify.app/auth/approved`
}
</script>

<style scoped>
.avatar-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  color: #222;
}

.avatar-container:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 10%);
}

.avatar {
  border-radius: var(--radius);
  margin-right: 0.25rem;
}

.vpn-warning {
  color: snow;
}

.login-container {
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
  .sign-in-text {
    display: none;
  }
}
</style>
