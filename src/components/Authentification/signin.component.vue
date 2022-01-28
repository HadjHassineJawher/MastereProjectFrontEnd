<template>
<v-app class="background">
     <v-row align="center">
         <v-container >
      
        <v-card  >
                <v-row align="center"
                        justify="center">
                    <v-col cols="5">
                        <v-img
                        class="white--text align-end"
                        src="../../assets/signinImage.svg"/> 
                    </v-col>
                    <v-col cols="5">
                         <v-form
                                align="center"
                                ref="form"
                                v-model="valid"
                                lazy-validation >
                                <h3 >Welcome</h3>
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
                                    text-color="white"
                                    :disabled="!valid"
                                    color="#0A363F"
                                    class="ma-6 white--text"
                                    width="400"
                                    @click="addingUser" 
                                    >
                                Validate
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
       
</v-app>
   
    
</template>
<script>
import {Login} from "../APIS/UserApi"

export default {
  name: "SignIn",
    data: () => ({
      show1: true,
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 7|| 'Min 7 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
       snackbar: false,
       text_snackbar: 'Email or password incorrect',
      user:{
        Email:"",
        Password:"",
      }
    }),

    methods: {
      addingUser () {
        //this.$refs.form.validate()
        Login(this.user).then((responce)=>{
          if(responce.SecretInfo){
            console.log(responce.SecretInfo)
            this.$router.push({ name: 'Welcome' })
          }
            
        })
     
        
      },
   
    },
  }

</script>
<style scoped>
.background{
    height: 100vh;
    background: linear-gradient(
        to right,
        #119D90 0%,
        #119D90 50%,
        white 0%,
        white 50%

    )
}

</style>