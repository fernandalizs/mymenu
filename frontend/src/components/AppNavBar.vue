<template>
  <v-app-bar
    style="position: fixed"
    :color="theme === 'light' ? 'white' : 'black'"
  >
    <v-app-bar-title class="pl-4">
      <v-img height="55" width="55" src="@/assets/my_menu_logo.png"/>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn color="#507444" icon="mdi-home" :to="{ name: 'tasks-list' }"></v-btn>
    <v-btn color="#507444" icon="mdi-star" :to="{ name: 'favorites-recipes' }"></v-btn>
    <v-btn
      color="#507444"
      :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      @click.stop="themeClick"></v-btn>
    <v-btn color="#507444" icon="mdi-dots-vertical">
      <v-icon icon="mdi-dots-vertical" />
      <v-menu activator="parent">
        <v-list>
          <v-list-item :to="{ name: 'accounts-logout' }">
            <v-icon color="#507444">mdi-logout</v-icon> Sair </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: "My Menu",
    },
    theme: {
      type: String,
      required: true,
      default: "dark",
    },
    user: {
      type: Object,
      default: null,
    },
  },
  emits: ["themeClick"],
  data: () => {
    return {}
  },
  methods: {
    themeClick() {
      this.$emit("themeClick")
    },
  },
}
</script>

<style scoped>
  .v-list-item {
    color: #507444;
  }
</style>
