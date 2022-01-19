<template>
  <v-container>
      <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        Setting up Saission info
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
         Setting up Event Info
      </v-stepper-step>

    

    
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <!-- <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card> -->
        
        <SaissionComponent/>
        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
       <FormEvent/>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Back
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <!-- <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content> -->
    </v-stepper-items>
  </v-stepper>
  </v-container>
</template>
<script>
import FormEvent from './fromevent.component.vue'
import SaissionComponent from './saission.event.component.vue'
  export default {
    name:"AddEvent",
    data () {
      return {
        e1: 1,
      }
    },
    components:{
      FormEvent,
      SaissionComponent,
    }
  }
</script>