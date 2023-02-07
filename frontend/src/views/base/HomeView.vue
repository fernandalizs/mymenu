<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img contain height="300" src="@/assets/MyMenuLogo.png" />
      <h1 class="text-h2 font-weight-bold">My Menu</h1>
      <div class="py-6" />
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            color="#6CA858"
            :to="{ name: 'base-getstarted' }"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="flat"
            class="my-4">
            <v-icon icon="mdi-speedometer" size="large" start />
            Get Started
          </v-btn>
          <v-btn
            v-if="!loggedUser"
            color="#6CA858"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="flat"
            :to="{ name: 'accounts-login' }"
            class="my-4">
            <v-icon icon="mdi-account-arrow-right-outline" size="large" start />
            Login
          </v-btn>
          <v-btn
            v-else
            color="#6CA858"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="flat"
            :to="{ name: 'accounts-logout' }">
            <v-icon icon="mdi-account-arrow-right-outline" size="large" start />
            Logout
          </v-btn>
          <v-btn
            v-if="loggedUser"
            color="#6CA858"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="flat"
            :to="{ name: 'tasks-list' }"
            class="my-4">
            <v-icon icon="mdi-folder-star-multiple" size="large" start />
            tarefas
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import { mapState } from "pinia"
import { useAccountsStore } from "@/stores/accountsStore"

export default {
  computed: {
    ...mapState(useAccountsStore, ["loggedUser"]),
  },
}
</script>
