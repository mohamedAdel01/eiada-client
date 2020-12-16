<template>
  <main>
    <no-ssr>
      <navbar />
      <sidebar />
      <div class="p-5 mx-4">
        <div class="p-4">
          <Nuxt />
        </div>
      </div>
    </no-ssr>
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
