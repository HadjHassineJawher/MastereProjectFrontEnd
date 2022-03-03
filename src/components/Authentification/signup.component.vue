<template>
  <v-app class="background">
    <v-row align="center">
      <v-container>
        <v-card>
          <v-row align="center" justify="center">
            <v-col class="text-center" v-if="PageLoading" cols="12">
              <div>
                <v-progress-linear
                  :size="50"
                  :width="5"
                  :active="PageLoading"
                  color="amber"
                  :indeterminate="PageLoading"
                ></v-progress-linear>
              </div>
            </v-col>
            <v-col cols="5" sm="5" md="5" lg="5">
              <v-img
                class="white--text align-end"
                src="../../assets/signupImage.svg"
              />
            </v-col>
            <v-col cols="5" sm="5" md="5" lg="5">
              <v-form align="center" ref="form" v-model="valid" lazy-validation>
                <h3 color="#CF6400">Join Us</h3>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="firstName"
                      label="First Name"
                      :rules="inputRules"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="lastName"
                      label="Last Name"
                      :rules="inputRules"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-col cols="12" sm="12">
                  <vue-tel-input-vuetify
                    v-model="phoneNumber"
                    label="Phone Number"
                    :rules="PhoneRules"
                    v-on:country-changed="countryChanged"
                  ></vue-tel-input-vuetify>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="address"
                    label="Home address"
                    type="text"
                    :rules="inputRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show1 ? 'text' : 'password'"
                    name="password"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="confirmPassword"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="confirmPasswordRules"
                    :type="show2 ? 'text' : 'password'"
                    name="confirmPassword"
                    label="Confirm Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show2 = !show2"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="12">
                  <v-btn
                    block
                    text-color="white"
                    :disabled="!valid"
                    color="#CF6400"
                    class="ma-6 white--text"
                    max-width="400"
                    @click="Register"
                  >
                    Register
                  </v-btn>
                </v-col>
                <v-btn block text class="ma-1" plain to="/">
                  Already have an account ? <br />
                  Login from here!
                </v-btn>
              </v-form>
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
                  <v-btn
                    color="black"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                  >
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-row>
  </v-app>
</template>

<script>
import { Register } from "../APIS/AuthApi";
export default {
  name: "SignUp",
  data: () => ({
    PageLoading: false,
    color: "success",
    snackbar: false,
    icon: "",
    snackbarText: "",
    address: "",
    phoneNumber: null,
    lastName: "",
    firstName: "",
    show1: false,
    show2: false,
    valid: true,
    email: "",
    password: "",
    confirmPassword: "",
    PhoneRules: [(v) => !!v || "Phone number is required."],
    inputRules: [(v) => !!v || "This filed is required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (value) => !!value || "Required.",
      (v) => v.length >= 8 || "Min 8 characters",
      // () => (`The email and password you entered don't match`)
    ],
    confirmPasswordRules: [
      (value) => !!value || "Required.",
      (v) => v.length >= 8 || "Min 8 characters",
      (v) => v.password === v.confirmePassword || "Password must match",
    ],
  }),

  methods: {
    countryChanged(country) {
      this.country = country.dialCode;
    },
    validate() {
      this.$refs.form.validate();
    },
    Register() {
      if (this.$refs.form.validate()) {
        this.phoneNumber = this.country + this.phoneNumber;
        this.PageLoading = true;
        Register({
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phoneNumber,
          adresse: this.address,
          email: this.email,
          pwd: this.password,
          profile: "student",
          status: "active",
        })
          .then((response) => {
            this.$router.push({
              name: "SignIn",
            });
          })
          .catch((error) => {
            if (error) {
              this.error = "Error";
              this.icon = "mdi-alert";
              this.snackbarText = "Email already exists!";
              this.color = "red";
              this.snackbar = true;
              this.PageLoading = false;
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.background {
  height: 100vh;
  background: linear-gradient(
    to right,
    #0a363f 0%,
    #0a363f 50%,
    white 0%,
    white 50%
  );
}
</style>
