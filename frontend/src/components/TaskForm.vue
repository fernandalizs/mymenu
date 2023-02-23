<template>
  <div>
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="title"
          :label="formLabel"
          required
          outlined
          clearable
          prepend-inner-icon="mdi-silverware-variant"
          @keyup.enter="addNewTask" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    formLabel: {
      type: String,
      default: "",
    },
  },
  emits: ["newTask"],
  data: () => {
    return {
      title: "",
    }
  },
  methods: {
    addNewTask() {
      this.$emit("newTask", {
        title: this.title,
      })
      this.title = ""
    },
  },
}
</script>

<style scoped></style>
