<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <h1>List <strong>Foods</strong></h1>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Search your favorite food..."
              aria-label="Search"
              aria-describedby="basic-addon1"
              v-model="search"
              @keyup="searchFood"
            />
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"
                ><b-icon-search></b-icon-search
              ></span>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div
          class="col-md-4 mt-4"
          v-for="product in products"
          :key="product.id"
        >
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";
export default {
  name: "Foods",
  components: {
    Navbar,
    CardProduct,
  },
  data() {
    return {
      products: [],
      search: "",
    };
  },
  methods: {
    setProducts(item) {
      this.products = item;
    },
    searchFood() {
      axios
        .get(`http://localhost:3000/products?q=${this.search}`)
        .then((res) => this.setProducts(res.data))
        .catch((err) => console.log("Failed to fetch data: ", err));
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products")
      .then((res) => this.setProducts(res.data))
      .catch((err) => console.log("Failed to fetch data: ", err));
  },
};
</script>

<style>
</style>