<template>
  <main>
    <navbar />
    <sidebar />
    <div class="p-5 mx-2">
      <no-ssr>
        <Nuxt />
      </no-ssr>
    </div>
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
