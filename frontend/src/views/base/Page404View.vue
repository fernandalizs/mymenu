<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height justify-center">
      <h1 class="font-weight-thin">404</h1>
      <h2>Page not found</h2>
      <h4 class="pa-3 font-weight-medium">Ops! The page you are looking for does not exist</h4>
      <v-container class="size">
        <v-btn block color="#6CA858" :to="{ name: 'base-home' }" class="ma-3"> Home </v-btn>
      </v-container>
    </v-responsive>
  </v-container>
</template>
<style scoped>
  h1 {
    font-size: 20rem;
    color: #507444;
  }
  h4 {
    letter-spacing: 0.2em;
  }
  .v-btn {
    color: white;
  }
  .size {
    max-width: 30vw;
  }
</style>
