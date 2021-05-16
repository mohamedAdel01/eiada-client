<template>
  <main>
    <client-only>
      <navbar />
      <sidebar />
      <div class="p-5 mx-4">
        <div class="p-4">
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
