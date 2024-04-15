<template>
  <button @click="openTheModal" class="clear-modal-btn">
    clear all movies
  </button>
  <Teleport to="#modal">
    <Transition name="modal">
      <div class="modal-bg" v-if="isModalOpen">
        <div class="modal">
          <div class="modal-title-container">
            <h2>Confrim a cleaning</h2>
            <p class="warning">All items from a list will be deleted!</p>
          </div>
          <div class="btns-container">
            <button @click="closeTheModal">cancel</button>
            <button @click="clearList">confirm</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import { postClearMovies } from '@/api/lists'
import type { IClearList } from '@/interfaces/lists-types'

interface IClearListModalProps {
  list_id: number
}

const props = defineProps<IClearListModalProps>()
const list_id = props.list_id

const isModalOpen = ref(false)
const openTheModal = () => (isModalOpen.value = true)
const closeTheModal = () => (isModalOpen.value = false)

const clearList = async () => {
  let clearArgs: IClearList = {
    list_id,
    session_id: getSessionFromLocalStorage(),
    confirm: true,
  }
  try {
    await postClearMovies(clearArgs)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message.toString())
    }
  }
}
</script>

<style scoped>
.modal-bg {
  /* fix modal to the viewwport */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* Darken the screen */
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  width: 200px;
  height: 200px;
  position: relative;
  background: white;
  padding: 50px 100px;
  border-radius: 5px;
  box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

/* .add-modal-btn {
  padding: 1.125rem;
  border: none;
}

.add-modal-btn:hover {
  cursor: pointer;
  background: lightgrey;
} */

/* .modal-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
} */

/* .clear-modal-btn {
} */

.warning {
  color: red;
  font-size: 1.25rem;
  text-align: center;
}

.btns-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btns-container button {
  border: none;
  box-sizing: border-box;
  background: lightslategray;
  padding: 0.5rem 1rem;
  font-weight: 800;
  border-radius: 0.25rem;
  color: #222;
}

.btns-container button:hover {
  cursor: pointer;
  background: lightgrey;
}
</style>
