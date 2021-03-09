<template>
  <v-col>
    <v-row>
      <h1>Shopping Cart</h1>
    </v-row>
    <v-row>
      <v-card outlined max-width="850">
        <v-list-item v-if="cartItems.length === 0">
          <v-banner class="my-banner">
            Your Cart is empty
          </v-banner>
        </v-list-item>

        <template v-for="(game, index) in cartItems">
          <v-list-item :key="index">
            <v-row class="my-1">
              <v-col cols="1" align-self="center">
                <v-btn
                  fab
                  small
                  depressed
                  color="error"
                  @click="remoItemFromShoopingCart(game)"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3">
                <v-img
                  max-width="200px"
                  :src="getImagePath(game.imageUrl)"
                ></v-img>
              </v-col>
              <v-col cols="5" class="text-left">
                <h4>{{ game.title }}</h4>
                <span>{{ currency }} {{ game.price }}</span>
                <div class="input-group d-flex align-start">
                  <v-btn
                    class="my-btn"
                    depressed
                    :disabled="game.quantity === 1"
                    @click="decrease(game)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <input
                    class="form-control text-center"
                    type="text"
                    readonly
                    min="1"
                    :value="game.quantity"
                  />
                  <v-btn class="my-btn" depressed @click="increment(game)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="3">
                <div class="mt-3 text-right">
                  <span>{{ currency }} {{ GetItemSubTotal(game) }}</span>
                </div>
              </v-col>
            </v-row>
          </v-list-item>
          <v-divider
            v-if="index < games.length"
            :key="index + Date.now()"
          ></v-divider>
        </template>

        <v-list-item>
          <v-row>
            <v-col class="text-right">
              <strong>Total：</strong><span>NT$ {{ CartTotalPrice }}</span>
            </v-col>
          </v-row>
        </v-list-item>
      </v-card>
    </v-row>
  </v-col>
</template>

<script>
import { imgageHost } from "@/config/config";
import { mapGetters } from "vuex";
export default {
  data() {
    return { currency: "NT$" };
  },
  computed: {
    ...mapGetters({ games: "games/Items" }),
    ...mapGetters({ CartTotalPrice: "shoppingCart/CartTotalPrice" }),
    ...mapGetters({ GetItemSubTotal: "shoppingCart/GetItemSubTotal" }),
    ...mapGetters({ cartItems: "shoppingCart/CartItems" })
  },
  methods: {
    getImagePath(filename = "") {
      return `${imgageHost}/${filename.replace("./img/", "")}`;
    },
    increment(game) {
      this.$store.commit("shoppingCart/incrementItemQuantity", game);
    },
    decrease(game) {
      this.$store.commit("shoppingCart/decrementItemQuantity", game);
    },
    remoItemFromShoopingCart(game) {
      this.$store.commit("shoppingCart/remoItemFromShoopingCart", game);
    }
  }
};
</script>

<style>
.form-control {
  border: 1px solid rgba(0, 0, 0, 0.07) !important;
  height: 36px;
  min-height: 36px;
  width: 60px;
  min-width: 60px;
  box-shadow: none;
  border-radius: 0 !important;
}
.my-btn {
  font-size: 14px !important;
  border: 1px solid #e8e9ea !important;
  background-color: white !important;
  border-radius: 0 !important;
}
.my-banner {
  width: 850px;
  max-width: 850px;
}
</style>
