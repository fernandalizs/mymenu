<template>
  <v-dialog v-model="showValue" persistent max-width="960px">
    <v-card class="pa-5">
      <v-card-title class="text-h5"> Ops! Algo deu errado </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="#6CA858" text @click="close"> Fechar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: null,
    },
  },
  emits: ["close"],
  computed: {
    showValue: {
      get() {
        return this.show
      },
    },
  },
  methods: {
    close() {
      this.$emit("close")
    },
  },
}
</script>

<style scoped>
  .v-btn {
    color: white;
  }
</style>
