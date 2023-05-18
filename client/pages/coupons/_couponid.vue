<template>
  <div>
    <h1>{{ selectedCoupon.name }}</h1>
    <!-- Add debug output -->
    <pre>{{ $fetchState }}</pre>
  </div>
</template>

  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CouponDetails',
    data() {
    return {
      selectedCoupon: {},
      $fetchState: {
        pending: false,
        error: null,
        timestamp: Date.now(),
      },
    };
  },
  
    async fetch() {
    const id = this.$route.params.id;
    if (id) {
      await this.fetchCouponDetails(id);
    }
  },
  
    methods: {
  async fetchCouponDetails(id) {
    try {
      this.$fetchState.pending = true;
      const response = await axios.get(`http://localhost:8000/coupons/${id}`);
      // Process the response and update the necessary data properties
      // For example, you can assign the fetched coupon details to a separate data property:
      this.selectedCoupon = response.data;
    } catch (error) {
      console.error(error);
      this.$fetchState.error = error.message;
    } finally {
      this.$fetchState.pending = false;
    }
  },
},

}
  </script>
  
  <style>
  h1 {
    color: #333;
    font-size: 24px;
    margin-bottom: 16px;
  }

  p {
    color: #666;
    font-size: 16px;
  }
</style>

  