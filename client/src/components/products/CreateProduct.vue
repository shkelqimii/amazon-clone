<template v-if="user">
    <div class="container">
      <h2>Create Product</h2>
      <form>
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input type="text" class="form-control" id="title" v-model="product.title">
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control" id="description" rows="3" v-model="product.description"></textarea>
        </div>
        <div class="mb-3">
            <label class="choosefile-button">
                    <i class="fal fa-plus" />
                    <input type="file" @change="onFileSelected" />
                    <p style="margin-top:-70px"></p>
                  </label>
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Price</label>
          <input type="number" class="form-control" id="price" v-model="product.price">
        </div>
        <div class="mb-3">
          <label for="stockQuantity" class="form-label">Stock Quantity</label>
          <input type="number" class="form-control" id="stockQuantity" v-model="product.stockQuantity">
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">Category</label>
          <select class="form-control" id="category" v-model="product.categoryID">
            <option value="" disabled selected>Select category</option>
            <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.type }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="owner" class="form-label">Owner</label>
          <select class="form-control" id="owner" v-model="product.ownerID">
            <option value="" disabled selected>Select owner</option>
            <option v-for="owner in owners" :key="owner._id" :value="owner._id">{{ owner.name }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="createProduct">Create</button>
      </form>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios'
  import {getAuth, onAuthStateChanged } from 'firebase/auth'
  const auth = getAuth();
export default {
    data() {
    return {
        user: null,
      product: {
        categoryID: null,
        ownerID: null,
        title: '',
        description: '',
        photo: '',
        price: '',
        stockQuantity: '',
        category:'',
        owner:'',
      },
      categories: [],
      owners: []
    };
  },
  
  mounted() {
  onAuthStateChanged(auth, (user) => {
    this.user = user;
    this.fetchCategories();
    this.fetchOwners();
  });
},
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.fileName = event.target.files[0].name;
    },
    fetchCategories() {
      axios.get("http://localhost:3000/api/categories")
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchOwners() {
      axios.get("http://localhost:3000/api/owners")
        .then(response => {
          this.owners = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async createProduct() {
      try {
        const response = await axios.post("http://localhost:3000/api/products", this.product);
        console.log(response.data);
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  }
}
  </script>
  
 