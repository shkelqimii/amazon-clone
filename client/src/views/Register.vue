<template>
    <div class="container mt-4">
      <h2 class="mb-4">Register</h2>
      <form>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" v-model="name">
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" v-model="email">
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password">
        </div>
        <div class="mb-3"></div>
        <button type="submit" class="btn btn-primary" @click.prevent="register()">Register</button>
      </form>
    </div>
    <RouterView />
  </template>
  
  <script>
  import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"


  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
      }
    },
    methods: {
      register() {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
            .then((data) => {
                console.log("Registered Successfully");
                this.$router.push('/')
            })
            .catch((error) => {
                console.log(error.code);
            })
    }
    }
  }
  </script>
  