<template>
  <section class="movie-wrapper">
    <h2 class="h3">
      {{ movie.title }}
      <span>({{ releaseYear }})</span>
    </h2>
    <div>
      <div class="directed-by-wrapper">
        <CarouselComponent :items="mainDirectors">
          <template #header>
            <h4>Directed by</h4>
          </template>
          <template #item="{ item: director }">
            <PersonCard :person="director" />
            <p>{{ director.name }}</p>
          </template>
        </CarouselComponent>
      </div>
      <div class="writted-by-wrapper">
        <CarouselComponent :items="screenwriters">
          <template #header>
            <h4>Writed by</h4>
          </template>
          <template #item="{ item: writer }">
            <PersonCard :person="writer" />
            <p>{{ writer.name }}</p>
          </template>
        </CarouselComponent>
      </div>
      <p>Runtime: {{ runtime }} minutes</p>
      <p>{{ movie.overview }}</p>
    </div>

    <p>More at <a :href="imdbLink">IMDb</a></p>
    <div class="cast-members-carousel">
      <CarouselComponent :items="props.movie.credits.cast">
        <template #header>
          <h4>Top billed cast</h4>
        </template>
        <template #item="{ item: person }">
          <PersonCard :person="person" />
        </template>
      </CarouselComponent>
    </div>
    <FilmInfoList :movieInfo="movie" />
  </section>
</template>

<script setup lang="ts">
import FilmInfoList from './movie-info/FilmInfoList.vue'
import type { ICrewMember, IMovie } from '@/interfaces/movie-types'
import CarouselComponent from '../generic-carousel/CarouselComponent.vue'
import PersonCard from '../person-card/PersonCard.vue'

interface movieProps {
  movie: IMovie
}

const props = defineProps<movieProps>()
const movie = props.movie
const crew = movie.credits?.crew

const mainDirectors: ICrewMember[] = crew.filter(
  (crewMember: ICrewMember) => crewMember.job === 'Director'
)
const screenwriters: ICrewMember[] = crew.filter(
  (crewMember: ICrewMember) =>
    crewMember.job === 'Screenplay' || crewMember.job === 'Writer'
)
const imdbLink = `https://www.imdb.com/title/${movie.imdb_id}`
const runtime = movie.runtime

const releaseYear = movie.release_date?.slice(0, 4)
</script>

<style scoped>
.movie-wrapper {
  max-width: 800px;
}

.cast-members-carousel {
  margin-bottom: 2rem;
}
</style>
