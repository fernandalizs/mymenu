<template>
  <v-container>
    <v-row align="center" class="mt-10" no-gutters>
      <v-col cols="12" sm="6" offset-sm="3">
        <h1 class="pa-2">Register</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            color="#6CA858"
            label="Name"
            :rules="nameRules"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            required
            @keyup.enter="login"></v-text-field>

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

          <v-text-field
            v-model="confirmPassword"
            type="password"
            color="#6CA858"
            label="Confirm Password"
            :rules="[required, min8, matchingPasswords]"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            required
            @keyup.enter="login"></v-text-field>

          <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="Do you agree with the terms of use?"
            required
          ></v-checkbox>

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
      name: "",
      nameRules: [(v) => !!v || "Name is required"],
      email: "",
      emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "Invalid e-mail",
    ],
      password: null,
      passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length >= 8) || "The password must contain at least 8 characters",
    ],
      confirmPassword: "",
      checkbox: false,
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
    matchingPasswords() {
      if (this.password === this.confirmPassword) {
        return true;
      } else {
        return "Passwords do not match";
      }
    },
    required() {
      if (this.confirmPassword) {
        return true;
      } else {
        return "Password confirmation is required";
      }
    },
    min8() {
      if (this.confirmPassword.length >= 8) {
        return true;
      } else {
        return "The password must contain at least 8 characters";
      }
    },
  },
}
</script>

<style scoped>
  .v-btn-white {
    color: white;
  }
</style>
