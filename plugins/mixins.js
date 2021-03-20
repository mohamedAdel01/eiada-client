import Vue from "vue";
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true;
  Vue.mixin({
    methods: {
      // GLOBAL FUNCTIONS
      handleErrors() {
        this.showErrors = true;
        // if (!document.getElementsByClassName("text-danger")[0]) return;
        // setTimeout(() => {
        //   document.getElementsByClassName("text-danger")[0].scrollIntoView({
        //     behavior: "smooth",
        //     block: "center",
        //     inline: "nearest"
        //   });
        // }, 100);
      },
      checkFormErrors() {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          this.handleErrors();
          return false;
        }
        // if (checkPhone) {
        //   if (!this.validatedPhone.valid) {
        //     this.handleErrors();
        //     return false;
        //   }
        // }
        this.showErrors = false;
        return true;
      },
      checkRoute() {
        if (isNaN(this.$route.params.id)) {
          this.$router.go(-1);
          return false;
        }
        return true;
      },

      // STORE FUNCTIONS
      STORE_ACTION(module, service, payload = null, filter = "") {
        return this.$store.dispatch(module, {
          service,
          payload,
          filter
        });
      },

    }
  });
}
