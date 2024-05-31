<template>
  <v-icon icon="mdi-loading" class="loading" />
</template>

<style scoped>
.loading {
  animation: spin 0.75s linear infinite;
  color: orange;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
