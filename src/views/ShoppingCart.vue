<template>
  <v-container fluid fill-height class="d-flex align-start">
    <v-row v-if="!isLoading" class="mt-5">
      <v-col class="text-left">
        <v-row>
          <v-col offset="2">
            <h1>Shopping Cart</h1>
          </v-col>
        </v-row>
        <CartItems />
        <v-row>
          <v-col offset="2">
            <h1>Coupons</h1>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CartItems from "@/components/CartItems";
export default {
  components: { CartItems },
  data() {
    return {
      currency: "NT$",
      isLoading: true
    };
  },
  computed: {},
  async created() {
    await this.$store.dispatch("games/getAllGames");
    await this.$store.dispatch("shoppingCart/GetCoupon");
    this.isLoading = false;
  },
  methods: {}
};
</script>

<style>

</style>
