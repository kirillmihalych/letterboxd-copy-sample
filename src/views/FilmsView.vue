<script setup lang="ts">
import InTrendTodayMovieList from '@/components/movie-carousel/InTrendTodayMovieList.vue'
import SearchMovie from '@/components/search/SearchMovie.vue'
import MovieNavbar from '@/components/filters/MovieNavbar.vue'
import MovieTrailersCarousel from '@/components/movie-carousel/MovieTrailersCarousel.vue'
</script>

<template>
  <header>
    <MovieNavbar />
    <SearchMovie />
  </header>
  <main>
    <InTrendTodayMovieList />
    <MovieTrailersCarousel />
  </main>
</template>
