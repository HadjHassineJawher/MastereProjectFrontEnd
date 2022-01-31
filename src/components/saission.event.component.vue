<template>
  <v-col align="center" justify="center">
    <v-row>
      <v-col cols="11" sm="5">
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
              :rules="['Required']"
              v-model="saission.h_deb"
              label="Pick Debute Time"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menuDebut"
            v-model="saission.h_deb"
            full-width
          ></v-time-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="11" sm="5">
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
              :rules="['Required']"
              v-model="saission.h_fin"
              label="Pick Debute Time"
              prepend-icon="mdi-clock-time-four-outline"
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
    </v-row>
    <v-row>
      <v-col cols="11" sm="5">
        <v-text-field
          label="Name"
          :rules="['Required']"
          v-model="saission.name"
        >
        </v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="11" sm="5">
        <v-text-field
          :rules="['Required']"
          label="Description "
          v-model="saission.description"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-btn
      text-color="white"
      color="#CF6400"
      class="ma-6 white--text"
      width="400"
      @click="addingSaission"
    >
      Add Session
    </v-btn>
    <v-snackbar v-model="snackbar" :timeout="timeout_snackbar">
      {{ text_snackbar }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-col>
</template>

<script>
import { addSaission } from "./APIS/SaissionApi";

export default {
  name: "SaissionComponent",

  data() {
    return {
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
      text_snackbar: "Sassion added successfully",
      timeout_snackbar: 2000,
    };
  },
  methods: {
    addingSaission() {
      addSaission(this.saission).then((responce) => {
        this.saission.id = responce._id;
        this.snackbar = true;
        this.saissionTable.push(this.saission.id);
      });
    },
    SaissionInfo() {
      return this.saission;
    },
  },
};
</script>