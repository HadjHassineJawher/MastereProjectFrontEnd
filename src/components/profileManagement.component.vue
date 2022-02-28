<template>
  <div style="margin-top: 10%">
    <v-row class="pa-4">
      <v-col cols="12" md="4" class="d-flex text-center">
        <v-card class="pt-6 mx-auto" flat>
          <v-card-text style="position: sticky; top: 35%">
            <v-badge avatar bordered overlap>
              <template v-slot:badge>
                <v-avatar>
                  <v-icon>mdi-pencil</v-icon>
                </v-avatar>
              </template>
              <v-avatar color="info" class="white--text headline">
                {{ nameAvatar(currentUser.FirstName) }}</v-avatar
              >
            </v-badge>
            <v-spacer></v-spacer>
            <br />
            <v-btn class="ma-2" outlined @click="expand = !expand">
              Change password
            </v-btn>
            <v-expand-transition>
              <v-card flat color="white" v-show="expand" width="400">
                <v-card-text>
                  <v-form
                    ref="formPassword"
                    v-model="validPassword"
                    :lazy-validation="lazy"
                  >
                    <v-progress-circular
                      :width="3"
                      color="red"
                      v-show="load"
                      indeterminate
                    ></v-progress-circular>
                    <v-col cols="12" md="12">
                      <v-label class="mb-2"
                        >Please enter your current password</v-label
                      >
                      <v-text-field
                        class="mt-1"
                        type="password"
                        color="teal lighten-1"
                        label="Current password"
                        outlined
                        :rules="[(v) => !!v || 'Password is required']"
                        v-model="dataUser.currentPassword"
                        required
                      >
                      </v-text-field>
                      <v-label>Please enter your new password</v-label>
                      <v-text-field
                        class="mt-1"
                        type="password"
                        color="teal lighten-1"
                        :rules="[(v) => !!v || 'Password is required']"
                        label="New password"
                        outlined
                        v-model="dataUser.newPassword"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-btn outlined :disabled="!validPassword" color="primary"
                      >Save new password</v-btn
                    >
                  </v-form>
                </v-card-text>
              </v-card>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="auto">
        <v-divider
          :vertical="$vuetify.breakpoint.mdAndUp ? true : false"
        ></v-divider>
      </v-col>
      <v-col cols="12" md="7" class="ml-md-6">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            v-model="dataUser.firstName"
            append-icon="mdi-account"
            label="First Name"
          ></v-text-field>
          <v-text-field
            outlined
            v-model="dataUser.lastName"
            append-icon="mdi-account"
            label="Last Name"
          ></v-text-field>
          <v-text-field
            outlined
            v-model="dataUser.adresse"
            append-icon="mdi-gmail"
            type="text"
            label="Address"
          ></v-text-field>
          <v-text-field
            outlined
            append-icon="mdi-phone"
            v-model="dataUser.phone"
            type="text"
            label="Phone number"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="success" class="mr-4" @click="updateProfileUser">
            Save
          </v-btn>
        </v-form>
        <v-snackbar
          v-model="snackbar"
          timeout="2000"
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
      </v-col>
    </v-row>
  </div>
</template>
<script>
import userMixin from "../mixins/user.mixin";
import axios from "axios";
export default {
  mixins: [userMixin],
  data: () => ({
    load: false,
    lazy: false,
    color: "success",
    snackbar: false,
    icon: "",
    snackbarText: "",
    dataUser: {
      firstName: "",
      lastName: "",
      adresse: "",
      phone: null,
    },
    validPassword: false,
    passCurrent: "",
    newPassword: "",
    dialog: false,
    v: false,
    pass: "",
    expand: false,
    showPassword: false,
    activePicker: null,
    showPasswordUpdate1: false,
    menu: false,
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    date: null,
    valid: true,
    name: "",
    //nameRules: [(v) => !!v || "Name is required"],
    // birthdayRules: [(v) => !!v || "Birthday is required"],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length >= 8) || "Password must be greater than 8 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  watch: {
    onSnackbarClose() {
      if (this.snackbar == false) {
        this.$emit("snackbar", false);
      }
    },
  },
  created() {
    this.$nextTick(function () {
      this.dataUser = this.user;
      console.log("A", this.dataUser);
    });
  },
  methods: {
    updateProfileUser() {
      console.log("Aaaaaaaaaaa", this.dataUser);
      axios
        .patch(
          "https://mpdam-stream-server.herokuapp.com/Api/UpdateUser/" +
            localStorage.ID,
          this.dataUser
        )
        .then((res) => {
          console.log("Ree", res);
          this.v = false;
          this.icon = "mdi-check-circle-outline";
          this.snackbarText = "Your data got updated.";
          this.color = "success";
          this.snackbar = true;
        });
      // this.$store
      //   .dispatch("updateProfileUserAction", this.dataUser)
      //   .then((response) => {
      //     if (response) {
      //       this.v = false;
      //       this.icon = "mdi-check-circle-outline";
      //       this.snackbarText = "Your data got updated.";
      //       this.color = "success";
      //       this.snackbar = true;
      //     }
      //   })
      //   .catch((error) => {
      //   console.log("error in profile : ", error);
      //   if (error) {
      //     if (error.status === 400) {
      //       this.error = "Error";
      //     }
      //     this.icon = "mdi-alert";
      //     this.snackbarText = error.errors;
      //     this.color = "red";
      //     this.snackbar = true;
      //   }
      // });
    },
    nameAvatar(currentUserData) {
      if (currentUserData) {
        let scurrentUserData = currentUserData.charAt(0);
        return scurrentUserData.toUpperCase();
      }
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    validate() {
      this.$refs.form.validate();
    },
    validatePassword() {
      this.$refs.formPassword.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
