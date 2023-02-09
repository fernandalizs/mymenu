<template>
  <v-container>
    <h2 class="text-center">Finalizar sessão?</h2>
    <p class="ma-4">
      <v-btn :loading="loading" color="#6CA858" class="white-text mr-4" x-large block @click="logout">
        Sim
      </v-btn>
      <v-btn
        class="my-2"
        block
        color="#6CA858"
        variant="outlined"
        :to="{ name: 'base-home' }">
        Home
      </v-btn>
    </p>
  </v-container>
</template>

<script>
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
    }
  },
  methods: {
    logout() {
      this.loading = true
      AccountsApi.logout()
        .then(() => {
          this.accountsStore.clearLoggedUser()
          this.appStore.showSnackbar("Sessão encerrada!", "warning")
          this.$router.push({ name: "base-home" })
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style scoped>
  .white-text {
    color: white;
  }
</style>
