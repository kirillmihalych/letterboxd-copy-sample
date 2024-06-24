<template>
  <div class="filter-wrapper" @mouseleave="closeMenu">
    <div class="menu-opener-wrapper" @click="toggleMenu">
      <h4>
        <slot name="filter-heading"></slot>
      </h4>
      <v-icon v-if="!isMenuOpen" icon="mdi-menu-down" />
      <v-icon v-if="isMenuOpen" icon="mdi-menu-up" />
    </div>
    <div class="options-list" v-show="isMenuOpen">
      <header class="options-header">
        <div></div>
        <h4>
          <slot name="filter-name"></slot>
        </h4>
        <button @click="closeMenu" class="close-menu-btn">
          <v-icon icon="mdi-close" />
        </button>
      </header>
      <slot name="filter-options"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

interface IFilterWrapper {
  isClosed: boolean
}

const props = defineProps<IFilterWrapper>()

const isMenuOpen = ref(false)
const openMenu = () => (isMenuOpen.value = true)
const closeMenu = () => (isMenuOpen.value = false)
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)

watchEffect(() => {
  if (props.isClosed || !props.isClosed) {
    closeMenu()
  }
})
</script>

<style scoped>
.filter-wrapper {
  border: 2px solid var(--light-grey);
  border-radius: 2rem;
  width: 185px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.filter-wrapper:hover {
  border: 2px solid #222;
}

.menu-opener-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
}

.options-list {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: absolute;
  top: 28px;
  left: 0;
  z-index: 1;
  background-color: var(--snow-white);
  display: flex;
  flex-direction: column;
  /* width: 275px; */
  max-height: 275px;
  overflow-y: scroll;
  padding: 1rem;
  border-radius: var(--radius);
}

.options-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 1.15rem;
}

.close-menu-btn {
  color: var(--light-grey);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-menu-btn:hover {
  color: #222;
}

.option:hover {
  color: var(--light-grey);
}
</style>
