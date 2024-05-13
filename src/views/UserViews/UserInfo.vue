<template>
  <div class="user-info-container">
    <div v-if="isLoading" class="loading-error-container">
      <SpinnerComp />
    </div>
    <div v-if="error" class="loading-error-container">
      <p>{{ error }}</p>
    </div>
    <div v-if="account_details" class="account-details-container">
      <img :src="avatar" alt="avatar" class="avatar" />
      <div class="username-container">
        {{ account_details.username }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import getAccountDetails from '@/api/account/getAccountDetails'
import type { IAccountDetails } from '@/api/account/types'
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'
import { onMounted, ref } from 'vue'

const emits = defineEmits<{
  (e: 'load', id: number): void
}>()

const account_details = ref<IAccountDetails | null>(null)
const error = ref<string | null>(null)
const isLoading = ref(false)
const avatar = ref('')
const setAvatar = () => {
  avatar.value = `https://image.tmdb.org/t/p/w200${account_details.value?.avatar.tmdb.avatar_path}`
}
// const account_id = ref<number | undefined>(undefined)
// const setAccountId = () => {
//   account_id.value = account_details.value?.id
// }

const getAccountDetailsHandler = async () => {
  try {
    isLoading.value = true
    account_details.value = await getAccountDetails()
    setAvatar()
    // setAccountId()
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString() + ' ' + 'You are not authorized.'
    }
  } finally {
    isLoading.value = false
    if (account_details.value) {
      emits('load', account_details.value.id)
    }
  }
}

onMounted(() => {
  getAccountDetailsHandler()
})
</script>

<style scoped>
.user-info-container {
  background: darkgrey;
  padding: 1rem;
  margin-bottom: 1.25rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.account-details-container {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
}

.username-container {
  display: flex;
  align-self: start;
  font-weight: bold;
  font-size: 2.25rem;
  letter-spacing: 0.1rem;
  color: #222;
  text-decoration: underline;
}

.avatar {
  width: 185px;
  height: 185px;
  border-radius: 50%;
}
</style>
