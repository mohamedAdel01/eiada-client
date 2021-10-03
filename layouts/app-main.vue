<template>
  <main>
    <client-only>
      <navbar />
      <sidebar />
      <div class="col-xl-10 mx-auto px-0 py-5">
        <div class="py-4">
          <Nuxt />
        </div>
      </div>
    </client-only>
  </main>
</template>

<script>
export default {
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      bodyAttrs: {
        class: "app-2",
      },
    };
  },
};
</script>
