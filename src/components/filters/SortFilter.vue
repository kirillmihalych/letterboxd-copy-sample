<template>
  <div class="sort-filter-wrapper">
    <div class="select-custom" @click="toggleMenu">
      <h4>Sort by</h4>
      <v-icon v-if="!isMenuOpen" icon="mdi-menu-down" />
      <v-icon v-if="isMenuOpen" icon="mdi-menu-up" />
    </div>
    <div class="options-list" v-show="isMenuOpen">
      <header class="options-header">
        <div></div>
        <h4>Sort</h4>
        <button @click="closeMenu" class="close-menu-btn">
          <v-icon icon="mdi-close" />
        </button>
      </header>
      <div
        class="option"
        v-for="option in options"
        :key="option.name"
        @click="selectOptionHandler(option.value)"
      >
        <p>{{ option.name }}</p>
        <v-icon icon="mdi-radiobox-blank" v-if="store.sort !== option.value" />
        <v-icon
          icon="mdi-radiobox-marked"
          v-else="store.sort === option.value"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFilterStore } from '@/stores/filters'
import { ref } from 'vue'

const options = [
  {
    name: 'Most popular',
    value: 'popularity.desc',
  },
  {
    name: 'Newest',
    value: 'primary_release_date.desc',
  },
  {
    name: 'A to Z',
    value: 'title.asc',
  },
  {
    name: 'Rating (heighest)',
    value: 'vote_average.desc',
  },
  {
    name: 'Rating (lowest)',
    value: 'vote_average.asc',
  },
]

const store = useFilterStore()
const isMenuOpen = ref(false)
const openMenu = () => (isMenuOpen.value = true)
const closeMenu = () => (isMenuOpen.value = false)
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)

const selectOptionHandler = (selectedSortOption: string) => {
  store.sort = selectedSortOption
  closeMenu()
}
</script>

<style scoped>
.sort-filter-wrapper {
  border: 2px solid var(--light-grey);
  border-radius: 2rem;
  width: 185px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.sort-filter-wrapper:hover {
  border: 2px solid #222;
}

.select-custom {
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
  width: 360px;
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
