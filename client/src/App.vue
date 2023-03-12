<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { onMounted, ref } from 'vue'

const isLoggedIn = ref(false);

let auth;


export default {
  data(){
    return{
      isLoggedIn: false
    }
  },
  setup() {
        onMounted(() => {
      auth = getAuth();
      onAuthStateChanged(auth, (user)=> {
        if(user) {
          isLoggedIn.value = true;
        }else{
          isLoggedIn.value = false;
        }
      })
    })
  },
  methods: {
    async signOut() {
      const auth = getAuth()
      try {
        await signOut(auth)
        console.log('Signed out successfully')
        this.$router.push('/')
      } catch (error) {
        console.log(error.code)
      }
    },
  },
  computed: {
    currentUser() {
      return getAuth().currentUser
    },
  },
 
}

</script>


<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <router-link to="/" class="navbar-brand" href="#">Ecommerce</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/about">About</router-link>
      </li>
    </ul>
    <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link class="nav-link" to="/signin">Sign In</router-link>
      </li>
      <li class="nav-item active">
        <router-link class="nav-link" to="/register">Register</router-link>
      </li>
      <li class="nav-item">
        <button  class="nav-link" @click="signOut()">Sign Out</button>
      </li>
      </ul>
  </div>
      
  </div>
</nav>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
