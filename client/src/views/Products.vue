<template>
    <div class="container">
      <h2>Products</h2>
      <router-link to="/createproduct" class="btn btn-primary my-5">Create a product</router-link>
      <div class="row">
        <div class="col-md-4" v-for="product in products" :key="product._id">
          <div class="card mb-4 box-shadow">
            <img class="card-img-top" :src="product.photo" alt="Card image cap">
            <div class="card-body">
              <h4 class="card-title">{{ product.title }}</h4>
              <p class="card-text">{{ product.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="price">$ {{ product.price }}</span>
                <span class="stock">{{ product.stockQuantity }} in stock</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        products: []
      }
    },
    created() {
      this.fetchProducts();

    },
    methods: {
      fetchProducts() {
        axios.get('http://localhost:3000/api/products')
          .then(response => {
            this.products = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
  </script>
  
  <style>
  .price {
    font-weight: bold;
  }
  .stock {
    font-style: italic;
  }
  .category {
    font-size: 0.8rem;
    color: #999;
  }
  .owner {
    font-size: 0.8rem;
    color: #999;
  }
  
  </style>
  