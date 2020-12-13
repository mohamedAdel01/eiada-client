<template>
  <div class="auth-layout mb-4">
    <section class="auth-sec rounded-lg mx-auto px-3 py-5 col-md-11 col-12">
      <div
        class="logo bg-white rounded-circle d-flex align-items-center justify-content-center"
      >
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
      bodyAttrs: {
        class: 'auth'
      }
    };
  },
};
</script>

<style lang="scss">
.auth-layout {
  padding-top: 75px;
  .auth-sec {
    position: relative;
    .logo {
      position: absolute;
      border: 7px solid #24B6DE30;
      top: -30px;
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
