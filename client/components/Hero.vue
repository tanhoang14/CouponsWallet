<template>
  <div class="hero h-400px relative">
    <img src="~/assets/coupon.jpg" class="w-full h-full object-cover opacity-50" />
    <div class="overlay absolute top-0 w-full h-full bg-black opacity-50"></div>
    <div class="text-container absolute top-0 w-full h-full flex flex-col justify-center">
      <div class="text mx-auto max-w-1400px">
        <span class="mini-heading font-semibold text-base md:text-lg text-uppercase text-red-600 mb-2">Welcome to</span>
        <h1 class="text-white text-4xl md:text-5xl font-light mb-6">
          <span class="font-medium">Coupon Wallet</span>
        </h1>
        <a href="#coupons-grid" class="button text-lg text-white bg-red-500 hover:bg-red-600 py-3 px-6 rounded-md transition-colors duration-300 mt-4" @click="scrollToCouponsGrid">View Coupon</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  methods: {
    scrollToCouponsGrid() {
      const couponsGridElement = document.getElementById('coupons-grid');
      couponsGridElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
.hero {
  height: 400px;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

html {
  scroll-behavior: smooth;
}
</style>

