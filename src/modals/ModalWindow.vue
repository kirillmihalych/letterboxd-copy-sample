<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div class="modal-bg" v-if="props.isOpen" @click="close">
        <div class="modal" @click.stop>
          <button class="close-btn" @click="close">
            <v-icon icon="mdi-close" />
          </button>
          <slot name="modal-content"></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface IModalWindow {
  isOpen: boolean
}

const props = defineProps<IModalWindow>()
const emits = defineEmits<{
  (e: 'close'): void
}>()

const close = () => emits('close')
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
  z-index: 2;
}

.modal {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.25rem;
  position: relative;
  background: var(--snow-white);
  border-radius: 5px;
  height: 20rem;
  width: 30rem;
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

.close-btn {
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.5rem;
  background: none;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}
</style>
