<template>
  <div class="food-detail">
    <Navbar />
    <div class="container">
      <div class="row mt-5">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/foods" class="text-dark">Foods</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Food Order
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-6">
          <img
            :src="'../assets/images/' + product.gambar"
            alt="product.name"
            class="img-fluid shadow"
          />
        </div>
        <div class="col-md-6">
          <h2>
            <strong>{{ product.nama }}</strong>
          </h2>
          <hr />
          <h4>
            Price : <strong>Rp. {{ product.harga }}</strong>
          </h4>
          <form class="mt-4" @submit.prevent>
            <div class="form-group">
              <label for="order_quantity">Order Quantity</label>
              <input
                type="number"
                v-model="order.quantity"
                class="form-control"
                placeholder="eg. 1"
                id="order_quantity"
              />
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                id="description"
                v-model="order.description"
                class="form-control"
                placeholder="eg. spicy, half rice.."
              ></textarea>
            </div>

            <button type="submit" class="btn btn-success" @click="orders">
              <b-icon-cart-plus></b-icon-cart-plus> Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
export default {
  name: "FoodDetail",
  components: {
    Navbar,
  },
  data() {
    return {
      product: {},
      order: {},
    };
  },
  methods: {
    setProduct(data) {
      this.product = data;
    },
    orders() {
      this.order.products = this.product;
      if (this.order.quantity > 0) {
        axios
          .post("http://localhost:3000/keranjangs", this.order)
          .then(() => {
            this.$router.push({ path: "/cart" });
            this.$toast.success("successfully added to cart", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((err) => console.log(err));
      } else {
        this.$toast.error("quantity must be more than 0", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
  mounted() {
    axios
      .get(`http://localhost:3000/products/${this.$route.params.id}`)
      .then((res) => this.setProduct(res.data))
      .catch((err) => console.log("Failed to fetch data: ", err));
  },
};
</script>

<style>
</style>