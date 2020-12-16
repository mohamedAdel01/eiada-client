<template>
  <div class="d-flex justify-content-between align-items-center p-4">
    <section class="col-md-5 col-12 h-100">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda corporis
        accusantium sint iusto doloribus suscipit ipsam cumque dicta id ipsa soluta itaque
        fugiat nam magnam quo praesentium, accusamus vel hic?
        <br />
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione tempora quia
        labore, commodi repellendus quisquam. Fuga, vel! Dolorum, doloremque aperiam
        incidunt dicta voluptate alias eaque accusamus neque in reprehenderit animi!
        <br />
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione tempora quia
        labore, commodi repellendus quisquam. Fuga, vel! Dolorum, doloremque aperiam
        incidunt dicta voluptate alias eaque accusamus neque in reprehenderit animi!
        <br />
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione tempora quia
        labore, commodi repellendus quisquam. Fuga, vel! Dolorum, doloremque aperiam
        incidunt dicta voluptate alias eaque accusamus neque in reprehenderit animi!
      </p>
    </section>
    <section class="col-md-5 col-12">
      <login-form v-if="!showSuccessMsg" @success="showSuccessMsg = true" />
      <message-sec
        v-if="showSuccessMsg"
        :status="true"
        title="Link has been sent successfully"
        message="Please check your Email to change your password"
      />
    </section>
  </div>
</template>

<script>
export default {
  middleware: "authPages",
  layout: "auth",
  data() {
    return {
      showSuccessMsg: false,
    };
  },
};
</script>
