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
                label="Name"
                required
                prepend-inner-icon="mdi-alpha-a"
              ></v-text-field>

              <v-text-field
                v-model="price"
                :rules="priceRules"
                label="Price"
                required
                prepend-inner-icon="mdi-currency-usd"
              ></v-text-field>

              <v-select
                v-model="select"
                :items="items"
                :rules="[v => !!v || 'Category is required']"
                label="Category"
                required
                prepend-inner-icon="mdi-shape-outline "
              ></v-select>

              <v-text-field
                v-model="description"
                :rules="[v => !!v || 'Description is required']"
                label="Description"
                required
                prepend-inner-icon="mdi-information-variant "
              ></v-text-field>

              <v-file-input
                v-model="fileObject"
                :rules="fileInputRules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an image"
                prepend-icon="mdi-file-image-outline"
              ></v-file-input>
              <v-row justify="center" class="mt-5">
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
                >
                  Validate
                </v-btn>
                <v-btn color="pink" class="mr-4" @click="reset">
                  Reset Form
                </v-btn>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import { UploadFile } from "@/api/myproduct";

export default {
  data: () => ({
    fileObject: null,
    valid: true,
    productName: "",
    productNameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    price: "",
    priceRules: [
      v => !!v || "Price is required",
      v => /^[1-9]+[0-9]*$/.test(v) || "Price must be valid"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    description: "",
    fileInputRules: [
      v => !!v || "image is required",
      value =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!"
    ]
  }),
  watch: {
    fileObject: function() {
      console.log(this.fileObject);
    }
  },
  methods: {
    async validate() {
      this.$refs.form.validate();
      if (this.valid) {
        await UploadFile(this.fileObject);
      }
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
