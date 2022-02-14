<template>
  <v-app class="background">
    <v-row align="center">
      <v-container>
        <v-card>
          <v-row align="center" justify="center">
            <v-col cols="5">
              <v-img
                class="white--text align-end"
                src="../../assets/signupImage.svg"
              />
            </v-col>
            <v-col cols="5">
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
                  <v-text-field
                    v-model="phoneNumber"
                    label="Phone Number"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="address"
                    label="Home address"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>

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
                <v-btn
                  text-color="white"
                  :disabled="!valid"
                  color="#CF6400"
                  class="ma-6 white--text"
                  width="400"
                  @click="Register"
                >
                  Register
                </v-btn>
                <v-btn text class="ma-1" plain to="/">
                  Already have an account ? Login from here!
                </v-btn>
              </v-form>
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
    address: "",
    phoneNumber: "",
    lastName: "",
    firstName: "",
    show1: false,
    show2: false,
    valid: true,
    email: "",
    password: "",
    confirmPassword: "",
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
    validate() {
      this.$refs.form.validate();
    },
    Register() {
      if (this.$refs.form.validate()) {
        Register({
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phoneNumber,
          adresse: this.address,
          email: this.email,
          pwd: this.password,
          profile: "student",
          status: "active",
        }).then((response) => {
          this.$router.push({
            name: "SignIn",
          });
          console.log("is it me or is it ", response.newUser);
          //this.events = response;
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