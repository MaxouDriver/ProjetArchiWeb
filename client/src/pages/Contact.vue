<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card id="container">
        <form>
          <v-text-field v-model="name" v-validate="'required|max:10'" :counter="10" :error-messages="errors.collect('name')"
              label="Name" data-vv-name="name" required>
          </v-text-field>

          <v-text-field v-model="email" v-validate="'required|email'" :error-messages="errors.collect('email')" label="E-mail"
              data-vv-name="email" required>
          </v-text-field>

          <v-select v-model="select" v-validate="'required'" :items="items" :error-messages="errors.collect('select')" label="Subject"
              data-vv-name="select" required>
          </v-select>

          <v-textarea v-model="text" v-validate="'required'" auto-grow box label="Your message" rows="10" data-vv-name="text" :error-messages="errors.collect('text')" required></v-textarea>

          <v-btn @click="submit">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
      </form>
      </v-card>
    </v-flex>
  </v-layout>
    
</template>

<script>
import DataManager from '../utils/DataManager.js';

  export default {
    $_veeValidate: {
      validator: 'new'
    },

    data: () => ({
      name: '',
      email: '',
      select: null,
      items: [
        'Found a bug',
        'Idea to enhance the website',
        'Other'
      ],
      text: '',
      dictionary: {
        attributes: {
          email: 'E-mail Address'
          // custom attributes
        },
        custom: {
          name: {
            required: () => 'Name can not be empty',
            max: 'The name field may not be greater than 10 characters'
            // custom messages
          },
          select: {
            required: 'Subject field is required'
          },
          text: {
            required: 'Your message is required'
          }
        }
      }
    }),

    mounted () {
      this.$validator.localize('en', this.dictionary)
    },

    methods: {
      submit () {
        var thisRef = this;

        this.$validator.validateAll().then(valid => {
        if (!valid) {
          // do nothing if not valid.
        } else {
          DataManager.sendMail({
            name: this.name,
            email: this.email,
            subject: this.select,
            text: this.text
          },
          function(){
            alert("Message sucessfully sent");
            thisRef.clear();
            return;
          },
          function(){
            alert("Opps something went wrong");
            return;
          });
        }
      });
        
      },
      clear () {
        this.name = ''
        this.email = ''
        this.select = null
        this.text = null
        this.$validator.reset()
      }
    }
  }
</script>

<style scoped>
  #container{
    padding: 4vw;
    margin: 8vw;
  }
</style>

