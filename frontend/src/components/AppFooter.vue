<template>
  <v-footer :absolute="!fixed" app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" align-self="center" class="pa-0 text-center">
          <span> &copy; {{ new Date().getFullYear() }} - <a href="https://github.com/fernandalizs" target="_blank">Fernanda Liz</a></span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
  }),
}
</script>

<style scoped>
  span, a {
    color: #507444;
  }
</style>
