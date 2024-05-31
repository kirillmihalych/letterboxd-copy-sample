<template>
  <div class="media-card-container">
    <RouterLink :to="movieLink || personLink">
      <div class="content-container">
        <ImagePlaceholder
          :src="moviePoster || personImage"
          :img-params="{ width: 32 + 'px', height: 48 + 'px' }"
          :title="movieTitle || personName"
        />
        <div class="media-info">
          <h4>
            {{ movieTitle || personName }}
          </h4>
          <div class="additional-info">
            {{ movieRelease?.slice(0, 4) || null }}
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import ImagePlaceholder from '@/components/ImagePlaceholder.vue'
import addMovie from '@/api/lists/addMovie'
import type { IMovie, IPerson, ITVShow } from '@/interfaces/movie-types'
import { RouterLink } from 'vue-router'

interface ILinkCard {
  item: IMovie | ITVShow | IPerson
}
// const tvShowName = (props.item as ITVShow).name
// const tvShowPoster = `https://image.tmdb.org/t/p/w92/${
//   (props.item as ITVShow).poster_path
// }`

const props = defineProps<ILinkCard>()
const movieTitle = (props.item as IMovie).title
const movieRelease = (props.item as IMovie).release_date?.slice(0, 4)
const moviePoster = `https://image.tmdb.org/t/p/w92/${
  (props.item as IMovie).poster_path
}`
const movieLink = `/movies/movie_page/${props.item.id}`
const personLink = `/persons/${props.item.id}`

const personName = (props.item as IPerson).name
const personImage = `https://image.tmdb.org/t/p/w92/${
  (props.item as IPerson).profile_path
}`
</script>

<style scoped>
.content-container {
  display: flex;
}
/* .media-card-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  font-size: 0.1rem;
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
} */
</style>
