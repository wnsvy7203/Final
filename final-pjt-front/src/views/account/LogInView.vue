<template>
  <div style="color: white" class="my-3">
    <h1>LogIn Page</h1>
    <b-form
      @submit.prevent="logIn"
      @reset="onReset"
      v-if="show"
    >
      <b-form-group
        id="input-group-1"
        label-for="input-1"
        style="col-3"
      >
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="username"
          placeholder="Enter username"
          required
        ></b-form-input>
      </b-form-group>

      <br>
      <br>

      <b-form-group
        id="input-group-2"
        label-for="input-2"
      >
        <b-form-input
          type="password"
          id="input-2"
          v-model="form.password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="outline-primary">Submit</b-button>
      <b-button type="reset" variant="outline-danger">Reset</b-button>
      <b-button type="submit" variant="outline-success" @click="moveSignUp">회원가입 </b-button>
    </b-form>



  </div>
</template>
  
  <script>
  export default {
    name: 'LogInView',
    data() {
      return {
        form: {
          username: null,
          password: null,
        },
        show: true
      }
    },
    methods: {
      logIn() {
        const username = this.form.username
        const password = this.form.password
  
        const payload = {
          username: username,
          password: password,
        }
        this.$store.dispatch('logIn', payload)
      },
      moveSignUp(){
        this.$router.push({ name : 'signup'})
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.username = null
        this.form.password = null

        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
  </script>
  