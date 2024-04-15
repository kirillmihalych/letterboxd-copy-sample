<template>
  <button @click="openTheModal" class="add-modal-btn">lists</button>
  <Teleport to="#modal">
    <Transition name="modal">
      <div class="modal-bg" v-if="isModalOpen">
        <div class="modal">
          <div class="modal-title-container">
            <h2>modal title</h2>
            <button @click="closeTheModal">close</button>
          </div>
          Click outside this modal to close it
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isModalOpen = ref(false)
const openTheModal = () => (isModalOpen.value = true)
const closeTheModal = () => (isModalOpen.value = false)
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

.add-modal-btn {
  padding: 1.125rem;
  border: none;
}

.add-modal-btn:hover {
  cursor: pointer;
  background: lightgrey;
}

.modal-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
