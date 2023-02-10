<template>
  <v-container>
    <v-row align="center" class="mt-10" no-gutters>
      <v-col cols="12" sm="6" offset-sm="3">
        <h1 class="pa-2">Login</h1>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="email"
            color="#6CA858"
            label="E-Mail"
            :rules="emailRules"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            required
            @keyup.enter="login"></v-text-field>

          <v-text-field
            v-model="password"
            color="#6CA858"
            type="password"
            label="Password"
            :rules="passwordRules"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            required
            @keyup.enter="login"></v-text-field>

          <v-btn
            class="v-btn-white"
            block
            :loading="loading"
            :disabled="!valid"
            size="large"
            rounded="pill"
            color="#6CA858"
            append-icon="mdi-chevron-right"
            @click="login">
            Login
          </v-btn>
          <v-btn
            class="my-2 v-btn-white"
            block
            size="large"
            rounded="pill"
            color="#6CA858"
            append-icon="mdi-chevron-right"
            :to="{name: 'accounts-register'}">
            Register
          </v-btn>
          <v-btn
            class="my-2"
            block
            size="large"
            rounded="pill"
            color="#6CA858"
            variant="outlined"
            :to="{ name: 'base-home' }">
            Home
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "pinia"
import AccountsApi from "@/api/accounts.api.js"
import { useAppStore } from "@/stores/appStore"
import { useAccountsStore } from "@/stores/accountsStore"

export default {
  setup() {
    const appStore = useAppStore()
    const accountsStore = useAccountsStore()
    return { appStore, accountsStore }
  },
  data: () => {
    return {
      loading: false,
      valid: true,
      email: "",
      emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "Invalid e-mail",
    ],
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      error: false,
      visible: false,
    }
  },
  computed: {
    ...mapState(useAccountsStore, ["loggedUser"]),
  },
  mounted() {
    console.log(this.loggedUser)
    AccountsApi.whoami().then((response) => {
      if (response.authenticated) {
        this.saveLoggedUser(response.user)
        this.appStore.showSnackbar("User already logged in", "warning")
        this.showTasks()
      }
    })
  },
  methods: {
    login() {
      this.loading = true
      AccountsApi.login(this.email, this.password)
        .then((response) => {
          if (!response) {
            this.appStore.showSnackbar("Invalid email or password", "danger")
            return
          }
          this.saveLoggedUser(response.user)
          this.showTasks()
        })
        .finally(() => {
          this.loading = false
        })
    },
    saveLoggedUser(user) {
      this.error = !user
      if (user) {
        this.accountsStore.setLoggedUser(user)
        this.visible = false
        console.log("logged")
      }
    },
    showTasks() {
      this.$router.push({ name: "tasks-list" })
      console.log("--> tasks")
    },
  },
}
</script>

<style scoped>
  .v-btn-white {
    color: white;
  }
</style>
