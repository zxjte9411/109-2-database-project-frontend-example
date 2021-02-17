<template>
  <div>
    <v-app-bar app flat dark>
      <v-spacer></v-spacer>
      <div class="pa-2">
        <v-btn block>
          Logout
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer permanent floating app dark>
      <router-link to="/">
        <img id="logo" src="@/img/logo.png" alt="logo" />
      </router-link>
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>All</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>single-player</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Multiplayer</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Battle Game</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append> </template>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Account", icon: "mdi-account-box" },
        { title: "Admin", icon: "mdi-gavel" }
      ]
    };
  }
};
</script>

<style>
#logo {
  width: 250px;
}
</style>
