<template>
  <b-form @submit.prevent>
    <b-form-group :label="$t('hello')" description="We'll never share your email with anyone else.">
      <b-form-input class="py-4" type="email" required placeholder="Enter email"></b-form-input>
    </b-form-group>
  </b-form>
</template>

<script>
export default {};
</script>

<style></style>
