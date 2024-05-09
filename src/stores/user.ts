import { getAccountDetails } from '@/api/user'
import type { IAccountDetails } from '@/interfaces/user-types'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

export const useUserStore = defineStore('user', () => {
  const accountDetails = ref<IAccountDetails | null>(null)
  const session_id = ref(getSessionFromLocalStorage())

  const error = ref<string | null>(null)
  const loading = ref(false)
  const avatarUrl = ref<string>('')
  const showLogin = ref(true)
  const showAvatar = ref(false)
  const isAvatarReady = ref(false)
  const isCreated = ref(false)

  const fetchAccountDetails = async (sessionID: string) => {
    error.value = null
    accountDetails.value = null

    try {
      loading.value = true
      if (session_id.value) {
        accountDetails.value = await getAccountDetails(sessionID)
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
    if (session) {
      showLogin.value = false
      isCreated.value = true
    }
  }

  watchEffect(() => {
    fetchAccountDetails(session_id.value)
  })

  watchEffect(() => {
    isSessionCreated(session_id.value)
  })

  return { accountDetails }
})
