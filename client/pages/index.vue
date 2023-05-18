<template>
  <div class="home">
    <!-- Hero -->
    <Hero />

    <!-- Loading Animation -->
    <Loading v-if="$fetchState.pending" />

    <!-- Coupons -->
    <div id="coupons-grid" class="coupons-grid">
      <div class="coupon" v-for="(coupon, index) in coupons" :key="index">
        <div class="coupon-img">
          <img :src="coupon.image" :alt="coupon.name" class="coupon-poster" />
          <p class="discount">{{ coupon.discount }}</p>
        </div>
        <div class="info">
          <p class="title">
            {{ coupon.name.slice(0, 25) }}
            <span v-if="coupon.name.length > 25">...</span>
          </p>
          <button
            class="button button-light"
            :disabled="isCouponClaimed(coupon.id)"
            @click="claimCoupon(coupon)"
          >
            <template v-if="!isCouponClaimed(coupon.id)">
              <span v-if="hoveredCouponIndex === index">Coupon Code: </span>
              {{ hoveredCouponIndex === index ? coupon.code : 'Claim Coupon' }}
            </template>
            <span v-else>Code Copied</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'home',

  data() {
    return {
      coupons: [],
      claimedCoupons: [],
      hoveredCouponIndex: -1,
      $fetchState: {
        pending: false,
        error: null,
        timestamp: Date.now(),
      },
    };
  },

  async fetch() {
    try {
      this.$fetchState.pending = true;
      const response = await axios.get('http://localhost:8000/coupons');
      this.coupons = response.data.map((coupon) => ({
        ...coupon,
        showCode: false,
      }));
    } catch (error) {
      console.error(error);
      this.$fetchState.error = error.message;
    } finally {
      this.$fetchState.pending = false;
    }
  },

  methods: {
    showCouponCode(index) {
      this.coupons[index].showCode = !this.coupons[index].showCode;
    },
    isCouponClaimed(couponId) {
      return this.claimedCoupons.includes(couponId);
    },
    claimCoupon(coupon) {
      if (!this.isCouponClaimed(coupon.id)) {
        const el = document.createElement('textarea');
        el.value = coupon.code;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.claimedCoupons.push(coupon.id);
      }
    },
  },
};
</script>

  <style scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }
  .button {
    padding: 8px 16px;
    background-color: #c92502;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }

  .coupons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 16px;
    margin-top: 32px;
  }

  .coupon {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .coupon .coupon-img {
    position: relative;
  }

  .coupon .coupon-poster {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  .coupon .discount {
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 4px 8px;
    background-color: #c92502;
    color: #fff;
    font-weight: bold;
    border-radius: 4px;
  }
  .coupon .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  .coupon .button {
    padding: 8px 16px;
    background-color: #c92502;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
  }

  .coupon .button:hover {
    background-color: #c92502;
  }

  .coupon .button-light {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  color: #c92502;
  border: 1px solid #c92502;
}


  .coupon .button-light:hover {
    background-color: #f5f5f5;
  }
  </style>

