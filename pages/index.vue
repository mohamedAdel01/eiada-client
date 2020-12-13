<template>
  <div class="container">
    <div>
      <h1 class="title">
        welcome in eiada home page
      </h1>
      <nuxt-link to="/auth/register">register</nuxt-link>
      <br/>
      <nuxt-link to="/auth/login">login</nuxt-link>
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
body {
  background-image: none;
}
</style>
