<template>
  <div class="navbar-container">
    <nav class="navbar">
      <div class="left-part-navbar-container">
        <NavbarMenu />
      </div>
      <SearchModule>
        <template
          v-slot="{
            media_array,
            isLoading,
            persons,
            error,
            isMediaFound,
            isPersonsFound,
            isQueryEntered,
          }"
        >
          <DropdownList
            v-show="isQueryEntered"
            :persons="persons"
            :media="media_array"
            :isLoading="isLoading"
            :error="error"
          >
            <template #content>
              <section v-if="isMediaFound">
                <h1>Movies and TV</h1>
                <div>
                  <MediaLinkCard
                    v-for="media in media_array"
                    :key="media.id"
                    :media="media"
                  />
                </div>
              </section>
              <section v-if="isPersonsFound">
                <h1>Persons</h1>
                <div>
                  <PersonLinkCard
                    v-for="person in persons"
                    :key="person.id"
                    :person="person"
                  />
                </div>
              </section>
            </template>
          </DropdownList>
        </template>
      </SearchModule>
      <NavbarUsersProfile />
    </nav>
  </div>
</template>

<script setup lang="ts">
import SearchModule from './search/SearchModule.vue'
import NavbarMenu from './NavbarMenu.vue'
import NavbarUsersProfile from './NavbarUsersProfile.vue'
import DropdownList from './search/DropdownList.vue'
import MediaLinkCard from './search/MediaLinkCard.vue'
import PersonLinkCard from './search/PersonLinkCard.vue'
</script>

<style scoped>
.navbar-container {
  margin: 0 auto;
  width: 950px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 1s ease-in-out;
  margin-bottom: 1rem;
}

.navbar {
  background: green;
  width: 950px;
  height: 60px;
  padding: 0.25rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #222;
}

.left-part-navbar-container {
  width: 200px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
}
</style>
