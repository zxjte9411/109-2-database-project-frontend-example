<template>
  <v-container fluid fill-height class="d-flex justify-start">
    <v-row v-for="i in rowSize" :key="i" class="d-flex justify-start">
      <v-col
        v-for="n in getColoumNumber(i)"
        :key="n"
        class="d-flex justify-start"
      >
        <v-card class="mx-12 my-12" max-width="380" max-height="500">
          <a
            ><v-img
              height="250"
              :src="getImagePath(games[(i - 1) * 3 + n - 1].ImageURL)"
              @click="test(games[(i - 1) * 3 + n - 1])"
          /></a>
          <v-card-title>{{ games[(i - 1) * 3 + n - 1].Name }}</v-card-title>
          <v-card-subtitle class="text-start">
            NT$ {{ games[(i - 1) * 3 + n - 1].Price }}
          </v-card-subtitle>
          <v-card-text>
            <div class="text-left">
              {{ games[(i - 1) * 3 + n - 1].Description }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="test(games[(i - 1) * 3 + n - 1])"
            >
              Add to Cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { imgageHost } from "@/config/config";

export default {
  name: "Home",
  data() {
    return {
      rowSize: 0,
      category: this.$route.query.category
    };
  },
  computed: {
    games: {
      get() {
        return this.$store.state.games.items;
      },
      set() {}
    }
  },
  watch: {
    $route: async function() {
      this.category = this.$route.query.category;
      await this.loadData();
    }
  },
  async created() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      await this.$store.dispatch("games/getAllGames", this.category);
      this.rowSize = this.games.length < 3 ? 1 : this.games.length / 3;
    },
    getImagePath(filename = "") {
      return `${imgageHost}/${filename.replace("./img/", "")}`;
    },
    getColoumNumber(index) {
      const length = this.games.length;
      if ((length - index * 3) % 3 == 0) return 3;
      else if (length - index * 3 < 0) return length;
      else return length - index * 3;
    },
    test(game) {
      // console.log(game);
      this.$store.dispatch("shoppingCart/addProductToCart", game);
    }
  }
};
</script>
