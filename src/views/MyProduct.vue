<template>
  <v-container fluid fill-height class="d-flex align-center">
    <v-col class="mb-10">
      <v-row class="my-3" justify="center">
        <h1>My Product</h1>
      </v-row>
      <v-row justify="center">
        <v-card outlined max-width="900">
          <template v-for="(product, index) in products">
            <v-list-item :key="index">
              <v-row class="my-1">
                <v-col cols="3" align-self="center">
                  <v-img :src="getImagePath(product)"></v-img>
                </v-col>
                <v-col cols="3" class="text-left">
                  <h4>{{ product.Name }}</h4>
                  <span>Price：{{ currency }} {{ product.Price }}</span>
                  <br />
                  <span>Sales volume：{{ product.Sales_volume }}</span>
                </v-col>
                <v-col cols="3" class="text-left">
                  <span> {{ product.Description }}</span>
                </v-col>
                <v-col
                  class="d-flex align-center \
                  justify-space-around"
                >
                  <v-btn
                    :disabled="IsAvailable(product)"
                    color="success"
                    @click="handleLaunchProduct(product)"
                  >
                    Open
                  </v-btn>
                  <v-btn
                    :disabled="!IsAvailable(product)"
                    color="pink"
                    class="white--text"
                    @click="handleOffProduct(product)"
                  >
                    Close
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item>
            <v-divider
              v-if="index < product.length"
              :key="index + Date.now()"
            ></v-divider>
          </template>
        </v-card>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import { imgageHost } from "@/config/config";
import { Getmyproduct, OffGame, LaunchGame } from "@/api/myproduct";

export default {
  data() {
    return {
      products: [],
      currency: "NT$"
    };
  },
  async created() {
    this.products = (await Getmyproduct()).data;
    console.log(this.products);
  },
  methods: {
    getImagePath(product) {
      if (!product) return "https://www.pixiv.net/artworks/86483702";
      return `${imgageHost}/${product.ImageURL.replace("./img/", "")}`;
    },
    IsAvailable(product) {
      return product.Available === "1";
    },
    async handleOffProduct(product) {
      if (product !== undefined && product !== null)
        await OffGame(product.Game_No);
      this.products = (await Getmyproduct()).data;
    },
    async handleLaunchProduct(product) {
      if (product !== undefined && product !== null)
        await LaunchGame(product.Game_No);
      this.products = (await Getmyproduct()).data;
    }
  }
};
</script>

<style></style>
