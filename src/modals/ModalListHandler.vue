<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div class="modal-bg" v-show="props.isOpen" @click="closeTheModal">
        <div class="modal" @click.stop>
          <div class="modal-title-container">
            <slot name="modal-header"></slot>
            <button @click="close" class="close-modal-btn">X</button>
          </div>
          <div>
            <div>
              <slot name="modal-content"></slot>
            </div>
            <div class="modal-actions">
              <slot name="modal-actions" :close="close"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import type { IAddMovieToListArgs } from '@/interfaces/lists-types'

interface IAddToListModalProps {
  movie_id: number
  isOpen: boolean
}

const props = defineProps<IAddToListModalProps>()
const emits = defineEmits<{
  (e: 'add', id: IAddMovieToListArgs): void
  (e: 'close'): void
}>()

const session_id = getSessionFromLocalStorage()

const list_id = ref<number | null>(null)

const close = () => emits('close')

const isModalOpen = ref(props.isOpen)
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
  width: 600px;
  height: 450px;
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

.close-modal-btn {
  border: none;
  padding: 0.5rem 1rem;
  background: slategray;
  text-transform: capitalize;
}

.close-modal-btn:hover {
  cursor: pointer;
  background: lightgrey;
}
</style>
