<template>
  <v-main class="mb-10">
    <v-app-bar app flat dark>
      <v-spacer></v-spacer>
      <a v-if="isLogin" class="text-h6 moneyInfo">【{{ moneyInfo }}】</a>
      <router-link
        v-if="isLogin"
        class="my-router-link mr-3"
        to="/shoppingcart"
      >
        <v-badge
          v-if="true"
          :content="CartItemLength"
          :value="CartItemLength"
          overlap
        >
          <v-btn block>
            <v-icon>mdi-cart-arrow-down</v-icon>
            Shopping Cart
          </v-btn>
        </v-badge>
      </router-link>
      <div class="pa-2 d-flex flex-row">
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
    </v-navigation-drawer>

    <router-view />
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import { GetwalletOrProfit } from "@/api/walletOrProfit";

export default {
  data() {
    return {
      moneyInfo: ""
    };
  },
  computed: {
    ...mapGetters({ isLogin: "login/IsLogin" }),
    ...mapGetters({ CartItemLength: "shoppingCart/CartItemLength" })
  },
  async created() {
    this.moneyInfo = await GetwalletOrProfit();
  },
  methods: {
    logout() {
      this.$store.dispatch("login/logout");
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

.moneyInfo {
  text-decoration: none !important;
  color: white !important;
}
</style>
