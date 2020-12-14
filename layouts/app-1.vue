<template>
  <div class="app-1-layout mb-4">
    <section class="app-1-sec rounded-lg mx-auto px-3 py-5 col-md-11 col-12">
      <div
        class="logo d-flex justify-content-center"
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
        class: "app-1",
      },
    };
  },
};
</script>

<style lang="scss">
.app-1-layout {
  .app-1-sec {
    .logo {
      img {
        height: 120px;
      }
    }
  }
}
</style>
