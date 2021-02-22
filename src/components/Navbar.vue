<template>
  <div>
    <v-app-bar app flat dark>
      <v-spacer></v-spacer>
      <div class="pa-2">
        <router-link v-if="!isLogin" class="my-router-link" to="/login">
          <v-btn block>
            login
          </v-btn>
        </router-link>
        <v-btn v-if="isLogin" block @click="logout">
          Logout
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer permanent floating app dark>
      <a href="/home">
        <img id="logo" src="@/img/logo.png" alt="logo" />
      </a>
      <v-list>
        <router-link class="my-router-link" to="/home?category=all">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>All</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link class="my-router-link" to="/home?category=single">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>single-player</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link class="my-router-link" to="/home?category=multi">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>Multiplayer</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link class="my-router-link" to="/home?category=battle">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>Battle Game</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>

      <template v-slot:append> </template>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Account", icon: "mdi-account-box" },
        { title: "Admin", icon: "mdi-gavel" }
      ]
    };
  },
  computed: {
    ...mapGetters({ isLogin: "IsLogin" })
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/home").catch(err => {
        err;
      });
    }
  }
};
</script>

<style>
#logo {
  width: 250px;
}

.my-router-link {
  text-decoration: none !important;
}
</style>
