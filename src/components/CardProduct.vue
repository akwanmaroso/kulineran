<template>
  <div class="card shadow card-product">
    <img :src="'assets/images/' + product.gambar" alt="" class="card-img-top" />
    <div class="card-body">
      <div class="card-title">{{ product.nama }}</div>
      <p class="card-text">Price: Rp. {{ product.harga }}</p>
      <router-link :to="'/foods/' + product.id" class="btn btn-success">
        <b-icon-cart-plus></b-icon-cart-plus> Order
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["product"],
};
</script>

<style></style>
