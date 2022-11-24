<template>
  <div style="color: white" class="check container">
    <b-form class="LoginForm"
      @submit.prevent="logIn"
      @reset="onReset"
      v-if="show"
      >
    <h2 style="font-size: 50px;  color:black">Log In</h2>
    <b-form-group
        id="input-group-1"
        label-for="input-1"
        style="width: 90%;"
      >
      <div>
        <b-form-input
          class="textForm"
          v-model="form.username"
          type="username"
          id="input-1"
          placeholder="Enter ID"
        ></b-form-input>
      </div>
    </b-form-group>

    <b-form-group
      id="input-group-2"
      label-for="input-2"
      style="width: 90%;"
    >
      <b-form-input
      class="textForm"
        type="password"
        id="input-2"
        v-model="form.password"
        placeholder="Enter password"
        required
      ></b-form-input>
    </b-form-group>

      <b-button type="submit" variant="outline-dark">Submit</b-button>
      <b-button type="reset" variant="outline-dark">Reset</b-button>
      <br>
      <b-button type="submit" variant="outline-dark" @click="moveSignUp">회원가입 </b-button>
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

<style>
.check{
  background-color: white;
}
.LoginForm{
  position:absolute;
  width:400px;
  height:400px;
  padding: 30px, 20px;
  background-color:#FFFFFF;
  text-align:center;
  top:40%;
  left:50%;
  transform: translate(-50%,-50%);
  border-radius: 15px;
}

.LoginForm h2{
  text-align: center;
  margin: 30px;
}

.textForm{
  display:inline-flex;
  border-bottom: 2px solid #adadad;
  margin: 30px;
  padding: 10px 10px;
  width: 75%;

}

.id{
  width: 75%;
  border:none;
  outline:none;
  color: #636e72;
  font-size:16px;
  height:25px;
  background: none;
}

.pwd{
  width: 75%;
  border:none;
  outline:none;
  color: #636e72;
  font-size:16px;
  height:25px;
  background: none;
}
</style>
  