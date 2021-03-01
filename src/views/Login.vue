<template>
  <v-container fill-height fluid class="d-flex align-center">
    <v-row class="d-flex justify-center">
      <v-col cols="4">
        <div class="text-h3 text-left my-3">Login</div>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="form"
          @submit.prevent="handleLogin"
        >
          <v-text-field
            v-model="user.email"
            label="E-mail"
            :rules="emailRules"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            label="Password"
            :rules="passwordRules"
            type="password"
            outlined
          ></v-text-field>
          <div v-show="!valid" class="text-left">
            <span class="red--text text--lighten-1"
              >E-mail or Password error</span
            >
          </div>
          <v-btn
            class="login-btn"
            type="submit"
            :disabled="isRoading"
            color="success"
            >Submit</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      valid: true,
      isRoading: false,
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 5) || "password must be more than 5 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    async handleLogin() {
      if (this.$refs.form && this.$refs.form.validate()) {
        this.isRoading = true;
        await this.$store
          .dispatch("login/login", [this.user.email, this.user.password])
          .then(() => {
            this.$router.push("/home");
          })
          .catch(err => {
            console.log(err);
            this.isRoading = false;
            this.valid = false;
          });
      }
    }
  }
};
</script>

<style></style>
