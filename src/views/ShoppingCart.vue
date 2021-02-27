<template>
  <v-container fluid fill-height class="d-flex justify-start">
    <v-row class="mt-10">
      <v-card class="mx-auto" outlined>
        <template v-for="i in 5">
          <v-list-item :key="i">
            <v-row class="my-1">
              <v-col cols="1" align-self="center">
                <v-btn fab small depressed color="error">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3">
                <v-img
                  src="http://localhost:5000/img/Cyberpunk%202077.jpg"
                ></v-img>
              </v-col>
              <v-col cols="6" class="text-left">
                <h4>Name</h4>
                <span>NT$350</span>
                <div class="input-group d-flex align-start">
                  <v-btn class="my-btn" depressed>
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <input
                    class="form-control text-center"
                    type="text"
                    readonly
                    min="1"
                    value="1"
                  />
                  <v-btn class="my-btn" depressed>
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="2">
                <div class="mt-3 text-right"><span>350</span></div>
              </v-col>
            </v-row>
          </v-list-item>
          <v-divider v-if="i < 5" :key="i + Date.now()"></v-divider>
        </template>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
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
</style>
