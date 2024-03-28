<script setup lang="ts">
import RecentFilmList from '@/components/movie-carousel/RecentFilmList.vue'
import SearchMovie from '@/components/search/SearchMovie.vue'
import MovieNavbar from '@/components/filters/MovieNavbar.vue'
</script>

<template>
  <header>
    <MovieNavbar />
    <SearchMovie />
  </header>
  <main>
    <RecentFilmList />
  </main>
</template>
