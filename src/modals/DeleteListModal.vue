<template>
  <button @click="openTheModal" class="clear-modal-btn">
    <v-icon icon="mdi-trash-can" class="delete-icon" title="delete list" />
  </button>
  <Teleport to="#modal">
    <Transition name="modal">
      <div class="modal-bg" v-if="isModalOpen">
        <div class="modal">
          <div class="modal-title-container">
            <h3 class="modal-title">Confrim deletion</h3>
          </div>
          <p class="warning">This list will be deleted completly</p>
          <div class="btns-container">
            <button @click="closeTheModal" class="cancel-btn">cancel</button>
            <button @click="fetchDeleteList" class="confirm-btn">
              confirm
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import deleteList from '@/api/lists/deleteList'
import { useRouter } from 'vue-router'

interface IClearListModalProps {
  list_id: number
}

const props = defineProps<IClearListModalProps>()
const isListDeleted = ref(false)
const router = useRouter()

const isModalOpen = ref(false)
const openTheModal = () => (isModalOpen.value = true)
const closeTheModal = () => (isModalOpen.value = false)

const fetchDeleteList = async () => {
  try {
    isListDeleted.value = await deleteList(props.list_id)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message.toString())
    }
  } finally {
    if (isListDeleted) {
      router.replace('/profile/lists')
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
  z-index: 2;
}

.modal {
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  position: relative;
  background: white;
  padding: 1rem;
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

.modal-title {
  text-align: start;
  margin-bottom: 0;
}

.warning {
  /* border: 2px dotted blue; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-modal-btn {
  border: none;
  box-sizing: border-box;
  background-color: lightslategray;
  padding: 0.5rem 1rem;
  font-weight: 800;
  border-radius: 0.25rem;
  color: #222;
}

.delete-icon {
  color: var(--snow-white);
}

.clear-modal-btn:hover {
  cursor: pointer;
  background-color: red;
}

.cancel-btn,
.confirm-btn {
  border-radius: var(--radius);
  color: var(--snow-white);
  background-color: slategray;
  padding: 0.5rem;
  font-weight: 800;
  text-transform: capitalize;
}

.cancel-btn:hover,
.confirm-btn:hover {
  background-color: red;
  cursor: pointer;
}
</style>
