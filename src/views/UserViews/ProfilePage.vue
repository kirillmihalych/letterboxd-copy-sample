<template>
  <div class="profile-page-container">
    <UserInfo @load="(id) => setAccountId(id)" />
    <ProfileNavbar />
    <PaginatedList />
  </div>
</template>

<script setup lang="ts">
import UserInfo from './UserInfo.vue'
import { ref } from 'vue'
import ProfileNavbar from './ProfileNavbar.vue'
import PaginatedList from './PaginatedList.vue'

const account_id = ref<number | null>(null)
const setAccountId = (id: number) => {
  account_id.value = id
}
</script>

<style scoped>
.profile-page-container {
  box-sizing: border-box;
  width: 950px;
}
</style>
