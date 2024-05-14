import getAccountDetails from '@/api/account/getAccountDetails'
import type { IAccountDetails } from '@/interfaces/account-types'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const accountDetails = ref<IAccountDetails | null>(null)

  const fetchAccountDetails = async () => {
    accountDetails.value = await getAccountDetails()
  }

  onMounted(() => {
    fetchAccountDetails()
  })

  return { accountDetails }
})
