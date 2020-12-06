import gql from "graphql-tag";

export default {
    tt(apollo) {
        apollo.mutate({
            mutation: gql`
              mutation {
                Register(
                  fullname: "radwa adel"
                  email: "adelradwa44@gmail.com"
                  phone: "+201116515446"
                  password: "123456"
                ) {
                  user {
                    id
                    email
                    token
                  }
                  errors {
                    key
                    message
                  }
                  message
                }
              }
            `
          });
    }
}