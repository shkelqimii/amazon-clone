import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/main.css'
import './assets/app.scss'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCs6x8q6al-YBJaULRAjb5rluSl_xfsqdw",
  authDomain: "ecommerce-8d7ac.firebaseapp.com",
  projectId: "ecommerce-8d7ac",
  storageBucket: "ecommerce-8d7ac.appspot.com",
  messagingSenderId: "729337208265",
  appId: "1:729337208265:web:694a6f559879204f341c18",
  measurementId: "G-P73BKPRED7"
};

initializeApp(firebaseConfig)

const app = createApp(App)


app.use(router)

app.mount('#app')

