<template>
  <div class="auth-layout mt-5 pt-5 mb-4">
    <section class="auth-sec bg-white rounded-lg mx-auto px-3 py-5 col-md-11 col-12">
      <div class="logo bg-white rounded-circle d-flex align-items-center justify-content-center">
        <img src="@/static/images/logo.svg" alt="" />
      </div>
      <div class="pt-4">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
    };
  },
};
</script>

<style lang="scss">
.auth-layout {
  .auth-sec {
    background-image: url('~@/static/images/wave.svg');
    background-size: cover;
    position: relative;
    min-height: 550px;
    .logo {
      position: absolute;
      border: 7px solid #fbfbfb;
      top: -75px;
      left: calc(50% - 75px);
      width: 150px;
      height: 150px;
      img {
        height: 70px;
      }
    }
  }
}
</style>
