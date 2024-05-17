<template>
  <div class="media-card-container">
    <div
      class="content-container"
      @click="addMedia(props.media.id, props.list?.id as number)"
    >
      <img :src="poster" alt="poster" class="poster" />
      <div class="media-info">
        <h1>
          {{ (props.media as IMovie).title || (props.media as ITVShow).name }}
        </h1>
        <div class="additional-info">
          <p>{{ props.media.vote_average.toFixed(2) }}</p>
          <p>
            {{
              (props.media as IMovie).original_title ||
              (props.media as ITVShow).original_name
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import addMovie from '@/api/lists/addMovie'
import type { IList } from '@/interfaces/lists-types'
import type { IMovie, ITVShow } from '@/interfaces/movie-types'
import { RouterLink } from 'vue-router'

interface IMediaCard {
  media: IMovie | ITVShow
  list: IList | null
}

const props = defineProps<IMediaCard>()
const poster = `https://image.tmdb.org/t/p/original/${props.media.poster_path}`

const addMedia = async (media_id: number, list_id: number) => {
  await addMovie(media_id, list_id)
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
