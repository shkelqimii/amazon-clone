<template>
    <div class="container mt-4">
      <h2 class="mb-4">Sign In</h2>
      <form>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" v-model="email">
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password">
        </div>
        <p v-if="errMsg">{{ errMsg }}</p>
        <div class="mb-3">
            <button @click="signInWithGoogle" class="primary">
                Sign In with Google
            </button>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="register()">Sign In</button>
      </form>
    </div>
    <RouterView />
  </template>
  
  <script>
  import {getAuth, signInWithEmailAndPassword } from 'firebase/auth'
  export default {
    data() {
      return {
        email: '',
        password: '',
        errMsg: ''
      }
    },
    methods: {
      async register() {
        try {
          await signInWithEmailAndPassword(getAuth(), this.email, this.password);
          console.log("Successfully signed in");
          this.$router.push('/');
        } catch (error) {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              this.errMsg = "Invalid Email";
              alert("Invalid Email")
              break;
            case "auth/user-not-found":
              this.errMsg = "No user found";
              alert("Invalid Email")
              break;
            case "auth/wrong-password":
              this.errMsg = "Wrong password";
              alert("Invalid Email")
              break;
            default:
              this.errMsg = "Email or password incorrect";
              alert("Invalid Email")
              break;
          }
        }
      },
      signInWithGoogle(){

      }
    }
  }
  </script>
  