<script setup lang="ts">
import RecentFilmList from '@/components/movie-carousel/RecentFilmList.vue'
import SearchMovie from '@/components/search/SearchMovie.vue'
</script>

<template>
  <header>
    <SearchMovie />
  </header>
  <main>
    <RecentFilmList />
  </main>
</template>
