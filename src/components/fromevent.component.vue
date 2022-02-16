<template>
<v-container >
  <v-row v-row justify="center">
        <v-col
          cols="5" >
                <v-text-field
                        label="Name"
                        :rules="['Required']"
                        v-model="event.name">
                </v-text-field>
         </v-col>
            
       <v-col cols="5" >
         <v-text-field
          hide-details
          single-line
          type="number"
          v-model="event.nb_place"
          label="Attendence"
        />    
  </v-col>
              
       
  </v-row>
<v-row v-row justify="center">
  <v-col cols="5">
     <v-menu
        v-model="menuStart"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="event.date_deb"
            label="Event start at date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            :rules="['Required']"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="event.date_deb"
          @input="menuStart = false"
        ></v-date-picker>
      </v-menu>
  </v-col>
  <v-col cols="5">
      <v-menu
        v-model="menuEnd"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="event.date_fin"
            label="Event end at date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
              :rules="['Required']" 
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="event.date_fin"
          @input="menuEnd = false"
        ></v-date-picker>
      </v-menu>
  </v-col>
</v-row>
<v-row v-row justify="center">
 
  <v-col cols="5">
      <v-select
            :items="items"
            label="Event Status"
            dense
            v-model="event.state"
          ></v-select>
        
      </v-col>
</v-row> 
       <v-textarea
              solo
              name="input-7-4"
              label="Event description"
              :rules="['Required']"
              v-model="event.description"
                
       />
        <v-btn
         text-color="white"
         color="#CF6400"
         class="ma-6 white--text"
         width="400"
         align="center" justify="center"
         @click="addingEvent" 
         >
         Add Event
         </v-btn>
          <v-snackbar
      v-model="snackbar"
      :timeout="timeout_snackbar"
    >
      {{ text_snackbar }}

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
    </v-snackbar>
     
</v-container>


</template>
<script>
import {addEvent} from "./APIS/EventApi"
const { v4: uuidv4} = require('uuid')

    export default {
        name:"FormEvent",
        props:{
          sessionIdTable:[]
        },
         data () {
          return {
           dateStart: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
           dateEnd: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
           menuStart: false,
           menuEnd: false,
           items: [
           'Online','Face to Face'
            ],
           snackbar: false,
           text_snackbar: 'Event added successfully',
           timeout_snackbar: 2000,
           event:{
              id:"",
              name:"",
              description:"",
              room:"",
              sessions:[],
              date_deb:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
              date_fin:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
              nb_place:"",
              state:""
            }
          }
         },
         methods:{
           addingEvent(){
             this.event.sessions=this.sessionIdTable;
             if(this.event.state=='Online'){
                this.event.room=uuidv4()
             }
             addEvent(this.event).then((response=>{
               this.event.id= response._id
                this.snackbar= true;
             }))
           },
          
         }
    }
</script>
