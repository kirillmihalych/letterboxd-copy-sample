<template>
  <div class="list-handler-container">
    <h1>New list</h1>
    <hr />
    <form>
      <section class="create-list-section">
        <div>
          <h2>Name</h2>
          <p v-show="!isNameExist">there must be a name in a list</p>
          <input type="text" id="name" v-model="newList.name" />
        </div>
        <div>
          <h2>Descriptopn</h2>
          <textarea
            id="description"
            cols="30"
            rows="10"
            class="description-text-area"
            v-model="newList.description"
          />
        </div>
      </section>
      <section class="search-and-btns-container">
        <div>search and add film</div>
        <div class="link-btn-container">
          <RouterLink
            to="/lists"
            @click="() => console.log('list changes canceled')"
            class="link-btn"
            >cancel</RouterLink
          >
          <RouterLink
            to="/lists"
            @click="saveNewList(newList)"
            class="link-btn"
            v-show="isNameExist"
            >save</RouterLink
          >
          <button v-show="!isNameExist" class="link-btn-imposter">save</button>
        </div>
      </section>
    </form>
  </div>
</template>

<script setup lang="ts">
import { postNewList } from '@/api/lists'
import type { INewList } from '@/interfaces/lists-types'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const session_id: number = getSessionFromLocalStorage()

const defaultNewList: INewList = {
  name: '',
  description: '',
  language: 'en',
}
const newList = ref<INewList>(defaultNewList)

const isNameExist = computed(() => {
  return newList.value.name.length > 0
})

const saveNewList = async (list: INewList) => {
  try {
    if (newList.value.name.length > 0) {
      await postNewList(list, session_id)
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message.toString())
    }
  }
}
</script>

<style scoped>
.description-text-area {
  resize: none;
}

.create-list-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.search-and-btns-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.link-btn-container {
  display: flex;
  gap: 0.5rem;
}

.link-btn {
  text-decoration: none;
  color: #222;
  font-weight: bold;
  background: darkgrey;
  padding: 0.5rem;
  text-transform: capitalize;
  border-radius: 0.25rem;
}

.link-btn-imposter {
  text-decoration: none;
  color: #222;
  border: none;
  font-weight: bold;
  background: darkgrey;
  padding: 0.5rem;
  text-transform: capitalize;
  border-radius: 0.25rem;
}

.link-btn:hover {
  background: lightgrey;
}
</style>
