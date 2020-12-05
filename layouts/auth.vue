<template>
  <div class="auth-layout d-flex align-items-center">
    <section class="auth-sec bg-white rounded-lg mx-auto px-3 py-5 col-md-9 col-12 shadow-sm">
      <div class="logo bg-white rounded-circle d-flex align-items-center justify-content-center">
        <img src="@/static/images/logo.svg" alt="" />
      </div>
      <Nuxt />
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
  height: 100vh;
  .auth-sec {
    position: relative;
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
