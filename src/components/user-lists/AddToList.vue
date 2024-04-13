<template>
  <div class="add-to-list-options">
    <button @click="toggleListHandler" class="list-option">other</button>
    <div class="options" v-show="isListHandlerOpen">
      <RouterLink to="/lists/new" class="create-new-list-link"
        >+ Create new list</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isListHandlerOpen = ref(false)
const toggleListHandler = () => {
  isListHandlerOpen.value = !isListHandlerOpen.value
}
</script>

<style scoped>
.list-option {
  padding: 1.125rem;
  border: none;
}

.list-option:hover {
  cursor: pointer;
  background: lightgrey;
}

.add-to-list-options {
  display: grid;
  position: relative;
}

.options {
  position: absolute;
  top: -36px;
  background: lightgray;
  width: 150px;
  right: -1px;
  border: 1px solid black;
  text-decoration: none;
  color: #222;
}

.create-new-list-link {
  box-sizing: border-box;
  width: 150px;
  padding: 0.5rem;
  display: inline-block;
  color: #222;
  text-decoration: none;
}

.create-new-list-link:hover {
  background: snow;
  cursor: pointer;
}
</style>
