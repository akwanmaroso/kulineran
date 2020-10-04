<template>
  <div class="cart">
    <Navbar :updateCart="carts" />
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/foods" class="text-dark">Foods</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Cart</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>My <strong>Cart</strong></h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Image</th>
                  <th scope="col">Food</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cart, index) in carts" :key="cart.id">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <img
                      :src="'../assets/images/' + cart.products.gambar"
                      alt="product.name"
                      class="img-fluid shadow"
                      width="250"
                    />
                  </td>
                  <td>{{ cart.products.nama }}</td>
                  <td>
                    {{ cart.description ? cart.description : "-" }}
                  </td>
                  <td>{{ cart.quantity }}</td>
                  <td align="rigth">Rp. {{ cart.products.harga }}</td>
                  <td align="rigth">
                    Rp.
                    <strong>{{ cart.products.harga * cart.quantity }}</strong>
                  </td>
                  <td align="center" class="text-danger">
                    <b-icon-trash
                      @click="removeProductFromCart(cart.id)"
                    ></b-icon-trash>
                  </td>
                </tr>
                <tr>
                  <td colspan="6" align="right">
                    <strong>Total Price</strong>
                  </td>
                  <td>
                    <strong>Rp. {{ totalPrice }}</strong>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Form Checkout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form class="mt-4" @submit.prevent>
            <div class="form-group">
              <label for="nama">Name : </label>
              <input
                type="text"
                v-model="order.name"
                class="form-control"
                placeholder="eg. Jhon Doe"
                id="nama"
              />
            </div>
            <div class="form-group">
              <label for="numberTable">Number Table : </label>
              <input
                type="text"
                v-model="order.numberTable"
                class="form-control"
                placeholder="eg. 1"
                id="numberTable"
              />
            </div>

            <button
              type="submit"
              class="btn btn-success float-right"
              @click="checkout"
            >
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
  name: "Cart",
  components: {
    Navbar,
  },
  data() {
    return {
      carts: [],
      order: {},
    };
  },
  methods: {
    setCarts(data) {
      this.carts = data;
    },
    removeProductFromCart(id) {
      axios
        .delete(`http://localhost:3000/keranjangs/${id}`)
        .then(() => {
          this.$toast.error("successfully remove product from cart", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });

          axios
            .get("http://localhost:3000/keranjangs")
            .then((res) => this.setCarts(res.data))
            .catch((err) => console.log("Failed to fetch data: ", err));
        })
        .catch((err) => console.log(err));
    },
    checkout() {
      if (this.order.name && this.order.numberTable) {
        this.order.carts = this.carts;

        // Delete cart
        axios.post("http://localhost:3000/pesanans", this.order).then(() => {
          this.carts.map((item) => {
            return axios
              .delete(`http://localhost:3000/keranjangs/${item.id}`)
              .catch((err) =>
                console.log("Failed to remove all data from cart: ", err)
              );
          });

          this.$router.push({ path: "/order-success" });
          this.$toast.success("Order success", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        });
      } else {
        this.$toast.error("name and table cannot be empty", {
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
      .get("http://localhost:3000/keranjangs")
      .then((res) => this.setCarts(res.data))
      .catch((err) => console.log("Failed to fetch data: ", err));
  },
  computed: {
    totalPrice() {
      return this.carts.reduce((items, data) => {
        return items + data.products.harga * data.quantity;
      }, 0);
    },
  },
};
</script>

<style>
</style>