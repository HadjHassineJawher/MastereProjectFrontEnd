<template>
  <v-app>
    <v-container>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            Setting up session information
            <small
              >In order to add a new session click "Add new session" <br />
              then "Save session" to save it.</small
            >
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2">
            Setting up Event information
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <div v-for="i in nbrSaission" :key="i">
              <SaissionComponent ref="saission" />
            </div>

            <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>

            <v-btn text @click="incrementSaission"> Add new session </v-btn>

            <v-btn text @click="saveSession"> Save Session </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <FormEvent :sessionIdTable="SessionIdTable" />

            <v-btn color="primary" @click="e1 = 1"> Back </v-btn>

            <v-btn text> Cancel </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </v-app>
</template>
<script>
import FormEvent from "./fromevent.component.vue";
import SaissionComponent from "./saission.event.component.vue";

export default {
  name: "AddEvent",

  data() {
    return {
      e1: 1,
      nbrSaission: 1,
      SessionIdTable: [],
    };
  },
  components: {
    FormEvent,
    SaissionComponent,
  },
  methods: {
    incrementSaission() {
      this.nbrSaission++;
  },
    saveSession() {
      for (var i = 0; i < this.$refs.saission.length; i++) {
        this.SessionIdTable.push(this.$refs.saission[i].SaissionInfo().id);
      }
    },
  },
};
</script>
