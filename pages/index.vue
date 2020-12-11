<template>
  <div class="container">
    <div>
      <h1 class="title">
        welcome in eiada home page
      </h1>
      <p @click="logout">logout</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('auth/AUTH', {
        service: 'LOGOUT',
        payload: null
      }).then(res => {
        location.reload()
      })
    }
  }
}
</script>

<style>

</style>
