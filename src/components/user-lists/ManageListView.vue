<template>
  <div class="page-container">
    <div v-if="!isListCreated" class="create-list-container">
      <h1>Create list</h1>
      <label for="name">Title</label>
      <input
        type="text"
        id="name"
        v-model="title"
        placeholder="list title is required"
        class="list-input"
      />
      <label for="description">Description</label>
      <input
        type="text"
        id="description"
        v-model="description"
        placeholder="add a description or skip it"
        class="list-input"
      />
      <div class="btns-container">
        <button
          v-if="!isListCreated"
          :disabled="!isTitleEntered"
          @click="createListHandler"
        >
          Create
        </button>
      </div>
    </div>
    <div v-if="isListCreated" class="list-title-container">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <div class="btns-container">
        <button :disabled="true">Save</button>
        <DeleteListModal :list_id="list?.id as number" />
      </div>
    </div>
    <main>
      <div v-if="isLoading" class="loading">
        <SpinnerComp />
      </div>
      <div v-if="errorLoad">
        {{ errorLoad }}
      </div>
      <div v-if="!isListCreated">
        <p>List is not created yet</p>
        <p>Create it using the form above</p>
      </div>
      <div v-if="isListCreated">
        <SearchMovies @update-list-items="getList" />
      </div>
      <div v-if="isListEmpty">
        <p>Your list is created, but it is empty</p>
        <p>Add films or tvs using the field above</p>
      </div>
      <ListMovies :movies="list?.items" @update-list-items="getList" />
    </main>

    <div class="edit-list-container"></div>
  </div>
</template>

<script setup lang="ts">
import createList from '@/api/lists/createList'
import getListDetails from '@/api/lists/getListDetails'
import { type IList } from '@/interfaces/lists-types'
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SpinnerComp from '../error-handling/SpinnerComp.vue'
import SearchMovies from './SearchMovies.vue'
import ListMovies from './ListMovies.vue'
import DeleteListModal from '@/modals/DeleteListModal.vue'

const route = useRoute()
const router = useRouter()
const title = ref('')
const description = ref('')
const listId = ref<number | null>(null)
const list = ref<IList | null>(null)
const errorCreate = ref<string | null>()
const errorLoad = ref<string | null>()
const isCreating = ref(false)
const isLoading = ref(false)

const isTitleEntered = computed(() => {
  return title.value.length
})

const isListCreated = computed(() => {
  return list.value !== null
})

const isListEmpty = computed(() => {
  return list.value?.items.length === 0
})

const createListHandler = async () => {
  isCreating.value = true
  try {
    listId.value = (await createList(title.value, description.value)).list_id
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorCreate.value = err.message.toString()
    }
  } finally {
    isCreating.value = false
    router.replace(`/profile/lists/${listId.value}`)
  }
}

const getList = async () => {
  isLoading.value = true
  let id = route.params.id ? route.params.id : listId.value
  try {
    if (id) {
      list.value = await getListDetails(id as number)
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorLoad.value = err.message.toString()
    }
  } finally {
    if (list.value) {
      title.value = list.value.name
      description.value = list.value.description
    }
    isLoading.value = false
  }
}

watchEffect(() => {
  getList()
})
</script>

<style scoped>
.create-list-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 0.5rem;
  background: darkgrey;
  width: 950px;
  padding: 1rem;
}

.list-input {
  border: 1px solid black;
  padding: 0.5rem;
  width: 100%;
}

.btns-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  background: red;
}
</style>
