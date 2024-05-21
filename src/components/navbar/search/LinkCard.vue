<template>
  <div class="media-card-container">
    <div class="content-container">
      <img
        :src="moviePoster || tvShowPoster || personImage"
        alt="poster"
        class="poster"
      />
      <div class="media-info">
        <h1>
          {{ movieTitle || tvShowName || personName }}
        </h1>
        <div class="additional-info"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import addMovie from '@/api/lists/addMovie'
import type { IList } from '@/interfaces/lists-types'
import type { IMovie, IPerson, ITVShow } from '@/interfaces/movie-types'
import { RouterLink } from 'vue-router'

interface ILinkCard {
  item: IMovie | ITVShow | IPerson
}

const props = defineProps<ILinkCard>()
const tvShowName = (props.item as ITVShow).name
const movieTitle = (props.item as IMovie).title
const personName = (props.item as IPerson).name
const moviePoster = `https://image.tmdb.org/t/p/original/${
  (props.item as IMovie).poster_path
}`
const tvShowPoster = `https://image.tmdb.org/t/p/original/${
  (props.item as ITVShow).poster_path
}`
const personImage = `https://image.tmdb.org/t/p/original/${
  (props.item as IPerson).profile_path
}`

const addMedia = async (movie_id: number, list_id: number) => {
  await addMovie(movie_id, list_id)
}
</script>

<style scoped>
.media-card-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  margin: 1rem 0rem;
}

.poster {
  object-fit: contain;
  width: 50px;
  height: 75px;
}

.content-container {
  width: 400px;
  text-decoration: none;
  color: #222;
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  padding: 5px;
}

.content-container:hover {
  background: #ac94f4;
  cursor: pointer;
}

.additional-info {
  display: flex;
  gap: 0.5rem;
}
</style>
