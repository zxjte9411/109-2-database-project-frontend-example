<template>
  <v-container fluid fill-height class="d-flex align-center">
    <v-row class="d-flex justify-center">
      <v-col cols="2">
        <div class="text-h3 text-center mb-3">Charge</div>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="form"
          @submit.prevent="handleLogin"
        >
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="amount"
              type="text"
              :rules="numberRules"
              label="Amount"
              required
              outlined
              solo
              prepend-inner-icon="mdi-currency-usd "
            ></v-text-field>
            <v-btn :disabled="!valid" rounded>charge</v-btn>
          </v-form>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      amount: "",
      numberRules: [
        v => !!v || "Amount is required",
        v => /^[1-9]+[0-9]*$/.test(v) || "Value is invalid."
      ]
    };
  },
  async created() {}
};
</script>

<style>
.my-from {
  height: 800px;
}
</style>
