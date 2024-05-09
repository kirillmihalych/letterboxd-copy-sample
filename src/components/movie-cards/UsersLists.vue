<template>
  <div>
    <SpinnerComp v-if="loading" />
    <div v-if="error" class="lists-container">{{ error }}</div>
    <section v-if="usersLists" class="lists-container">
      <div
        v-for="list in usersLists"
        :key="list.id"
        :class="[selectedList === list.id ? activeClass : '', basicClass]"
        @click="selectList(list.id)"
      >
        <h2>{{ list.name }}</h2>
        <h3>
          {{
            list.item_count > 1
              ? `${list.item_count} films`
              : `${list.item_count} film`
          }}
        </h3>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { loadUsersLists } from '@/api/lists'
import type { ICreatedList } from '@/interfaces/lists-types'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import SpinnerComp from '@/components/error-handling/SpinnerComp.vue'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'

const emits = defineEmits<{
  (e: 'select-list', payload: number): void
}>()

const user = useUserStore()
const usersLists = ref<ICreatedList[] | null>(null)
const error = ref<string | null>()
const loading = ref(false)
const selectedList = ref(1)
const selectList = (id: number) => {
  selectedList.value = id
  emits('select-list', selectedList.value)
}
const session_id = getSessionFromLocalStorage()

const fetchUsersLists = async () => {
  try {
    loading.value = true
    if (user.accountDetails !== null && session_id) {
      usersLists.value = (
        await loadUsersLists(user.accountDetails.id, session_id)
      ).results
    } else {
      error.value = 'You are not authorized'
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message.toString()
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsersLists()
})

const activeClass = ref('active')
const basicClass = ref('list-option')
</script>

<style scoped>
.lists-container {
  box-sizing: border-box;
  width: 400px;
  height: 260px;
  overflow-y: scroll;
  /* padding-right: 1.5rem; */
}

.list-option {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: lightgray;
  padding: 0rem 2rem;
  border-radius: 0.25rem;
  margin-bottom: 0.2rem;
}

.list-option:hover {
  cursor: pointer;
  background: lightslategrey;
}

.active {
  background: slategrey;
}

.list-option h2 {
  font-size: 1.25rem;
  font-weight: 800;
  color: #222;
}

.list-option h3 {
  font-size: 1rem;
  font-weight: 800;
  color: darkgray;
  font-weight: 500;
}
</style>
