<template>
  <v-col align="center" justify="center">
    <v-form lazy-validation ref="form" v-model="valid">
      <v-row>
        <v-col cols="12" sm="6">
          <v-menu
            ref="menu"
            v-model="menuDebut"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :rules="inputRules"
                v-model="saission.h_deb"
                label="Pick Debute Time"
                append-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              :rules="inputRules"
              v-if="menuDebut"
              v-model="saission.h_deb"
              full-width
            ></v-time-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6">
          <v-menu
            ref="menu"
            v-model="menuEnd"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :rules="inputRules"
                v-model="saission.h_fin"
                label="Pick Debute Time"
                append-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menuEnd"
              v-model="saission.h_fin"
              full-width
            ></v-time-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="12">
          <v-text-field
            label="Event name"
            :rules="inputRules"
            v-model="saission.name"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="12">
          <v-textarea
            :rules="inputRules"
            label="Description "
            v-model="saission.description"
          >
          </v-textarea>
        </v-col>
      </v-row>
      <v-btn
        text-color="white"
        color="#CF6400"
        class="ma-6 white--text"
        @click="addingSession"
      >
        Add Session
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
      <span style="color: black">{{ text_snackbar }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!-- <v-snackbar
      color="success"
      v-model="snackbar"
      timeout="1500"
      transition="scroll-y-transition"
      top
    >
      {{ text_snackbar }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar> -->
  </v-col>
</template>

<script>
import { addSaission } from "./APIS/SaissionApi";

export default {
  name: "SaissionComponent",

  data() {
    return {
      icon: "",
      color: "success",
      valid: true,
      inputRules: [(v) => !!v || "This filed is required"],
      saission: {
        id: "",
        name: "",
        description: "",
        h_deb: null,
        h_fin: null,
      },
      saissionTable: [],
      menuDebut: false,
      menuEnd: false,
      snackbar: false,
      text_snackbar: "Session added successfully",
      timeout_snackbar: 2000,
    };
  },
  methods: {
    addingSession() {
      if (this.$refs.form.validate()) {
        addSaission(this.saission).then((response) => {
          this.saission.id = response._id;
          this.snackbar = true;
          this.icon = "mdi-check-circle-outline";
          // this.saissionTable.push(this.saission.id);
        });
      }
    },
    SessionInfo() {
      return this.saission;
    },
  },
};
</script>
