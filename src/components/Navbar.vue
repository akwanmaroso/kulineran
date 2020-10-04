<template>
  <div>
    <b-navbar toggleable="lg" type="light">
      <div class="container">
        <router-link class="navbar-brand" to="/">Kulineran</router-link>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/foods">Foods</router-link>
            </li>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/cart">
                Cart
                <b-icon-cart></b-icon-cart>
                <span class="badge badge-success ml-2">{{
                  updateCart ? updateCart.length : orders.length
                }}</span>
              </router-link>
            </li>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Navbar",
  data() {
    return {
      orders: [],
    };
  },
  props: ["updateCart"],
  methods: {
    setOrders(data) {
      this.orders = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/keranjangs")
      .then((res) => this.setOrders(res.data))
      .catch((err) => console.log("Failed to fetch data: ", err));
  },
};
</script>
