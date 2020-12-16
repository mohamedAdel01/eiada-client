<template>
  <div class="d-flex justify-content-between p-4">
    <section class="col-md-5 col-12 h-100">
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
    </section>
    <section class="col-md-5 col-12">
      <register-form v-if="!showSuccessMsg" @success="showSuccessMsg = true" />
      <message-sec
        v-if="showSuccessMsg"
        :status="true"
        title="You are register successfully"
        message="Please check your Email to verify email"
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
