<template>
  <v-snackbar
    v-model="showSnackbar"
    :color="snackbarCollors"
    timeout="1500"
    multi-line
    rounded
    elevation="12"
    content-class="snackbar-ft-size">
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<script>
import { mapState } from "pinia"
import { useAppStore } from "@/stores/appStore"

export default {
  setup() {
    const appStore = useAppStore()
    return { appStore }
  },
  computed: {
    ...mapState(useAppStore, ["snackbarMessage", "type", "showSnackbarMessage"]),
    showSnackbar: {
      get() {
        return this.showSnackbarMessage
      },
      set(value) {
        this.appStore.showSnackbar(value)
      },
    },
    snackbarCollors() {
      const typeCollor = {
        success: "#6CA858",
        danger: "red",
        warning: "orange",
      }
      return `${typeCollor[this.type || "success"]} accent-4`
    },
  },
}
</script>

<style>
  .v-snackbar .snackbar-ft-size .v-snackbar__wrapper .v-snackbar__content {
    font-size: 1.1rem;
    color: white;
  }
  </style>
