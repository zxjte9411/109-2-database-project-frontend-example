<template>
  <v-container fluid fill-height class="d-flex align-start">
    <v-col>
      <v-row justify="center" class="mt-5">
        <h1>Add New Product</h1>
      </v-row>
      <v-row justify="center">
        <v-col cols="6">
          <v-card outlined class="pa-10">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="productName"
                :rules="productNameRules"
                label="Product Name"
                required
                prepend-inner-icon="mdi-alpha-a"
              ></v-text-field>

              <v-text-field
                v-model="price"
                :rules="priceRules"
                label="Price"
                required
                prepend-inner-icon="mdi-currency-usd "
              ></v-text-field>

              <v-select
                v-model="select"
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                label="Item"
                required
              ></v-select>

              <v-text-field
                v-model="description"
                :rules="priceRules"
                label="Description"
                required
                prepend-inner-icon="mdi-information-variant "
              ></v-text-field>

              <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              ></v-checkbox>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                Validate
              </v-btn>

              <v-btn color="error" class="mr-4" @click="reset">
                Reset Form
              </v-btn>

              <v-btn color="warning" @click="resetValidation">
                Reset Validation
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    productName: "",
    productNameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    price: "",
    priceRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    description: ""
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style></style>
