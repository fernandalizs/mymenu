<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <h1>Meals</h1>
      </v-col>

      <v-col cols="12">
        <task-form :form-label="'New Meal'" @new-task="addNewTask" />
      </v-col>

      <v-col v-for="item in items" :key="item.id" cols="12">
        <task :task="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAppStore } from "@/stores/appStore"
import TasksApi from "@/api/tasks.api.js"
import Task from "@/components/Task.vue"
import TaskForm from "@/components/TaskForm.vue"

export default {
  name: "TasksList",
  components: { Task, TaskForm },
  setup() {
    const appStore = useAppStore()
    return { appStore }
  },
  data() {
    return {
      loading: false,
      items: [],
    }
  },
  mounted() {
    this.getTasks()
  },
  methods: {
    getTasks() {
      this.loading = true
      TasksApi.getTasks().then((data) => {
        this.items = data.todos
        this.loading = false
      })
    },
    addNewTask(task) {
      this.loading = true
      TasksApi.addNewTask(task.title).then((task) => {
        this.appStore.showSnackbar(`Nova tarefa adicionada #${task.id}`)
        this.getTasks()
        this.loading = false
      })
    },
  },
}
</script>

<style scoped>
  h1 {
    color: #507444;
  }
</style>
