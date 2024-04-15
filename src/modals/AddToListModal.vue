<template>
  <button @click="openTheModal" class="add-modal-btn">lists</button>
  <Teleport to="#modal">
    <Transition name="modal">
      <div class="modal-bg" v-if="isModalOpen">
        <div class="modal">
          <div class="modal-title-container">
            <h2>Select a list</h2>
            <button @click="closeTheModal">close</button>
          </div>
          <div>
            <div>
              <ListOfLists @select-list="setSelectedList" />
            </div>
            <button @click="addMovieToList(args)">add</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import ListOfLists from '@/components/movie-cards/ListOfLists.vue'
import { getSessionFromLocalStorage } from '@/local-storage/getSession'
import type { IAddMovieToListArgs } from '@/interfaces/lists-types'
import { postMovieToList } from '@/api/lists'

interface IAddToListModalProps {
  movie_id: number
}

const props = defineProps<IAddToListModalProps>()
const movie_id = props.movie_id

const isModalOpen = ref(false)
const openTheModal = () => (isModalOpen.value = true)
const closeTheModal = () => (isModalOpen.value = false)

const session_id = getSessionFromLocalStorage()

const list_id = ref<number | null>(null)
const setSelectedList = (payload: number) => (args.list_id = payload)

const args = reactive<IAddMovieToListArgs>({
  list_id: list_id.value as number,
  session_id,
  movie_id,
})

const addMovieToList = async (obj: IAddMovieToListArgs) => {
  try {
    await postMovieToList(obj)
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
  width: 400px;
  height: 350px;
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
