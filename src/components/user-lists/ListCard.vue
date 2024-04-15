<template>
  <RouterLink :to="listPageLocation">
    <div class="list-card">
      <h2>{{ props.list.name }}</h2>
      <p>
        {{
          props.list.item_count > 1
            ? `${props.list.item_count} items`
            : `${props.list.item_count} item`
        }}
      </p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { ICreatedList } from '@/interfaces/lists-types'
import { RouterLink } from 'vue-router'

interface IListCardProps {
  list: ICreatedList
}

const props = defineProps<IListCardProps>()
const listPageLocation = `/lists/${props.list.id}`
</script>

<style scoped>
.list-card {
  width: 425px;
  height: 425px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: lightgray;
  margin: 1rem;
  border-radius: 0.25rem;
  padding: 0.5rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.list-card:hover {
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: all 0.1s;
}

.list-card h2 {
  width: 100px;
  text-align: center;
}

a {
  text-decoration: none;
  color: #222;
}
</style>
