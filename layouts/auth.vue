<template>
  <div class="auth-layout mb-4">
    <section class="mx-auto px-3 py-5 col-md-11 col-12">
      <div class="auth-logo d-flex align-items-center justify-content-center">
        <img src="@/static/images/logo.svg" alt="" />
      </div>
      <div class="pt-4">
        <no-ssr>
          <Nuxt />
        </no-ssr>
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
        class: "auth",
      },
    };
  },
};
</script>

<style lang="scss">
.auth-layout {
  .auth-logo {
    img {
      height: 100px;
    }
  }
}
</style>
