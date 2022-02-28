<template>
  <v-app class="background">
    <v-row align="center">
      <v-container>
        <v-card>
          <v-row align="center" justify="center">
            <v-col cols="5" sm="5" md="5" lg="5">
              <v-img
                class="white--text align-end"
                src="../../assets/signinImage.svg"
              />
            </v-col>
            <v-col cols="5" sm="5" md="5" lg="5">
              <v-form align="center" ref="form" v-model="valid" lazy-validation>
                <h3>Welcome</h3>
                <v-text-field
                  v-model="user.Email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="user.Password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
                <v-btn
                  block
                  text-color="white"
                  :disabled="!valid"
                  color="#0A363F"
                  class="ma-6 white--text"
                  max-width="400"
                  @click="Login"
                >
                  Login
                </v-btn>
                <v-btn
                  block
                  text
                  class="ma-1"
                  plain
                  to="/Registration"
                  max-width="400"
                >
                  Don't have an account yet? <br />
                  Register from here!
                </v-btn>
                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                  >
                    Close
                  </v-btn>
                </template>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      timeout="1500"
      color="white"
      transition="scroll-y-transition"
      top
    >
      <v-icon left class="mr-6" :color="color">{{ icon }}</v-icon>
      <span style="color: black">{{ snackbarText }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<script>
export default {
  name: "SignIn",
  data: () => ({
    phone: null,
    color: "success",
    snackbar: false,
    icon: "",
    snackbarText: "",
    show1: true,
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    rules: {
      required: (value) => !!value || "Required.",
      //  min: (v) => v.length >= 5 || "Min 5 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    snackbar: false,
    text_snackbar: "Email or password incorrect",
    user: {
      Email: "",
      Password: "",
    },
  }),

  methods: {
    Login() {
      this.$store
        .dispatch("loginAction", this.user)
        .then((response) => {
          this.$store.dispatch("getCurrentUserConnect");
          this.$router.push({ name: "Welcome" });
          if (response) {
            this.$router.push({ name: "Welcome" });
          }
        })
        .catch((error) => {
          
          if (error) {
            this.error = "Error";
            this.icon = "mdi-alert";
            this.snackbarText = "Email or password incorrect!";
            this.color = "red";
            this.snackbar = true;
          }
        });
    },
  },
};
</script>
<style scoped>
.background {
  height: 100vh;
  background: linear-gradient(
    to right,
    #119d90 0%,
    #119d90 50%,
    white 0%,
    white 50%
  );
}
</style>
