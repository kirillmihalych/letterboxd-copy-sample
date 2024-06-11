<template>
  <div class="page-container">
    <div v-if="isLoading" class="loading-spinner">
      <SpinnerComp />
    </div>
    <div class="loaded-content-wrapper" v-if="!isLoading">
      <!-- list is not created yet -->
      <div
        v-if="!isListCreated && !isListUpdating"
        class="create-list-container"
      >
        <h2 class="h3 title">Create list</h2>
        <span class="title-input-wrapper">
          <label for="name">List's title</label>
          <input
            type="text"
            id="name"
            v-model="title"
            placeholder="List title is required"
            class="list-title-input"
            autocomplete="off"
          />
        </span>
        <!-- btns -->
        <div class="btns-container">
          <button
            v-if="!isListCreated"
            :disabled="!isTitleEntered"
            @click="createListHandler"
            class="create-list-btn"
          >
            Create
          </button>
        </div>
        <!-- btns -->
      </div>
      <!-- list is create here -->
      <div v-if="isListCreated" class="list-title-container">
        <h2 class="h3 title">{{ title }}</h2>
        <!--  -->
        <div class="btns-container">
          <DeleteListModal :list_id="list?.id as number" />
        </div>
        <!--  -->
      </div>
      <div>
        <div v-if="isListUpdating" class="loading-spinner">
          <SpinnerComp />
        </div>
        <div v-if="errorLoad">
          {{ errorLoad }}
        </div>

        <div v-if="!isListUpdating" class="movie-list-wrapper">
          <div v-if="isListCreated">
            <SearchMovies @update-list-items="getList" />
          </div>
          <!-- is create or it is empty -->
          <div v-if="!isListCreated" class="create-list-info">
            <p>List is not created yet</p>
            <p>Create it using the form above</p>
          </div>
          <div v-if="isListEmpty" class="create-list-info">
            <p>Your list is created, but it is empty</p>
            <p>Add films or tvs using the field above</p>
          </div>
          <ListMovies :movies="list?.items" @update-list-items="getList" />
        </div>
      </div>
    </div>
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
const isListUpdating = ref(false)

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
  isListUpdating.value = true
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
    isListUpdating.value = false
  }
}

watchEffect(() => {
  getList()
})
</script>

<style scoped>
.title-input-wrapper {
  display: grid;
  gap: 0.5rem;
}

.title-input-wrapper label {
  padding: 0.5rem;
  font-weight: 800;
}

.list-title-input {
  outline: none;
  border: 2px solid var(--light-grey);
  padding: 0.5rem;
  border-radius: var(--radius);
}

.create-list-btn {
  background-color: slategray;
  width: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
  border-radius: var(--radius);
  font-weight: 800;
}

.create-list-btn:hover {
  cursor: pointer;
  background-color: lightslategray;
}

.create-list-info {
  margin-top: 2rem;
  border: 2px dotted var(--light-grey);
  color: var(--light-grey);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  border-left: 0.25rem solid red;
  padding-left: 1rem;
}

.list-title-container {
  display: flex;
  justify-content: space-between;
  align-items: start;
}
</style>
